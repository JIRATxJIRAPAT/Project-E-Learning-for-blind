import { useState,useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios'
import { useParams } from 'react-router-dom'

function CreateQuiz() {
    const [question, setQuestion] = useState('');
    const [answer,setAnswer] = useState('');
    const [choiceText,setChoice] = useState('');
    const [isAns1,setValue1] = useState(false);
    const [choice2Text,setChoice2] = useState('');
    const [isAns2,setValue2] = useState(false);
    const {id} = useParams();

    /*
    useEffect(() => {
      
        axios.get(`http://localhost:5000/api/course/${id}`)
        .then(res => [
          setOldCourseName(res.data.name),
          setOldPic(res.data.img),
          setOldDescription(res.data.desc),
          setOldChapters(res.data.chapters)
        ])
        .catch(error => console.log(error));
      },[]);
    */

    async function onSubmit(event) {
		event.preventDefault()
        
        
        console.log(question)
        console.log(isAns1)
        
        const formData = new FormData();
        formData.append("question",question)
        formData.append("answer",answer)
        formData.append("choice1",choiceText)
        formData.append("value",isAns1)
        formData.append("choice2",choice2Text)
        formData.append("value2",isAns2)
		
        console.log(formData.req)
		axios.put(`http://localhost:5000/api/create/quiz/${id}`,formData)
        .then((res)=>console.log(res.data))
        .catch((err)=>{
            console.log(err);
        })
        
	}
    
    return(
    <div>
        <Form onSubmit={onSubmit} encType="multipart/form-data">
            <Form.Group className="mb-3" controlId="name">
                <Form.Label>Question</Form.Label>
                <Form.Control type="text" placeholder={`Question`} onChange={(e) => setQuestion(e.target.value)} />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Answer</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder={`Answer`} onChange={(e) => setAnswer(e.target.value)} />
            </Form.Group>
           

            <InputGroup className="mb-3">
            <InputGroup.Checkbox aria-label="Checkbox for following text input" onClick={(e) => setValue1(!isAns1)}/>
                
                <Form.Control aria-label="Text input with checkbox" onChange={(e) => setChoice(e.target.value)}/>
            </InputGroup>
            <InputGroup className="mb-3">
            <InputGroup.Checkbox aria-label="Checkbox for following text input" onClick={(e) => setValue2(!isAns1)}/>
                
                <Form.Control aria-label="Text input with checkbox" onChange={(e) => setChoice2(e.target.value)}/>
            </InputGroup>
            
            {isAns1 ? "True" : "False"}
            <Button variant="success" type="sumbit">submit</Button>
        </Form>

    </div>
    )
}

export default CreateQuiz