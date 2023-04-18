import { useEffect, useState } from 'react'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Link, useParams } from 'react-router-dom'
import "../../css/course.css"
import Navbar1 from '../../components/Navbar'



const Chapter = () => {
    const [name, setCourseName] = useState('')
	const [img, setPic] = useState('')
    const [desc,setDescription] = useState('')
    const [chapters,setChapters] = useState([])
    const {id} = useParams();

    useEffect(() => {
      
      axios.get(`http://https://e-learning-backends.onrender.com/api/course/${id}`)
      .then(res => [
        setCourseName(res.data.name),
        setPic(res.data.img),
        setDescription(res.data.desc),
        setChapters(res.data.chapters)
      ])
      .catch(error => console.log(error));
    },[]);
    
    /*
    useEffect(() => {
        axios.get(`api/course/${course.match.param.id}`)
        .then((response)=>[
            setCourseName(response.data.name),
            setPic(response.data.image)
        ])
        .catch((err)=> console.log(err));

    },[])
    */
    return(
        <div>
            <Navbar1/>
            <div className='box_course'>
                <div className='inner_box_course2'>
                    <div className="d-grid gap-2">
                        <Button href={`/course/chapter/create/${id}`} variant="primary" size="lg">
                            Create New Chapter
                        </Button>

                    <h2>Course : {name}</h2>
                    
                    <div>Chapter : {chapters.map(chapter=>
                        <div>{chapter.title} : {chapter.id}</div>)}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chapter