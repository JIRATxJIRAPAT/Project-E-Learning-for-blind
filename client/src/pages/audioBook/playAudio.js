import { useEffect, useState,useRef } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Navbar1 from '../../components/Navbar'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown';

import ChaptersList from '../../components/ChaptersList'
import QuestionList from '../../components/QuestionList'
import LeftTabsExample from '../../components/ChapterList2'

import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';



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

function CreateQuestionList(props){
    return(
        //<QuestionList status={props}/>
        <Dropdown.Item onClick={""}>{props}</Dropdown.Item>
    )
}



const AudioBook = () => {
    const [name, setAudioBookName] = useState('')

    const [chapters,setChapters] = useState([])
    const [category, setCategory] = useState("");
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

    useEffect(() => {
      
      axios.get(`http://localhost:5000/api/audiobook/${id}`)
      .then(res => [
        setAudioBookName(res.data.name),
        setChapters(res.data.chapters),
        setVideos(res.data.video),
        setCategory(res.data.category),
        setOwnerID(res.data.owner_id),
        setOwnerName(res.data.owner_name),
        //console.log("course",res.data)
      ])
      .catch(error => console.log(error));

 
      
      
    
    },[]);




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
       
    }
    function ChapterDropDown(chapters,key) {
        return (
            <Dropdown.Item onClick={()=>{videoo(chapters)}}>{chapters.title}</Dropdown.Item>
        );
    }
    

    return(
        
        <div>
            <Navbar1 />
           <h2>course:{name}</h2>
           <h2>category:{category}</h2>
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
                    //return CreateQuestionList("false")
                }else if(course.coursename === name  && (`${course.status}` === "false") ){
                    //setNum(prev=>prev+1)
                    //return CreateQuestionList("true")
                }
                
           })}
            </Dropdown.Menu>
            </Dropdown>

            <audio
                id="my-video"
                class="video-js"
                controls
                preload="auto"
                width="640"
                height="260"

            >
                
                
                <p class="vjs-no-js">
                To view this video please enable JavaScript, and consider upgrading to a
                web browser that
                <a href="https://videojs.com/html5-video-support/" rel="noreferrer" target="_blank">supports HTML5 video</a>
                </p>
            </audio>

        

        

 
           

           
           
        </div>
      
    )
}

export default AudioBook