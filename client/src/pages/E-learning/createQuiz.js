import { useState,useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios'
import { useParams,useNavigate } from 'react-router-dom'
import "../../css/course.css"
import Navbar1 from '../../components/Navbar'

function CreateQuiz() {
    const [question, setQuestion] = useState('');
    const [answer,setAnswer] = useState('');
    const [choiceText,setChoice] = useState('');
    const [isAns1,setValue1] = useState(false);
    const [choice2Text,setChoice2] = useState('');
    const [isAns2,setValue2] = useState(false);
    const {id} = useParams();
    const [role,setRole] = useState('')

    const navigate = useNavigate();
    
    useEffect(() => {
      setRole(localStorage.getItem('role'))
  
    },[]);
    
    

    async function onSubmit(event) {
		event.preventDefault()
        
        
        console.log(question)
        console.log(isAns1)
        
        const formData = new FormData();
        formData.append("question",question)
        formData.append("answer",answer)
        formData.append("choice1",choiceText)
        
        formData.append("choice2",choice2Text)
       
		
        console.log(formData.req)
		axios.put(`https://e-learning-backends.onrender.com/api/create/quiz/${id}`,formData)
        .then((res)=>[
            console.log(res.data),
            navigate("/course")
        ])
        .catch((err)=>{
            console.log(err);
        })
        

	}
    
    return(
    <div>
        <Navbar1/>
        <div className='box_course'>
            <div className='inner_box_course'>
                <main id="main-content">
                    <Form onSubmit={onSubmit} encType="multipart/form-data">
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Question</Form.Label>
                            <Form.Control type="text" placeholder={`Question`} onChange={(e) => setQuestion(e.target.value)} />
                        </Form.Group>
                        
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Answer</Form.Label>
                            <Form.Control type="text" rows={3} placeholder={`Answer`} onChange={(e) => setAnswer(e.target.value)} />
                        </Form.Group>
                    
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Choice1</Form.Label>
                            <Form.Control type="text" placeholder={`choice 1`} onChange={(e) => setChoice(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Choice2</Form.Label>
                            <Form.Control type="text" placeholder={`choice 2`} onChange={(e) => setChoice2(e.target.value)} />
                        </Form.Group>
                    
                    
                        
                        <br></br><br></br>
                        <Button variant="success" type="sumbit">submit</Button>
                    </Form>
                </main>
            </div>
        </div>
        {role !== "teacher" && 
            <div className='box_course'>
                <div tabIndex={0} style={{fontSize:"30px"}}>{role} can't access this page</div>
            </div>    
        }   
        

    </div>
    )
}

export default CreateQuiz