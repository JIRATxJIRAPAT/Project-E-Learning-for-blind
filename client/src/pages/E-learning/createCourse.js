import { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'

function CreateCourse() {
    const [name, setName] = useState('')
	const [img, setPic] = useState('')
    const [desc ,setDescription] = useState('')
    const [username,setUsername] = useState('')
    const [userid,setUserId] = useState('')

    useEffect(() => {

        const tk = localStorage.getItem('token')
    
        axios.get(`http://localhost:5000/api/getUser/`,{
          headers:  {
                      "X-Auth-Token":tk,
                      "content-type": "application/json"
                    }
        })
        .then(res => [
          setUsername(res.data.user.name),
          setUserId(res.data.user._id),
          console.log("navbar",res.data.user.name)
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
        formData.append("testImage",img)
        formData.append("desc",desc)
        formData.append("username",username)
        formData.append("userid",userid)

		
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
                <Form.Label tabIndex="0">Course Name</Form.Label>
                <Form.Control type="text" placeholder="course name" onChange={(e) => setName(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label >Default file input example</Form.Label>
                <Form.Control type="file" filename="testImage" onChange={(e) => setPic(e.target.files[0])}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label >Description</Form.Label>
                <Form.Control as="textarea" rows={3} onChange={(e) => setDescription(e.target.value)} />
            </Form.Group>
            <Form.Select aria-label="Default select example">
                <option  >Open this select menu</option>
                <option  tabIndex="0" value="1">One</option>
                <option  tabIndex="0" value="2">Two</option>
                <option  tabIndex="0" value="3">Three</option>
            </Form.Select>
            <Button variant="success" type="sumbit">submit</Button>
        </Form>

    </div>
    )
}

export default CreateCourse