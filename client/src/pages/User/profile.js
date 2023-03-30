import { useState,useEffect } from 'react';
import axios from 'axios'
import Navbar1 from '../../components/Navbar';



function Profile() {
    const [username,setUserName] = useState("")
    const [enrolled,setEnrolled] = useState([])

    useEffect(() => {
        const tk = localStorage.getItem('token')
      
        axios.get(`http://localhost:5000/api/getUser/`,{
          headers:  {
                      "X-Auth-Token":tk,
                      "content-type": "application/json"
                    }
        })
        .then(res => [
          setUserName(res.data.user.name),
          setEnrolled(res.data.user.enrolled),
          console.log("user",res.data.user)
        ])
        .catch(error => console.log(error));
    },[]);
    
    return(
      <div>
        <Navbar1></Navbar1>
        <div>Welcome: {username}</div>
        <div>คอร์สที่ลง {enrolled.map((enroll,key)=> <div key={key}>{enroll.coursename}</div>)}</div>
      </div>
    )
    
}

export default Profile;