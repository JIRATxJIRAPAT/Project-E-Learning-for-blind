import { useState,useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { useParams,useNavigate } from 'react-router-dom'
import "../../css/course.css"
import Navbar1 from '../../components/Navbar'
import { ref, uploadBytes, getBytes, getDownloadURL,} from "firebase/storage";
import { storage } from "../../../src/firebase";

function EditCourse() {

    useEffect(() => {
        document.title = 'Edit Course page';
      }, []);

    const [name, setCourseName] = useState('');
	const [img, setPic] = useState('');
    const [desc ,setDescription] = useState('');
    const [epiname,setEpiName] = useState('');
    const [num,setNum] = useState('');
    const {id} = useParams();
    const [role,setRole] = useState('')
    const [url,setUrl] = useState("");
    const [imageUpload, setImageUpload] = useState(null);

    //test
    const [oldname, setOldCourseName] = useState('');
	const [oldimg, setOldPic] = useState('');
    const [olddesc ,setOldDescription] = useState('');
    const [oldepiname,setOldChapters] = useState('');

    const navigate = useNavigate();
    /*
    <Form.Group controlId="formFile" className="mb-3">
    <Form.Label>Default file input example</Form.Label>
    <Form.Control type="file" filename="testImage" onChange={(e) => setPic(e.target.files[0])}/>
    </Form.Group>
    */

    useEffect(() => {
      
        axios.get(`https://e-learning-backends.onrender.com/api/course/${id}`)
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
        
        if (imageUpload == null) {window.speechSynthesis.speak(msg2)};
        const imageRef = ref(storage, `Picture/${imageUpload.name}`);

        await uploadBytes(imageRef, imageUpload).then(() => {
            alert("Image Upload Success")
        })

        await getDownloadURL(imageRef).then((url) => {
          setUrl(url)
          console.log(url)
          navigate(`/course/${id}`)
        }).catch((err)=>{
            console.log(err);
        })
        
	}

    useEffect(()=>{
        if(url !== ""){
            const formData = new FormData();
            formData.append("name",name)
            formData.append("img",`${url}`)
            formData.append("desc",desc)
            formData.append("episodeName",epiname)
            
            console.log(formData)
            axios.put(`https://e-learning-backends.onrender.com/api/course/edit/${id}`,formData)
            .then((res)=>console.log(res.data))
            .catch((err)=>{
                console.log(err);
            })
            
        }

    },[url])

        const msg2 = new SpeechSynthesisUtterance() 
        const msg3 = new SpeechSynthesisUtterance() 
        msg3.text = "Please enter"
        const msg4 = new SpeechSynthesisUtterance()
        msg4.text = "Upload Success"
        function check_file(){
    
            var txt1 = "Course name"
            var txt2 = "Description"
            var txt3 = "Files"

            console.log(name,"name")
            console.log(desc,"desc")
            console.log(imageUpload,"img")

            if(name===""){
                msg2.text += txt1
            }
            if(desc===""){
                msg2.text += txt2
            }
            if(imageUpload==null){
                msg2.text += txt3
            }
            if(msg2.text===""){
                window.speechSynthesis.speak(msg4)
            }else{
                window.speechSynthesis.speak(msg3)
                window.speechSynthesis.speak(msg2)
            }
        }
    
    return(
    <div>

        <Navbar1/>
        <div className='box_course'>
            <div className='inner_box_course'>
                <main id="main-content">
                    <Form onSubmit={onSubmit} encType="multipart/form-data" >
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Course setName</Form.Label>
                            <Form.Control aria-label='course name' type="text" placeholder={`old: ${oldname}`} onChange={(e) => setCourseName(e.target.value)} />
                        </Form.Group>
                        
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Description</Form.Label>
                            <Form.Control aria-label='description' as="textarea" rows={3} placeholder={`old: ${olddesc}`} onChange={(e) => setDescription(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Upload Image File</Form.Label>
                            <Form.Control aria-label='upload image' type="file" required filename="testImage" placeholder="enter image file" onChange={(e) => setImageUpload(e.target.files[0])}/>
                        </Form.Group>


                        <Button aria-label='submit' variant="success" onClick={() => check_file()}  type="sumbit">submit</Button>
                    </Form>
                </main>
            </div>
        </div>
        {role !== "teacher" && 
                <div className='box_course'>
                    <main id="main-content">
                        <div tabIndex={0} style={{fontSize:"30px"}}>{role} can't access this page</div>
                    </main>
                        
                </div>    
        }   

    </div>
    )
}

export default EditCourse