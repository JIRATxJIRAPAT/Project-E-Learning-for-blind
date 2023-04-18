import { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import "../../css/createForm.css"
import { ref, uploadBytes, getBytes, getDownloadURL,} from "firebase/storage";
import { storage } from "../../../src/firebase";
import {useNavigate} from 'react-router-dom'
import { useParams } from 'react-router-dom'
import "../../css/course.css"
import Navbar1 from '../../components/Navbar'

/*

    <Form.Group controlId="formBasicSelect">
    <Form.Label>Set pass score</Form.Label>
        <Form.Control
            as="select"
            onChange={e => {
                console.log("e.target.value", e.target.value);
                setPassScore(parseInt(e.target.value));
            }}
        >
            <option >Open this select menu</option>
            <option value="1" tabIndex={0} placeholder="1">1</option>
            <option value="CONSTANCY">2</option>
            <option value="COMPLEMENT">3</option>
        </Form.Control>
    </Form.Group>

*/

function CreateCourse() {
    const [name, setName] = useState('')
	const [img, setPic] = useState('')
    const [desc ,setDescription] = useState('')
    const [username,setUsername] = useState('')
    const [userid,setUserId] = useState('')
    const [imageUpload, setImageUpload] = useState(null);
    const [url,setUrl] = useState("");
    const [role,setRole] = useState('')
    const [pass_score,setPassScore] = useState(0)
    const navigate = useNavigate();

    useEffect(() => {

        const tk = localStorage.getItem('token')
    
        axios.get(`https://e-learning-backends.onrender.com/api/getUser/`,{
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

        setRole(localStorage.getItem('role'))
    },[]);

    async function onSubmit(event) {
		event.preventDefault()
        
        if (imageUpload == null) return;
        const imageRef = ref(storage, `picture/${imageUpload.name}`);

        await uploadBytes(imageRef, imageUpload).then(() => {
            alert("Image Upload Success")
        })

        await getDownloadURL(imageRef).then((url) => {
          setUrl(url)
          console.log(url)
        }).catch((err)=>{
            console.log(err);
        })
        
	}

        useEffect(()=>{
           
            if(url !== ""){
                const formData = new FormData();
                formData.append("name",name)
                formData.append("img_url",`${url}`)
                formData.append("desc",desc)
                formData.append("username",username)
                formData.append("userid",userid)
                formData.append("pass_score",pass_score)
    
            
                axios.post("https://e-learning-backends.onrender.com/api/create",formData)
                .then((res)=>[
                    console.log(res.data),
                    navigate("/course")
                ])
                .catch((err)=>{
                    console.log(err);
                })
            }
        },[url])

    
    return(
        <div>
            <Navbar1/>
            {role === "teacher" && 
                <div className='box_course'>
                    <div className='inner_box_course'>
                        <Form onSubmit={onSubmit} encType="multipart/form-data" >
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label >Course Name</Form.Label>
                            <Form.Control type="text" placeholder="enter course name" onChange={(e) => setName(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label >Default file input example</Form.Label>
                            <Form.Control type="file" accept=".jpg,.png" placeholder="press enter to put files" filename="testImage" onChange={(e) => setImageUpload(e.target.files[0])}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label >Description</Form.Label>
                            <Form.Control type="text" placeholder="enter Description" rows={3} onChange={(e) => setDescription(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label >Set pass score for quiz</Form.Label>
                            <Form.Control type="number" placeholder="enter pass score for quiz" onChange={(e) => setPassScore(parseInt(e.target.value))} />
                        </Form.Group>

                        <Button variant="success" type="sumbit">submit</Button>
                        </Form>
                    </div>
                </div>
            }
            {role !== "teacher" && 
                <div className='box_course'>
                    <div tabIndex={0} style={{fontSize:"30px"}}>{role} can't access this page</div>
                </div>    
            }   
        </div>

    )
}

export default CreateCourse