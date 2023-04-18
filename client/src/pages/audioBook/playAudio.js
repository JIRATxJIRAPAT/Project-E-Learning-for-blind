import { useEffect, useState,useRef } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Navbar1 from '../../components/Navbar'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ChaptersList from '../../components/ChaptersList'
import QuestionList from '../../components/QuestionList'
import LeftTabsExample from '../../components/ChapterList2'

import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import "../../css/audio.css";



import videojs from 'video.js';
import 'video.js/dist/video-js.css';



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

    const [userid,setUserID] = useState('')
    const [username,setUsername] = useState('')


    useEffect(() => {
      
      axios.get(`http://localhost:5000/api/audiobook/${id}`)
      .then(res => [
        setAudioBookName(res.data.name),
        setChapters(res.data.chapters),
        setVideos(res.data.video),
        setCategory(res.data.category),
        setOwnerID(res.data.owner_id),
        setOwnerName(res.data.owner_name),
        FetchData()
        //console.log("course",res.data)
      ])
      .catch(error => console.log(error));
      

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
        console.log("get user",res.data.user._id)
      ])
      .catch(error => console.log(error));
    }



    function videoo(chapters) {
       
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
            <div className='box'>
                <div className='inner_box'>
                <h2>Course : {name}</h2>
                <h2>Category : {category}</h2>
                <ButtonGroup>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic" size="lg">
                            Select Chapters
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {chapters.map((chapter,key)=>ChapterDropDown(chapter,key))}    
                        </Dropdown.Menu>
                    </Dropdown>
                    {(owner_id === userid) &&
                        <>
                            <Button variant="danger" size="lg" href='/' >Edit </Button>
                            <Button variant="primary" size="lg" href={`/audiobook/chapter/create/${id}`}>Add Chapter </Button>
                        </>

                    }
                </ButtonGroup>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <audio

                    id="my-video"
                    class="video-js"
                    controls
                    preload="auto"
                    width="640"
                    height="260">

                    <p class="vjs-no-js">
                    To view this video please enable JavaScript, and consider upgrading to a
                    web browser that
                    <a href="https://videojs.com/html5-video-support/" rel="noreferrer" target="_blank">supports HTML5 video</a>
                    </p>
                </audio>
                </div>
            </div>
        </div>
      
    )
}

export default AudioBook