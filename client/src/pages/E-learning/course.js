import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Navbar1 from '../../components/Navbar'
import Quiz from './quiz'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown';

import ChaptersList from '../../components/ChaptersList'
import QuestionList from '../../components/QuestionList'
import LeftTabsExample from '../../components/ChapterList2'

import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';

function CreateTabList(chapters,key){
    return(
        //<LeftTabsExample key={key} title={chapters.title} id={chapters.id} video={chapters.video}/>
        <Nav.Item >
            <Nav.Link tabIndex={0} eventKey={`${chapters.id}`} >Tab {`${chapters.id}`}</Nav.Link>
        </Nav.Item>
    )
}
function CreateTabList2(chapters,key){
    return(
        //<LeftTabsExample key={key} title={chapters.title} id={chapters.id} video={chapters.video}/>
        <Tab.Pane eventKey={`${chapters.id}`}>
                <video
                    preload="auto"
                    width="320"
                    height="240"
                    controls
                >
                <source src={`http://localhost:5000${chapters.video}`} />
                
            </video>
        </Tab.Pane>
    )
}

function CreateQuestionList(props){
    return(
        <QuestionList status={props}/>
    )
}

function video(chapters) {
    console.log("chage")
    var player = document.getElementById('video');
    var mp4Vid = document.getElementById('src');
    player.pause();
    mp4Vid.src = `http://localhost:5000${chapters.video}`;
    
    player.load();
    player.play();
   
}


function ChapterDropDown(chapters,key) {
    return (
        <Dropdown.Item onClick={()=>{video(chapters)}}>{chapters.title}</Dropdown.Item>
    );
  }

const Course = () => {
    const [name, setCourseName] = useState('')

    const [chapters,setChapters] = useState([])
    const [quizs, setQuiz] = useState([]);
    const [video,setVideos] = useState([])
    const {id} = useParams();
    const [owner_id,setOwnerID] = useState('')
    const [owner_name,setOwnerName] = useState('')

    const [num,setNum] = useState(0)
    //user
    const [email,setEmail] = useState('')
    const [userid,setUserID] = useState('')
    const [username,setUsername] = useState('')
    const [enrolled,setEnrolled] = useState([])

    useEffect(() => {
      
      axios.get(`http://localhost:5000/api/course/${id}`)
      .then(res => [
        setCourseName(res.data.name),
        setChapters(res.data.chapters),
        setQuiz(res.data.quiz),
        setVideos(res.data.video),
        setOwnerID(res.data.owner_id),
        setOwnerName(res.data.owner_name),
        //console.log("course",res.data)
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
        setEnrolled(res.data.user.enrolled),
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




    
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
                <Col sm={3}>
                <Nav variant="pills" className="flex-column">

                {chapters.map((chapter,key)=>CreateTabList(chapter,key))}
                </Nav>
                </Col>
                <Col sm={9}>
                <Tab.Content>
                {chapters.map((chapter,key)=>CreateTabList2(chapter,key))}
                </Tab.Content>
                </Col>
            </Row>
            </Tab.Container>
     
        
           {enrolled.map(course=>{
                if(course.coursename === name && (`${course.status}` === "true")){
                    console.log("statussssss",course.status)
                    return CreateQuestionList("false")
                }else if(course.coursename === name  && (`${course.status}` === "false") ){
                    return CreateQuestionList("true")
                }
           })}
          
           <div id="test"></div>

            <video
                preload="auto"
                width="320"
                height="240"
                controls
                id="video"
            >
            <source id="src" src={""} />

            </video>
           <Button onClick={()=>{Enroll()}}>enroll</Button>
           
        </div>
      
    )
}

export default Course