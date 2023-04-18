import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import "../../css/quiz.module.css"

const Quiz2 = () => {

  const [quizs, setQuiz] = useState([]);
  const [coursename,setCourseName] = useState("");

  const {id} = useParams();
  const [email,setEmail] = useState('')
  const [userid,setUserid] = useState('')
  const [max,setMax] = useState(0)

  const [activeQuestion, setActiveQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null)

  const [score, setScore] = useState(0)
  const [correctAns, setCorrectAns] = useState(0)
  const [wrongAns, setWrongAns] = useState(0)
  const [passStatus, setPassStatus] = useState(false)
  const [passScore,setPassScore] = useState(0)

  const { questions } = quizs
  const { question, choices, correctAnswer } = questions[activeQuestion]

  useEffect(() => {
    //Get user
    const tk = localStorage.getItem('token')
    
    axios.get(`http://https://e-learning-backends.onrender.com/api/getUser/`,{
      headers:  {
                  "X-Auth-Token":tk,
                  "content-type": "application/json"
                }
    })
    .then(res => [
      setEmail(res.data.user.email),
      setUserid(res.data.user._id)
    ])
    .catch(error => console.log(error));
    
  },[]);

  useEffect(() => {
    console.log("useEff",activeQuestion)
    NextQuestion()

  },[activeQuestion])

  useEffect(() => {
    if(correctAns === passScore){
      console.log("pass")
      setPassStatus(true)
    }else{
      setPassStatus(false)
      console.log("false")
    }

  },[correctAns,wrongAns])

  useEffect(()=>{
    if(showResult === true){
      onfinish()
    }
    
  },[showResult])

  async function onfinish() {
      
    const formData = new FormData();
    formData.append("email",email)  
    formData.append("score",correctAns)
    formData.append("status",passStatus)
    formData.append("coursename",coursename)
    formData.append("userid",userid)

    console.log("final Score",score)
    console.log("Status",email)
    
    axios.put(`http://https://e-learning-backends.onrender.com/api/quiz/submit`,formData)
    .then((res)=>console.log(res.data))
    .catch((err)=>{
        console.log(err);
    })
}



  const NextQuestion = () => {
    console.log(`active ${activeQuestion} < ${max}`)
    if(activeQuestion===0){
      axios.get(`http://https://e-learning-backends.onrender.com/api/course/${id}`)
      .then(res => [
        console.log("3:setQuiz",activeQuestion),
        setQuiz(res.data.quiz[activeQuestion]),
        setMax(res.data.quiz.length),
        setPassScore(res.data.pass_score),
        setCourseName(res.data.name)
      ])
      .catch(error => console.log(error));
    }
    else if(activeQuestion<max){
        axios.get(`http://https://e-learning-backends.onrender.com/api/course/${id}`)
        .then(res => [
          console.log("3:setQuiz",activeQuestion),
          setQuiz(res.data.quiz[activeQuestion]),

        ])
        .catch(error => console.log(error));
    }else{
      setShowResult(true)
    }
  }

  const onClickNext = () => {
  
    console.log("1:onclick",activeQuestion)
    if(selectedAnswer === `${quizs.answer}`){
      console.log("ถูก-------------------")
      setCorrectAns((prev)=>prev+1)
    }else{
      console.log("ผิด----------------------")
      setWrongAns((prev)=>prev+1)
    }
    
    setSelectedAnswer("")
    setActiveQuestion(prev=>prev+1)
  }
  


  const onAnswerSelected = (answer, index) => {
    setSelectedAnswerIndex(index)
    if (answer === correctAnswer) {
      setSelectedAnswer(true)
    } else {
      setSelectedAnswer(false)
    }
  }

  const addLeadingZero = (number) => (number > 9 ? number : `0${number}`)

  return (
    <div className="quiz-container">
      {!showResult ? (
        <div>
          <div>
            <span className="active-question-no">
              {addLeadingZero(activeQuestion + 1)}
            </span>
            <span className="total-question">
              /{addLeadingZero(questions.length)}
            </span>
          </div>
          <h2>{question}</h2>
          <ul>
            
              <li
                onClick={() => onAnswerSelected(quizs.choice1)}
                key={quizs.choice1}
                className={
                  selectedAnswerIndex === 0 ? 'selected-answer' : null
                }>
                {quizs.choice1}
              </li>
              <li
                onClick={() => onAnswerSelected(quizs.choice1)}
                key={quizs.choice1}
                className={
                  selectedAnswerIndex === 0 ? 'selected-answer' : null
                }>
                {quizs.choice1}
              </li>
            
          </ul>
          <div className="flex-right">
            <button
              onClick={onClickNext}
              disabled={selectedAnswerIndex === null}>
              {activeQuestion === questions.length - 1 ? 'Finish' : 'Next'}
            </button>
          </div>
        </div>
      ) : (
        <div className="result">
            <h3>Result</h3>
            <p>
            Total Question: <span>{max}</span>
            </p>
            <p>
            Total Score:<span> {score}</span>
            </p>
            <p>
            Correct Answers:<span> {correctAns}</span>
            </p>
            <p>
            Wrong Answers:<span> {wrongAns}</span>
        </p>
      </div>
      )}
    </div>
  )
}

export default Quiz2