import {React,useEffect} from 'react';
import {motion} from "framer-motion"
import { Link } from 'react-router-dom';

function Audiobook() {

    useEffect(() => {
        document.addEventListener('keydown',detectKeyDown,true)},[])
    
    const detectKeyDown = (e) => {
        if(e.key === 'F2'){
            window.location.replace("http://localhost:3000/music");
        }
        else if (e.key === 'F1') {
            window.location.replace("http://localhost:3000/music")
        }
    }
    return (

        <motion.div style={{background:"red",height:1000}}
        initial={{opacity:0}}
        animate={{opacity:1}}
        exit={{opacity:0}}>
            Audiobook
            
            <Link to="/music">
                <button>next page</button>
            </Link>

            <div> sssss</div>
        </motion.div>
        
    )
    
}

export default Audiobook;