import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Navbar1 from '../../components/Navbar'
import Quiz from './quiz'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown';

import ChaptersList from '../../components/ChaptersList'
import QuestionList from '../../components/QuestionList'

function CreateTabList(chapters,key){
    return(
        <ChaptersList key={key} title={chapters.title} id={chapters.id} video={chapters.video}/>
    )
}

function CreateQuestionList(){
    return(
        <QuestionList/>
    )
}


function ChapterDropDown(chapters,key) {
    return (
        <Dropdown.Item href="#/action-3">{chapters.title}</Dropdown.Item>
    );
  }

const Course = () => {
    const [name, setCourseName] = useState('')
	const [img, setPic] = useState('')
    const [desc,setDescription] = useState('')
    const [chapters,setChapters] = useState([])
    const [quizs, setQuiz] = useState([]);
    const [video,setVideos] = useState([])
    const {id} = useParams();
    const [owner_id,setOwnerID] = useState('')
    const [owner_name,setOwnerName] = useState('')

    //user
    const [email,setEmail] = useState('')
    const [userid,setUserID] = useState('')
    const [username,setUsername] = useState('')

    useEffect(() => {
      
      axios.get(`http://localhost:5000/api/course/${id}`)
      .then(res => [
        setCourseName(res.data.name),
        setPic(res.data.img),
        setDescription(res.data.desc),
        setChapters(res.data.chapters),
        setQuiz(res.data.quiz),
        setVideos(res.data.video),
        setOwnerID(res.data.owner_id),
        setOwnerName(res.data.owner_name),
        console.log("course",res.data)
      ])
      .catch(error => console.log(error));

      const tk = localStorage.getItem('token')
      
      axios.get(`http://localhost:5000/api/getUser/`,{
        headers:  {
                    "X-Auth-Token":tk,
                    "content-type": "application/json"
                  }
      })
      .then(res => [
        setUsername(res.data.user.name),
        setUserID(res.data.user._id),
        setEmail(res.data.user.email),
        console.log("email",res.data.user.email)
      ])
      .catch(error => console.log(error));
    },[]);


    
    
    async function Enroll(){
        
        const formData = new FormData();
        formData.append("name",name)
        formData.append("email",email)
        formData.append("username",username)
        formData.append("userid",userid)
        formData.append("owner_id",owner_id)
        formData.append("owner_name",owner_name)
        await axios.put(`http://localhost:5000/api/enroll/${id}`,formData)
        .then((res)=>console.log(res.data))
        .catch((err)=>{
            console.log(err);
        })
    }
    

    return(
        
        <div>
            <Navbar1 />
           <h2>course:{name}</h2>
           <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
            Dropdown Button
        </Dropdown.Toggle>

        <Dropdown.Menu>
            {chapters.map((chapter,key)=>ChapterDropDown(chapter,key))}
        </Dropdown.Menu>
        </Dropdown>
           


           
           <div>{chapters.map((chapter,key)=>CreateTabList(chapter,key))}</div>
           <div>{CreateQuestionList()}</div>
           
           <Button onClick={()=>{Enroll()}}>enroll</Button>
           
        </div>
      
    )
}

export default Course