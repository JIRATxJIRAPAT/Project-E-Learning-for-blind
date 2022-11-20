import { useState,useEffect} from "react"
import React from 'react';

function Setting() {
    
    const [ourText, setOurText] = useState("")
	
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
        <button onClick={passVol_1} type="button" id="t1">Set volume to 0.2</button>
        <button onClick={passVol_2} type="button" id="t2">Set volume to 0.5</button>
        <button onClick={passVol_3} type="button" id="t3">Set volume to 1.0</button>
        <input type="range" min="1" max="100" value="70" id="myRange" class="slider" onChange={passVal}/>
        
    </div>
    )
    
    return(
      myfirstelement
    )
  
}

export default Setting;