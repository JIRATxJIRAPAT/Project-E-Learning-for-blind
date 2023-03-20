import {React,useEffect, useState} from 'react';
import {motion} from "framer-motion"
import { Link,useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import jwt_decode from 'jwt-decode'


function Tutorial() {

    //check login
    const navigate = useNavigate()
    const [role,setRole] = useState("")
    
    useEffect(() => {
		const token = localStorage.getItem('token')
        const status_role = localStorage.getItem('role')
        setRole(status_role)
        console.log("token",token)
		if (token) {
			const user = jwt_decode(token)
			if (!user) {
				localStorage.removeItem('token')
				navigate('/login')
			} else {
				console.log("already login");
			}
		}else{
            window.location.href = '/login'
        }
	}, [])

    
    function logout() {
        window.localStorage.removeItem('token')
        navigate('/login')
    }

    function HomePage_passVal(){
        var homepage_pass_val1 = document.getElementById('HP1').value;
        localStorage.setItem('homepage_pass_val1',homepage_pass_val1)

        var homepage_pass_val2 = document.getElementById('HP2').value;
        localStorage.setItem('homepage_pass_val2',homepage_pass_val2)
        
        var homepage_pass_val3 = document.getElementById('HP3').value;
        localStorage.setItem('homepage_pass_val3',homepage_pass_val3)
        
        var homepage_pass_val4 = document.getElementById('HP4').value;
        localStorage.setItem('homepage_pass_val4',homepage_pass_val4)

        var homepage_pass_val5 = document.getElementById('HP5').value;
        localStorage.setItem('homepage_pass_val5',homepage_pass_val5)


        //return false;
    }

    useEffect(() => {
        document.addEventListener('keydown',detectKeyDown,true)},[])
    
    const detectKeyDown = (e) => {
        if(e.key === '1'){
            window.location.replace("https://eclectic-maamoul-72e8fb.netlify.app/");
        }
        else if (e.key === '2') {
            window.location.replace("https://eclectic-maamoul-72e8fb.netlify.app/audiobook")
        }
        else if (e.key === '3') {
            window.location.replace("https://eclectic-maamoul-72e8fb.netlify.app/music")
        }
        else if (e.key === '5') {
            window.location.replace("https://eclectic-maamoul-72e8fb.netlify.app/test3")
        }
        else if (e.key === '4') {
            window.location.replace("https://eclectic-maamoul-72e8fb.netlify.app/setting")
        }

    }
    
    return (

        
        <motion.div  id="first" tabindex="-1" style={{background:"pink",height:1000}} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
            
            <div  id="first" tabindex="-1"></div>
            {role == "student" &&
            <div>
            <Button value="Welcome to tutorial" className="example" tabIndex="0" variant="contained" id="HP1">Welcome to tutorial</Button>
            <Button value="Press 1 to go Home page" className="example" tabIndex="0" variant="contained" id="HP2">Press 1 to go Home page</Button></div>
            }
            <Button value="Press 2 to go Audio book" className="example" tabIndex="0" variant="contained" id="HP3">Press 2 to go Audio book</Button>
            <Button value="Press 3 to go Music" className="example" tabIndex="0" variant="contained" id="HP4">Press 3 to go Music</Button>
            <Button value="Press 4 to go Setting" className="example" tabIndex="0" variant="contained" id="HP5">Press 4 to go Setting</Button>
            <Button value="logout" className="example" onClick={logout} tabIndex="0" variant="contained" id="HP6">logout</Button>

            <br></br>
            <Link to="/music">
                <button class="example">next page</button>
            </Link>

            
        </motion.div>
        
    )

    
}

export default Tutorial;