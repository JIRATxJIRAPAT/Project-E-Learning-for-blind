import { useState,useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import "../../css/audio.css"
import Navbar1 from '../../components/Navbar'
import { ref, uploadBytes, getBytes, getDownloadURL,} from "firebase/storage";
import { storage } from "../../../src/firebase";

function EditAudioBook() {

    useEffect(() => {
        document.title = 'Edit Audio page';
      }, []);

    const [name, setCourseName] = useState('');
    const [desc ,setDescription] = useState('');
    const {id} = useParams();


    async function onSubmit(event) {
		event.preventDefault()
        const formData = new FormData();
        formData.append("name",name)
        formData.append("desc",desc)
		
        console.log(formData)
		axios.put(`https://e-learning-backends.onrender.com/api/audiobook/edit/${id}`,formData)
        .then((res)=>console.log(res.data))
        .catch((err)=>{
            console.log(err);//https://e-learning-backends.onrender.com
        })
	}


        const msg2 = new SpeechSynthesisUtterance() 
        const msg3 = new SpeechSynthesisUtterance() 
        msg3.text = "Please enter"
        const msg4 = new SpeechSynthesisUtterance()
        msg4.text = "Upload Success"
        function check_file(){
    
            var txt1 = "Audio name"
            var txt2 = "Description"

            console.log(name,"name")
            console.log(desc,"desc")

            if(name===""){
                msg2.text += txt1
            }
            if(desc===""){
                msg2.text += txt2
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
                            <Form.Label>AudioBook setName</Form.Label>
                            <Form.Control type="text" placeholder="AudioBook name" onChange={(e) => setCourseName(e.target.value)} />
                        </Form.Group>
                        
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
                        </Form.Group>
                        <Button variant="success" onClick={() => check_file()}  type="sumbit">submit</Button>
                    </Form>
                </main>
            </div>
        </div>

    </div>
    )
}

export default EditAudioBook