import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Navbar1 from '../../components/Navbar'
import Quiz from './quiz'
import Button from 'react-bootstrap/Button'

import ChaptersList from '../../components/ChaptersList'
import QuestionList from '../../components/QuestionList'

function CreateTabList(chapters,key){
    return(
        <ChaptersList key={key} title={chapters.title} id={chapters.id} video={chapters.video}/>
    )
}

function CreateQuestionList(questions){
    return(
        <QuestionList key={questions.key} title={questions.question} id={questions.id} choice={questions.choice}/>
    )
}

async function Enroll(id,email,name){
    
    const formData = new FormData();
    formData.append("name",name)
    formData.append("email",email)
    await axios.put(`http://localhost:5000/api/enroll/${id}`,formData)
    .then((res)=>console.log(res.data))
    .catch((err)=>{
        console.log(err);
    })
}

const Course = () => {
    const [name, setCourseName] = useState('')
	const [img, setPic] = useState('')
    const [desc,setDescription] = useState('')
    const [chapters,setChapters] = useState([])
    const [quizs, setQuiz] = useState([]);
    const [video,setVideos] = useState([])
    const {id} = useParams();
    const [email,setEmail] = useState('')

    useEffect(() => {
      
      axios.get(`http://localhost:5000/api/course/${id}`)
      .then(res => [
        setCourseName(res.data.name),
        setPic(res.data.img),
        setDescription(res.data.desc),
        setChapters(res.data.chapters),
        setQuiz(res.data.quiz),
        setVideos(res.data.video),
        console.log("course",res.data)
      ])
      .catch(error => console.log(error));
    },[]);

    useEffect(() => {
        const tk = localStorage.getItem('token')
        const data = {
          headers:  {
                      "X-Auth-Token":tk,
                      "content-type": "application/json"
                    }
        }
      
        axios.get(`http://localhost:5000/api/getUser/`,{
          headers:  {
                      "X-Auth-Token":tk,
                      "content-type": "application/json"
                    }
        })
        .then(res => [

          setEmail(res.data.user.email),
          console.log("email",res.data.user.email)
        ])
        .catch(error => console.log(error));
    },[]);
    

    return(
        
        <div>
            <Navbar1 />
           <h2>course:{name}</h2>
           
           <div>{chapters.map((chapter,key)=>CreateTabList(chapter,key))}</div>
           <div>{quizs.map(CreateQuestionList)}</div>
           <div>{id}</div>
           <Button onClick={()=>{Enroll(id,email,name)}}>enroll</Button>
           
        </div>
      
    )
}

export default Course