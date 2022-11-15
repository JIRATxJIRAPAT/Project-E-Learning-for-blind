
import { useState } from "react"
import React from 'react';
import ReactDOM from 'react-dom';


function Test2() {
    
    const [ourText, setOurText] = useState("")

    const msg = new SpeechSynthesisUtterance()
    msg.voice = speechSynthesis.getVoices().filter(voice => voice.lang === 'th-TH')[0];
	msg.volume = 1;                  // 0 ถึง1 เป็นระดับความดัง
	msg.rate = 1.25;                  // 0.1 ถึง 10 อัตราเร็วของการพูด
	msg.pitch = 2;                //0 ถึง 2 // ลักษณะระดับเสียงสูงต่ำ
		
    const speechHandler = (txt) => {
      msg.text = txt
      msg.voice = speechSynthesis.getVoices().filter(voice => voice.lang === 'th-TH')[0];
      msg.volume = 1;                  // 0 ถึง1 เป็นระดับความดัง
      msg.rate = 1.25;                  // 0.1 ถึง 10 อัตราเร็วของการพูด
      msg.pitch = 2;                //0 ถึง 2 // ลักษณะระดับเสียงสูงต่ำ
      window.speechSynthesis.speak(msg)
    }

/*
    document.getElementById('tab1').addEventListener("keydown", (e) => {  
    if(e.key === 9){
      const text = document.getElementById('tab1').value;
      console.log(text)
      speechHandler(text)
    }
    })
  
  
    document.getElementById('tab2').addEventListener("keydown", (e) => {  
      if(e.key === 13){
        window.location.replace('www.google.com');
      }
    })
    */
    const myfirstelement = (
    <div id="test">
    <h1>ddd</h1>
        <input type= "text" id= "tab1" value="สวัสดี"></input>
        <input type= "text" id= "tab2" value="ม่ายยยยยย"></input>
        <input type= "text" id= "tab3" value="เราจะไปไหน"></input>
        <input type= "text" id= "tab4" value="ไม่น่าเลย"></input>
    </div>
    )
    
    ReactDOM.render(myfirstelement, document.getElementById('root'));
  
}

export default Test2;
