import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Navbar1 from '../../components/Navbar'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import styles from "../../css/quiz.module.css"
import "../../css/course.css"


const  Quiz = () => {

    const [quizs, setQuiz] = useState([]);

    const [coursename,setCourseName] = useState("");

    const {id} = useParams();
    const [email,setEmail] = useState('')
    const [userid,setUserid] = useState('')
    const [max,setMax] = useState(0)
    //
    const [activeQuestion, setActiveQuestion] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState('')
    const [showResult, setShowResult] = useState(false)

    const [score, setScore] = useState(0)
    const [correctAns, setCorrectAns] = useState(0)
    const [wrongAns, setWrongAns] = useState(0)
    const [passStatus, setPassStatus] = useState(false)
    const [passScore,setPassScore] = useState(0)
       
    useEffect(() => {
      //Get user
      const tk = localStorage.getItem('token')
      
      axios.get(`https://e-learning-backends.onrender.com/api/getUser/`,{
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
          
          axios.put(`https://e-learning-backends.onrender.com/api/quiz/submit`,formData)
          .then((res)=>console.log(res.data))
          .catch((err)=>{
              console.log(err);
          })
    }

    const NextQuestion = () => {
        console.log(`active ${activeQuestion} < ${max}`)
        if(activeQuestion===0){
          axios.get(`https://e-learning-backends.onrender.com/api/course/${id}`)
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
            axios.get(`https://e-learning-backends.onrender.com/api/course/${id}`)
            .then(res => [
              console.log("3:setQuiz",activeQuestion),
              setQuiz(res.data.quiz[activeQuestion]),

            ])
            .catch(error => console.log(error));
        }else{
          setShowResult(true)
        }
    }
  
    const onClickNext = (e) => {
      
      e.preventDefault()

      console.log("1:onclick",activeQuestion)
      if(selectedAnswer === `${quizs.answer}`){
        console.log("ถูก-------------------")
        setCorrectAns((prev)=>prev+1)
      }else{
        console.log("ผิด----------------------")
        setWrongAns((prev)=>prev+1)
      }
      //set state
      document.getElementById("logout").focus();
      var box2 = document.getElementById("inline-radio-2")
      box2.checked = false
      var box1 = document.getElementById("inline-radio-1")
      box1.checked = false

      setSelectedAnswer("")
      setActiveQuestion(prev=>prev+1)
    }
 
    


    return(
      <div>
        <Navbar1/>
        <div className='box_course'>
          <div className='inner_box_course2'>
            <main id="main-content">
            {!showResult ? (
              <div >
              <Form>
                           
                <h2 id='question' tabIndex="0" style={{fontWeight:"bold"}}>Question {activeQuestion+1} of {max} :  {quizs.question}</h2>
                <br></br>
                <Form.Check
                  inline
                  label={quizs.choice1}
                  name="group1"
                  type='radio'
                  id={`inline-radio-1`}
                  
                  placeholder={`choice one ${quizs.choice1}`}
                  onClick={(e) => setSelectedAnswer(`${quizs.choice1}`)}
                />
                <Form.Check
                  inline
                  label={quizs.choice2}
                  name="group1"
                  type='radio'
                  id={`inline-radio-2`}
                  
                  placeholder={`choice two ${quizs.choice2}`}
                  onClick={(e) => setSelectedAnswer(`${quizs.choice2}`)}
                />
                  
              
                  <br></br>
                <br></br>
              <Button variant='primary' onClick={onClickNext}>{activeQuestion === max - 1? 'Finish' : 'Next'}</Button>
              </Form>
              
            </div>
            ) : (
              <div className="result">
                <h3 tabIndex={0}>Result</h3>
                <p tabIndex={0}>
                  Total Question: <span>{max}</span>
                </p>
                <p tabIndex={0}>
                  Total Score:<span> {score}</span>
                </p>
                <p tabIndex={0}>
                  Correct Answers:<span> {correctAns}</span>
                </p>
                <p tabIndex={0}>
                  Wrong Answers:<span> {wrongAns}</span>
                </p>
                <br></br>
                <Button href='/course' variant='primary'>Back to HomePage</Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
)


}

export default Quiz