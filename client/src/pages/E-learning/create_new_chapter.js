import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { useParams,useNavigate } from 'react-router-dom'
import UploadForm from '../../video_upload/components/UploadForm'

function CreateChapter() {
    const [epiname,setEpiName] = useState('');
	const [img, setPic] = useState('')
    const [desc ,setDescription] = useState('')
    const {id} = useParams();

    const navigate = useNavigate();

    async function onSubmit(event) {
		event.preventDefault()
    
        console.log(img)
        console.log(desc)

        const formData = new FormData();
        formData.append("episodeName",epiname)
        
        console.log(formData)
		
		axios.put(`https://e-learning-backends.onrender.com/api/createChapter/${id}`,formData)
        .then((res)=>console.log(res.data))
        .catch((err)=>{
            console.log(err);
        })
	}
    
    return(
    <div>
        <Form onSubmit={onSubmit} encType="multipart/form-data">
            <Form.Group className="mb-3" controlId="name">
                <Form.Label>Chapter Name</Form.Label>
                <Form.Control type="text" placeholder="Chapter name" onChange={(e) => setEpiName(e.target.value)} />
            </Form.Group>

            
            <Button variant="success" type="sumbit">submit</Button>
        </Form>

    </div>
    )
}

export default CreateChapter