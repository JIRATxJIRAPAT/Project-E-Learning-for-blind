import { useEffect, useState,useRef, Fragment } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar1 from '../../components/Navbar'
import Quiz from './quiz'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown';

import '../../css/test.css'
import "../../css/course.css"


import videojs from 'video.js';
import 'video.js/dist/video-js.css';

/*
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
                <source src={`https://e-learning-backends.onrender.com${chapters.video}`} />
                
            </video>
        </Tab.Pane>
    )
}

*/



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

    //Test
    const [firstvid,setVid] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
      
      axios.get(`https://e-learning-backends.onrender.com/api/course/${id}`)
      .then(res => [
        setCourseName(res.data.name),
        setChapters(res.data.chapters),
        setQuiz(res.data.quiz),
        setVideos(res.data.video),
        setOwnerID(res.data.owner_id),
        setOwnerName(res.data.owner_name),
        setVid(`${res.data.chapters[0].video}`),
        console.log("firstVid",res.data.chapters[0].video)
      ])
      .catch(error => console.log(error));

      FetchData()
      
      
    
    },[]);

    useEffect(()=>{
        if(firstvid !== ""){
            var player = videojs('my-video');
            player.src(`${firstvid}`);
            player.autoplay()
        }
    },[firstvid])

    async function FetchData() {
        const tk = localStorage.getItem('token')
        await axios.get(`https://e-learning-backends.onrender.com/api/getUser/`,{
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
        await axios.put(`https://e-learning-backends.onrender.com/api/enroll/check/${id}`,formData2)
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

    function setFirstVideo(chapters){
        console.log("id",chapters.id)
        if (chapters.id === 1){
            var player = videojs('my-video');
            player.src(`${chapters.video}`);
            player.autoplay()
        }
    }
  

    function videoo(chapters) {
        /*
        console.log("chage")
        var player = document.getElementById('video');
        var mp4Vid = document.getElementById('src');
    
        mp4Vid.src = `https://e-learning-backends.onrender.com${chapters.video}`;
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
        navigate(`/course/quiz/${id}`)
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
        await axios.put(`https://e-learning-backends.onrender.com/api/enroll/${id}`,formData)
        .then((res)=>console.log(res.data))
        .catch((err)=>{
            console.log(err);
        })
    }
    
    const url = firstvid
    
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
                                    return CreateQuestionList("true")
                                }if(course.coursename === name  && (`${course.status}` === "false") ){
                                    //setNum(prev=>prev+1)
                                    return CreateQuestionList("false")
                                }
                            })}
                        </Dropdown.Menu>
                    </Dropdown>
                    
                    {role === 'teacher' &&
                        <div className="mb-4">
                            <br></br>
                            <br></br>
                            <Button variant="danger" size="lg" href='/course/create'>
                                Add Chapters
                            </Button>
                            <br></br>
                            <br></br>
                            <Button variant="warning" size="lg" href={`/course/edit/${id}`}>
                                edit course
                            </Button>
                        </div>
                    }
                            
                        <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                        <br></br><br></br><br></br><br></br><br></br><br></br>     
                        {/*enrolled.map(course=>{
                        if(course.coursename === name && (`${course.status}` === "true")){
                            //setNum(prev=>prev+1)
                            console.log("statussssss",course.status)
                            //return CreateQuestionList("false")
                        }else if(course.coursename === name  && (`${course.status}` === "false") ){
                            //setNum(prev=>prev+1)
                            //return CreateQuestionList("true")
                        }
                        
                        })*/}
        
                                
                        {`${enrollStatus}`=== "true" &&
                            //<Button onClick={()=>{Enroll()}} disabled >enroll</Button>
                            <></>
                        }
                        {(`${enrollStatus}`=== "false" && role === "student") &&
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
                            width='720' 
                            height="480"
                            autoplay
        
                            poster="../../uploads/images/video-player.jpg"
                            data-setup="{}"

                        >
                        <source src="" type='type/mp4' ></source>

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