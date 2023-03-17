import { useState,useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { useParams } from 'react-router-dom'

function EditCourse() {
    const [name, setCourseName] = useState('');
	const [img, setPic] = useState('');
    const [desc ,setDescription] = useState('');
    const [epiname,setEpiName] = useState('');
    const [num,setNum] = useState('');
    const {id} = useParams();

    //test
    const [oldname, setOldCourseName] = useState('');
	const [oldimg, setOldPic] = useState('');
    const [olddesc ,setOldDescription] = useState('');
    const [oldepiname,setOldChapters] = useState('');
    /*
    <Form.Group controlId="formFile" className="mb-3">
    <Form.Label>Default file input example</Form.Label>
    <Form.Control type="file" filename="testImage" onChange={(e) => setPic(e.target.files[0])}/>
    </Form.Group>
    */

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

    async function onSubmit(event) {
		event.preventDefault()
        
        
        console.log(name)
        console.log(img)
        console.log(desc)
     
        const formData = new FormData();
        formData.append("name",name)
        //formData.append("testImage",img)
        formData.append("desc",desc)
        formData.append("episodeName",epiname)
		
        console.log(formData)
		axios.put(`http://localhost:5000/api/course/edit/${id}`,formData)
        .then((res)=>console.log(res.data))
        .catch((err)=>{
            console.log(err);
        })
	}
    
    return(
    <div>
        <Form onSubmit={onSubmit} encType="multipart/form-data">
            <Form.Group className="mb-3" controlId="name">
                <Form.Label>Course setName</Form.Label>
                <Form.Control type="text" placeholder={`old: ${oldname}`} onChange={(e) => setCourseName(e.target.value)} />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder={`old: ${olddesc}`} onChange={(e) => setDescription(e.target.value)} />
            </Form.Group>



            <Button variant="success" type="sumbit">submit</Button>
        </Form>

    </div>
    )
}

export default EditCourse