import {React,useEffect,useState} from 'react';
import {motion} from "framer-motion"
import Button from '@mui/material/Button';

import  { BottomNavigation, BottomNavigationAction} from "@mui/material"
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import { Icon } from 'semantic-ui-react';


function Music() {

  const [value,setValue] = useState(0)
  useEffect(() => {
    document.addEventListener('keydown',detectKeyDown,true)},[])

    const detectKeyDown = (e) => {
      if(e.key === '1'){
          window.location.replace("http://e-learningforblind.netlify.app/");
      }
      else if (e.key === '2') {
          window.location.replace("http://e-learningforblind.netlify.app/audiobook")
      }
      else if (e.key === '3') {
          window.location.replace("http://e-learningforblind.netlify.app/music")
      }
      else if (e.key === '4') {
          window.location.replace("http://e-learningforblind.netlify.app/test3")
      }
      else if (e.key === '5') {
        window.location.replace("http://e-learningforblind.netlify.app/setting")
      }
      

  }
  return <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} style={{background:"lightgreen",height:1000}}>
      <div id="first" tabindex="-1"></div>
             <Button className="example" tabindex="0" variant="contained">Music List</Button>
            <Button className="example" tabindex="0" variant="contained">Hot This Week</Button>
            <Button className="example" tabindex="0" variant="contained">NextPage</Button> 
             <>{CastForEducationIcon}</> 
            
            {/* <BottomNavigation sx={{width: '200%', position: 'absolute', bottom: 0}}
                value={value} onChange={(event,newValue) => {
                  setValue(newValue)
                }}
            >
            <BottomNavigationAction label='E-learning' icon={CastForEducationIcon}/>
        </BottomNavigation>  */}
      </motion.div>;
}

export default Music;