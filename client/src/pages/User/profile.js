import { useState,useEffect } from 'react';
import axios from 'axios'
import Navbar1 from '../../components/Navbar';
import TeacherProfile from './teacherProfile';
import StudentProfile from './studentProfile';
import Button from 'react-bootstrap/Button';
import "../../css/Auth.css";




function Profile() {

    useEffect(() => {
      document.title = 'Profile page';
    }, []);

    const [username,setUserName] = useState("")
    const [enrolled,setEnrolled] = useState([])
    const [role,setRole] = useState('')
    const [owned_course,setOwnedCourse] = useState([])

    useEffect(() => {
        const tk = localStorage.getItem('token')
      
        axios.get(`https://e-learning-backends.onrender.com/api/getUser/`,{
          headers:  {
                      "X-Auth-Token":tk,
                      "content-type": "application/json"
                    }
        })
        .then(res => [
          setUserName(res.data.user.name),
          setEnrolled(res.data.user.enrolled),
          setRole(res.data.user.role),
          setOwnedCourse(res.data.user.owned_course),
          console.log("user",res.data.user)
        ])
        .catch(error => console.log(error));
    },[]);
    
    return(
      <div>
        <Navbar1/>
        <div className='box_auth'>
          <div className='inner_box_auth'>
            <main id="main-content">
              {role === "student" && 
              <StudentProfile enrolled={enrolled} />
              }
              {role === "teacher" &&
              <TeacherProfile owned_courses={owned_course}/>
              }
            </main>
          </div>

        </div>

      </div>
    )
    
}

export default Profile;