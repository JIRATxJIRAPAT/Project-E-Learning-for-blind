import {React,useEffect} from 'react';
import {motion} from "framer-motion"


function Music() {
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
  return <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} style={{background:"green",height:1000}}> THIS IS THE HOME PAGE</motion.div>;
}

export default Music;