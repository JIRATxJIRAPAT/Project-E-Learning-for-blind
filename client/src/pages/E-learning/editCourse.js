import { useState,useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import "../../css/course.css"
import Navbar1 from '../../components/Navbar'

function EditCourse() {
    const [name, setCourseName] = useState('');
	const [img, setPic] = useState('');
    const [desc ,setDescription] = useState('');
    const [epiname,setEpiName] = useState('');
    const [num,setNum] = useState('');
    const {id} = useParams();
    const [role,setRole] = useState('')

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
      
        axios.get(`http://https://e-learning-backends.onrender.com/api/course/${id}`)
        .then(res => [
          setOldCourseName(res.data.name),
          setOldPic(res.data.img),
          setOldDescription(res.data.desc),
          setOldChapters(res.data.chapters)
        ])
        .catch(error => console.log(error));

        setRole(localStorage.getItem('role'))

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
        formData.append("episodeName",epiname)
		
        console.log(formData)
		axios.put(`http://https://e-learning-backends.onrender.com/api/course/edit/${id}`,formData)
        .then((res)=>console.log(res.data))
        .catch((err)=>{
            console.log(err);
        })
	}
    
    return(
    <div>

        <Navbar1/>
        <div className='box_course'>
            <div className='inner_box_course'>

                <Form onSubmit={onSubmit} encType="multipart/form-data">
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Course setName</Form.Label>
                        <Form.Control type="text" placeholder={`old: ${oldname}`} onChange={(e) => setCourseName(e.target.value)} />
                    </Form.Group>
                    
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder={`old: ${olddesc}`} onChange={(e) => setDescription(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Default file input example</Form.Label>
                        <Form.Control type="file" filename="testImage" onChange={(e) => setPic(e.target.files[0])}/>
                    </Form.Group>


                    <Button variant="success" type="sumbit">submit</Button>
                </Form>

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

export default EditCourse