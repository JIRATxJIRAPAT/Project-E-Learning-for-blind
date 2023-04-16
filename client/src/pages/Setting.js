import { useState,useEffect} from "react"
import React from 'react';
import Translation from './Dataset/Data_setting.json';
import  { BottomNavigation, BottomNavigationAction} from "@mui/material"
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import axios from "axios";

function Setting() {

      const [ourText, setOurText] = useState("")

      const [language,setLanguage]=useState("english")
      const [content,setContent]=useState({})
      useEffect(()=>{
          if(language==="english"){
              setContent(Translation.english)
              localStorage.setItem("lang",language)
          }else if(language==="thai"){
              setContent(Translation.thai)
              localStorage.setItem("lang",language)
          }
      })    

    
    
    function passVal(){
      var pass_val = document.getElementById('myRange').value;
      localStorage.setItem('pass_val',pass_val)
      return false;
    }
    function passVol_1(){
        var pass_val2 = 0.2;
        localStorage.setItem('pass_val2',pass_val2)
        return false;
      }
      function passVol_2(){
        var pass_val2 = 0.5;
        localStorage.setItem('pass_val2',pass_val2)
        return false;
      }
      function passVol_3(){
        var pass_val2 = 1.0;
        localStorage.setItem('pass_val2',pass_val2)
        return false;
      }
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

    const myfirstelement = (
    <div id="test" class="slidecontainer" style={{background:"orange",height:10000}}>
    <h1>setting</h1>        
        <button onClick={passVol_1} type="button" id="t1">{content.vol1}</button>
        <button onClick={passVol_2} type="button" id="t2">{content.vol2}</button>
        <button onClick={passVol_3} type="button" id="t3">{content.vol3}</button>
        <input type="range" min="1" max="100" value="70" id="myRange" class="slider" onChange={passVal}/>


        <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
        <select value={language} onChange={(e)=>{setLanguage(e.target.value)}}>
                <option>english</option>
                <option>thai</option>
                
            </select>
            
            <h2>{content.vol1}</h2>
            <span>{content.vol2}</span>
            <span>{content.vol3}</span>
            

         


        
    </div>

   
    )
    
    return(
      myfirstelement
      
      
    )
  
}

export default Setting;