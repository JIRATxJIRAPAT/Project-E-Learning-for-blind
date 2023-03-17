import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Navbar1 from '../../components/Navbar'
import Quiz from './quiz'

import ChaptersList from '../../components/ChaptersList'
import QuestionList from '../../components/QuestionList'

function CreateTabList(chapters){
    return(
        <ChaptersList key={chapters.key} title={chapters.title} id={chapters.id} video={chapters.video}/>
    )
}

function CreateQuestionList(questions){
    return(
        <QuestionList key={questions.key} title={questions.question} id={questions.id} choice={questions.choice}/>
    )
}


const Course = () => {
    const [name, setCourseName] = useState('')
	const [img, setPic] = useState('')
    const [desc,setDescription] = useState('')
    const [chapters,setChapters] = useState([])
    const [quizs, setQuiz] = useState([]);
    const [video,setVideos] = useState([])
    const {id} = useParams();

    useEffect(() => {
      
      axios.get(`http://localhost:5000/api/course/${id}`)
      .then(res => [
        setCourseName(res.data.name),
        setPic(res.data.img),
        setDescription(res.data.desc),
        setChapters(res.data.chapters),
        setQuiz(res.data.quiz),
        setVideos(res.data.video)
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

               <h2>course:{name}</h2>
           
           <img src={`/uploads/images/${img}` } width="30%" height="10%" />
           <div>desc: {desc}</div>
           <div>Chapter: {chapters.map(chapter=>
            <div>{chapter.title}:{chapter.id}</div>)}</div>
            <div>{quizs.map(quiz=><div>quiz:{quiz.question}</div>)}</div>
        
    */
    return(
        
        <div>
            <Navbar1 />
           <h2>course:{name}</h2>
           


           <div>{chapters.map(CreateTabList)}</div>
           <div>{quizs.map(CreateQuestionList)}</div>
        
           
        </div>
      
    )
}

export default Course