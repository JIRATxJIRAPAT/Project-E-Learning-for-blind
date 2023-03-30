import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Navbar1 from '../../components/Navbar'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'



const  Quiz = () => {

    const [quizs, setQuiz] = useState([]);

    const [answer,setAnswer] = useState('');

    const {id} = useParams();
    const [email,setEmail] = useState('')
    
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
      //Get course information
      axios.get(`http://localhost:5000/api/course/${id}`)
      .then(res => [

        setMax(res.data.quiz.length),
        //setQuiz(res.data.quiz),
        setQuiz(res.data.quiz[activeQuestion]),
        setPassScore(res.data.pass_score),
        
      ])
      .catch(error => console.log(error));

      //Get user
      const tk = localStorage.getItem('token')
      
      axios.get(`http://localhost:5000/api/getUser/`,{
        headers:  {
                    "X-Auth-Token":tk,
                    "content-type": "application/json"
                  }
      })
      .then(res => [
        setEmail(res.data.user.email),

      ])
      .catch(error => console.log(error));
      console.log("ppppp")
    },[]);

    useEffect(() => {
      console.log("useEff",activeQuestion)
      if (activeQuestion === max){
        onfinish()
      }
    },[activeQuestion])
    

    async function onfinish() {
      
          const formData = new FormData();
          formData.append("email",email)  
          formData.append("score",correctAns)
          formData.append("status",passStatus)
          
      
          console.log("fn Score",score)
          console.log("passStatus",passStatus)
          
          axios.put(`http://localhost:5000/api/quiz/submit`,formData)
          .then((res)=>console.log(res.data))
          .catch((err)=>{
              console.log(err);
          })
    }

    const checkAns = () => {
      if(activeQuestion+1<max){
          axios.get(`http://localhost:5000/api/course/${id}`)
          .then(res => [
            console.log("3:setQuiz",activeQuestion),
            setQuiz(res.data.quiz[activeQuestion+1]),
            
          ])
          .catch(error => console.log(error));
      }else{
        setShowResult(true)
        console.log("fn*--",passScore)
        console.log("fn*--5555",correctAns) //อัพเดตช้า
        if(passScore === correctAns){
          console.log("pass")
          setPassStatus(true)
        }else{
          setPassStatus(false)
          console.log("fail")
        }
         //ส่ง api
      }
    }
  
    const onClickNext = () => {
      console.log("1:onclick",activeQuestion)
      setActiveQuestion((prev) => prev + 1)
      console.log("select",selectedAnswer)
      console.log("ans",quizs.answer)
      if (activeQuestion < max){ 
        

        var x = false
        if(selectedAnswer === `${quizs.answer}`){
          
          x = true
          
          console.log("ถูก-------------------")
          setCorrectAns((prev)=>prev+1,()=>{

          })
        }else{

          console.log("ผิด----------------------")
          setWrongAns((prev)=>prev+1)
        }
        checkAns()
        setSelectedAnswer("")
      }
      else{
        //setActiveQuestion(0)
        console.log("finish",activeQuestion)
 
      }
    }


    return(
      <div>
        {!showResult ? (
          <div>
          <Form>
            
            <h2>Question {activeQuestion+1} / {max} : {quizs.question}</h2>
            <Form.Check
              inline
              label={quizs.choice1}
              name="group1"
              type='radio'
              id={`inline-radio-1`}
              onClick={(e) => setSelectedAnswer(`${quizs.choice1}`)}
            />
            <Form.Check
              inline
              label={quizs.choice2}
              name="group1"
              type='radio'
              id={`inline-radio-2`}
              onClick={(e) => setSelectedAnswer(`${quizs.choice2}`)}
            />
              
          
            
          </Form>
          <button onClick={onClickNext}>{activeQuestion === max - 1? 'Finish' : 'Next'}</button>
          {activeQuestion}
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

export default Quiz