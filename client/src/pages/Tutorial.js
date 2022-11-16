import {React,useEffect} from 'react';
import {motion} from "framer-motion"
import { Link } from 'react-router-dom';

function Tutorial() {

    useEffect(() => {
        document.addEventListener('keydown',detectKeyDown,true)},[])
    
    const detectKeyDown = (e) => {
        if(e.key === '1'){
            window.location.replace("http://localhost:3000/");
        }
        else if (e.key === '2') {
            window.location.replace("http://localhost:3000/audiobook")
        }
        else if (e.key === '3') {
            window.location.replace("http://localhost:3000/music")
        }
        else if (e.key === '4') {
            window.location.replace("http://localhost:3000/test3")
        }
        else if (e.key === '5') {
            window.location.replace("http://localhost:3000/setting")
        }

    }
    return (

        <motion.div id="first" tabindex="-1" style={{background:"pink",height:1000}} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
            
            <div class="example" tabIndex="0">Welcome to tutorial</div>
            <div class="example" tabIndex="0">Press F2 to go Home page</div>
            <div class="example" tabIndex="0">Press F3 to go Audio book</div>
            <div class="example" tabIndex="0">Press F4 Music</div>
            <div class="example" tabIndex="0">กดปุ่ม F4 เพื่อเข้าสู่หน้า Setting </div>


            <br></br>
            <Link to="/music">
                <button class="example">next page</button>
            </Link>

            
        </motion.div>
        
    )
    
}

export default Tutorial;