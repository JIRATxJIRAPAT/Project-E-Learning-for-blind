import {React,useEffect} from 'react';
import {motion} from "framer-motion"
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

function Audiobook() {

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

        <motion.div style={{background:"powderblue",height:1000}}
        initial={{opacity:0}}
        animate={{opacity:1}}
        exit={{opacity:0}}>

            <div id="first" tabindex="-1"></div>
            <Button className="example" tabindex="0" variant="contained">AudioBook</Button>
            <Button className="example" tabindex="0" variant="contained">Book List</Button>
            <Link to="/music">
            <Button className="example" tabindex="0" variant="contained">NextPage</Button>
            </Link>

            
        </motion.div>
        
    )
    
}

export default Audiobook;