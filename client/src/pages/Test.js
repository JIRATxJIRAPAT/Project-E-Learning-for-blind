import React, { useState } from "react";


//import { useSpeechSynthesis } from 'react-speech-kit';

function Test() {
  const [text,setText] = useState('');
  //const {speak} = useSpeechSynthesis();

  const handleOnClick = () => {
    //speak({text:text})
  }

  return (
    
    <div>
        <h1>Text to Speech Converter in React</h1>
        <textarea  onChange={(e)=>{setText(e.target.value)}}></textarea>
        <button  onClick={()=>{handleOnClick()}}>Listen</button>
      
    </div>
  );
}

export default Test;

