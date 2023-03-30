import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'

function CreateCourse() {
    const [name, setName] = useState('')
	const [img, setPic] = useState('')
    const [desc ,setDescription] = useState('')
    async function onSubmit(event) {
		event.preventDefault()
        
        
        console.log(name)
        console.log(img)
        console.log(desc)
        /*
        const response = await fetch('http://localhost:5000/api/create', {
			method: 'POST',
			headers: {
				'Content-Type': 'image/png',
			},
			body: JSON.stringify({
				name,
				img,
			}),
		})
        
        const data = await response.json()
		console.log(data)*/
        const formData = new FormData();
        formData.append("name",name)
        formData.append("testImage",img)
        formData.append("desc",desc)
		
		axios.post("http://localhost:5000/api/create",formData)
        .then((res)=>console.log(res.data))
        .catch((err)=>{
            console.log(err);
        })
	}
    
    return(
    <div >
        <Form onSubmit={onSubmit} encType="multipart/form-data" >
            <Form.Group className="mb-3" controlId="name">
                <Form.Label className="example">Course setName</Form.Label>
                <Form.Control type="text" placeholder="course name" onChange={(e) => setName(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label className="example">Default file input example</Form.Label>
                <Form.Control type="file" filename="testImage" onChange={(e) => setPic(e.target.files[0])}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label className="example">Description</Form.Label>
                <Form.Control as="textarea" rows={3} onChange={(e) => setDescription(e.target.value)} />
            </Form.Group>
            <Form.Select aria-label="Default select example">
                <option className="example" tabIndex="0">Open this select menu</option>
                <option className="example" tabIndex="0" value="1">One</option>
                <option className="example" tabIndex="0" value="2">Two</option>
                <option className="example" tabIndex="0" value="3">Three</option>
            </Form.Select>
            <Button variant="success" type="sumbit">submit</Button>
        </Form>

    </div>
    )
}

export default CreateCourse