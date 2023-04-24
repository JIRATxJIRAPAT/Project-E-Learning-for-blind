import { useEffect, useState,useRef } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Navbar1 from '../../components/Navbar'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';


import "../../css/audio.css";



import videojs from 'video.js';
import 'video.js/dist/video-js.css';



const AudioBook = () => {

    useEffect(() => {
        document.title = 'Play Audio page';
      }, []);

    const [name, setAudioBookName] = useState('')

    const [chapters,setChapters] = useState([])
    const [category, setCategory] = useState("");
    const [video,setVideos] = useState([])
    const {id} = useParams();
    const [owner_id,setOwnerID] = useState('')
    const [owner_name,setOwnerName] = useState('')
    const [firstvid,setVid] = useState('')

    //user
    const [userid,setUserID] = useState('')
    const [username,setUsername] = useState('')
    const [title,setTitle] = useState('')

    useEffect(() => {
      
      axios.get(`https://e-learning-backends.onrender.com/api/audiobook/${id}`)
      .then(res => [
        setAudioBookName(res.data.name),
        setChapters(res.data.chapters),
        setVideos(res.data.video),
        setCategory(res.data.category),
        setOwnerID(res.data.owner_id),
        setOwnerName(res.data.owner_name),
        setVid(`${res.data.chapters[0].video}`),
        setTitle(`${res.data.chapters[0].title}`),
        //console.log("course",res.data)
      ])
      .catch(error => console.log(error));

        const tk = localStorage.getItem('token')
        axios.get(`https://e-learning-backends.onrender.com/api/getUser/`,{
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
      

    },[]);

    useEffect(()=>{
        if(firstvid !== ""){
            var player = videojs('my-video');
            player.src(`${firstvid}`);
            player.autoplay()
        }
    },[firstvid])



    function videoo(chapters) {
       
        console.log(`${chapters.video}`);
        var player = videojs('my-video');
        player.src(`${chapters.video}`);
        setTitle(chapters.title)
       
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
                <main id="main-content">
                    <h2 tabIndex={0}>{name}</h2>
                    <h2 tabIndex={0}>Category : {category}</h2>
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
                                <Button variant="danger" size="lg" href={`/audiobook/edit/${id}`} >Edit </Button>
                                <Button variant="primary" size="lg" href={`/audiobook/chapter/create/${id}`}>Add Chapter </Button>
                            </>

                        }
                    </ButtonGroup>
            
                </main>
                <br></br>
                <br></br>

                <h2 tabIndex={0} > <span>Now playing : {title}</span></h2>
                <audio

                    id="my-video"
                    class="video-js"
                    controls
                    preload="auto"
                    width="640"
                    height="260">

                    
                </audio>
                </div>
            </div>
        </div>
      
    )
}

export default AudioBook