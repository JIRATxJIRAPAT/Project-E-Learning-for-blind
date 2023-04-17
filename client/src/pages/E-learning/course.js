import { useEffect, useState,useRef, Fragment } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Navbar1 from '../../components/Navbar'
import Quiz from './quiz'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown';

import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import AllCourse from './allCourse'
import '../../css/test.css'
import "../../css/course.css"


import videojs from 'video.js';
import 'video.js/dist/video-js.css';


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
    const [role,setRole] = useState("")
    const [enrollStatus,setEnrollStatus] = useState(false)

    //page check
    const [onQuiz,setOnQuiz] = useState(false)

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

      FetchData()
      
      
    
    },[]);

    async function FetchData() {
        const tk = localStorage.getItem('token')
        await axios.get(`http://localhost:5000/api/getUser/`,{
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
        setRole(res.data.user.role),
        Check(res.data.user.email),
        console.log("email",res.data.user.email)
      ])
      .catch(error => console.log(error));
      }

    async function Check(params) {
        const formData2 = new FormData();
        formData2.append('email',params)

        //formData2.append("id",id)
        console.log("check email",params)
        console.log("form",formData2.get("email"))
        await axios.put(`http://localhost:5000/api/enroll/check/${id}`,formData2)
        .then(res => [
        setEnrollStatus(res.data),
        console.log("res.data",res.data)
        ])
        .catch(error => console.log(error));
    }

    function Duration() {
        var myVideo = document.getElementById("my-video");
        myVideo.onloadedmetadata = function() {
          var duration = myVideo.duration;
          return duration; // duration in seconds
        };
    }
  

    function videoo(chapters) {
        /*
        console.log("chage")
        var player = document.getElementById('video');
        var mp4Vid = document.getElementById('src');
    
        mp4Vid.src = `http://localhost:5000${chapters.video}`;
        */
        console.log(`${chapters.video}`);
        var player = videojs('my-video');
        player.src(`${chapters.video}`);
        player.autoplay()
       
    }
    function ChapterDropDown(chapters,key) {
        return (
            <Dropdown.Item onClick={()=>{videoo(chapters)}}>{chapters.title}</Dropdown.Item>
        );
    }

    function CreateQuestionList(status){
        if (status === "true"){
            return(
            //<QuestionList status={props}/>
                <Dropdown.Item onClick={HandleQuiz} disabled>Quiz</Dropdown.Item>
            )
        }else{
            return <Dropdown.Item onClick={HandleQuiz} >Quiz</Dropdown.Item>
        }
    
    }

    function HandleQuiz() {
        setOnQuiz(true)
    }

    
    /*

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
    
    */
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
        <Fragment>

        <Navbar1/>

        <div className='box_course_play'>

            <div className='inner_box_course'>

            <div className='grid'>

            <aside class="page-rightbar">
                    <div class="content">
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic" size="lg">
                            Select Chapters
                        </Dropdown.Toggle>
        
                        <Dropdown.Menu>
                            {chapters.map((chapter,key)=>ChapterDropDown(chapter,key))}
                            {enrolled.map(course=>{
                                if(course.coursename === name && (`${course.status}` === "true")){
                                    //setNum(prev=>prev+1)
                                    console.log("statussssss",course.status)
                                    return CreateQuestionList("false")
                                }else if(course.coursename === name  && (`${course.status}` === "false") ){
                                    //setNum(prev=>prev+1)
                                    return CreateQuestionList("true")
                                }
                            })}
                        </Dropdown.Menu>
                    </Dropdown>
                    
                        <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                        <br></br><br></br><br></br><br></br><br></br><br></br>     
                        {enrolled.map(course=>{
                        if(course.coursename === name && (`${course.status}` === "true")){
                            //setNum(prev=>prev+1)
                            console.log("statussssss",course.status)
                            //return CreateQuestionList("false")
                        }else if(course.coursename === name  && (`${course.status}` === "false") ){
                            //setNum(prev=>prev+1)
                            //return CreateQuestionList("true")
                        }
                        
                        })}
        
                                
                        {`${enrollStatus}`=== "true" &&
                            //<Button onClick={()=>{Enroll()}} disabled >enroll</Button>
                            <></>
                        }
                        {`${enrollStatus}`=== "false" &&
                            <Button onClick={()=>{Enroll()}} >Enroll</Button>
                        }
                    </div>
            </aside>
            
            

                <main class="page-main">
                    <div class="content">
                        {onQuiz ? (
                            <Quiz/>
                        ) : (
                        <>
                        <video
                            id="my-video"
                            class="video-js"
                            controls
                            preload='metadata'
                            width='800' 
                            height="500"
                            autoplay
        
                            poster="../../uploads/images/video-player.jpg"
                            data-setup="{}"
                            
                        >
                        <source src="https://firebasestorage.googleapis.com/v0/b/e-learning-for-the-blind-d7398.appspot.com/o/images%2F12.mp4?alt=media&token=863720a0-1dca-47f0-bef0-e088e9aa37e1" type="video/mp4"></source>
                            
                        </video></>
                        )}
        
                    </div>
                </main>
        
                {/* <summary class="page-details">
                    <div class="content">
                        <p>{Duration}</p>
                    </div>
                </summary> */}
            

            </div>

        </div>
            
        </div>
        </Fragment>
    )
}

export default Course