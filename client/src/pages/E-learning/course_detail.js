import { useEffect, useState,useRef, Fragment } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar1 from '../../components/Navbar'
import Quiz from './quiz'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown';
import Card from 'react-bootstrap/Card';

import '../../css/test.css'
import "../../css/course.css"

const CourseDetail = () => {

    useEffect(() => {
        document.title = 'Course Detail page';
      }, []); 

    const [name, setCourseName] = useState('')  
    const [chapters,setChapters] = useState([])
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
    const [img,setImage] = useState('')
    const [desc,setDescription] = useState('')

    //page check
    const [title,setTitle] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
      
      axios.get(`https://e-learning-backends.onrender.com/api/course/${id}`)
      .then(res => [
        setCourseName(res.data.name),
        setChapters(res.data.chapters),
        setDescription(res.data.desc),
        setImage(res.data.img),
        setOwnerID(res.data.owner_id),
        setOwnerName(res.data.owner_name),
        setTitle(`${res.data.chapters[0].title}`),
      ])
      .catch(error => console.log(error));

      FetchData()
    },[]);

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

    function ChapterDropDown(chapters,key) {
        return (
            
            <Dropdown.Item>{chapters.title}</Dropdown.Item>
        );
    }

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

    return(

            <Fragment>
            <Navbar1/>

            <div className='box_course_play'>

                <div className='inner_box_course'>
                <main id="main-content">
                    <div className='grid'>
                    
                        <aside class="page-rightbar">
                            <div class="content">
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic" size="md">
                                    Chapter in This Course
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {chapters.map((chapter,key)=>ChapterDropDown(chapter,key))}

                                </Dropdown.Menu>
                            </Dropdown>

                            <br></br><br></br><br></br><br></br><br></br>
                            <br></br><br></br><br></br><br></br><br></br>
                            
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
                                    <></>
                                }
                                {(`${enrollStatus}`=== "false" && role === "student") &&
                                    <Button onClick={()=>{Enroll()}} >Enroll</Button>
                                }
                                
                                    <div class="bottom">
                                        <Button  variant='danger' href={`/course/${id}`} >Go to Course</Button>
                                    </div>
                                    
                                
                            </div>
                        </aside>
                    
                        

                        <main class="page-main">
                            <div class="content">
                            <h2 tabIndex={0} style={{background:"blue",color:'white'}}>Course Name : {name}</h2>
                            <br></br><br></br>
     
                            <br></br><br></br>
                            <Card.Img variant="top" width="100" height="300" src={`${img}`} alt='course image' />
                            
                            <br></br><br></br>
                            <h3>
                            {desc}
                            </h3>
                                
                            

                            </div>
                        </main>
      
                    </div>
                </main>
                </div>
            </div>
            </Fragment>
    )
}

export default CourseDetail