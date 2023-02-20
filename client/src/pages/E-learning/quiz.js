import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Navbar1 from '../../components/Navbar'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'



const Quiz = () => {
    const [name, setCourseName] = useState('')
	const [img, setPic] = useState('')
    const [desc,setDescription] = useState('')
    const [chapters,setChapters] = useState([])
    const [quizs, setQuiz] = useState([]);
    const [question, setQuestion] = useState('');
    const [answer,setAnswer] = useState('');
    const [choiceText,setChoice] = useState('');
    const [isAns1,setValue1] = useState(false);
    const [choice2Text,setChoice2] = useState('');
    const [isAns2,setValue2] = useState(false);
    const {id} = useParams();
    const [choice,setArray] = useState([]) 

    
    useEffect(() => {
      
      axios.get(`http://localhost:5000/api/course/${id}`)
      .then(res => [
        setCourseName(res.data.name),
        setPic(res.data.img),
        setDescription(res.data.desc),
        setChapters(res.data.chapters),
        setQuiz(res.data.quiz),
        

      ])
      .catch(error => console.log(error));
    },[]);
    
    async function onSubmit(event) {
      event.preventDefault()
          
          
          console.log(name)
          console.log(img)
          console.log(desc)
       
          const formData = new FormData();
          formData.append("name",name)
          //formData.append("testImage",img)
          formData.append("desc",desc)
          
      
          console.log(formData)
      axios.put(`http://localhost:5000/api/course/edit/${id}`,formData)
          .then((res)=>console.log(res.data))
          .catch((err)=>{
              console.log(err);
          })
    }


    return(
        
        <div>
          
          <Form>
            
            <div key={`inline-radio`} className="mb-3">
            
              {quizs.map(quiz=><div>
                <h2>question:{quiz.question}</h2>
                {quiz.choice.map((eachChoice,key)=>
                <div>
                
              <Form.Check
                inline
                label={`${eachChoice.text}`}
                name="group1"
                type="radio"
                id={`inline-radio-1`}
                
              />



            
            </div>
          )}
          </div>
          )}
          </div>
          </Form>
           
        </div>
        
    )
}

export default Quiz