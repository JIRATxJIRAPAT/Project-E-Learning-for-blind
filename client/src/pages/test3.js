import React from 'react';
//import ReactDOM from 'react-dom';
function Test3() {

    /*
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


    document.addEventListener("keydown", (e) => {  
    if(e.key === "Tab"){
      const text = document.addEventListener("")
      speechHandler(text)
      console.log(e.key)
      console.log(text)
        
    }
    })
  
  
    document.getElementById('tab2').addEventListener("keydown", (e) => {  
      if(e.key === 13){
        window.location.replace('www.google.com');
      }
    })
*/
    return(
        <div>
            <div id="fuck" tabindex="-1"></div>
            <h1 id="halo" class="example" role="dialog" aria-pressed="false" tabindex="1" aria-hidden="true" >first</h1>
            <h1 id="halo1" class="example" role="dialog" aria-pressed="false" tabindex="2" aria-valuetext="สวัสดี">second</h1>
            <div class="example" tabindex="3">สวัสดี</div>
        </div>
    )

    //ReactDOM.render(myfirstelement, document.getElementById('root'));
    /*
    return(
        <div>
        <h1 id="halo" class="example" role="button" aria-pressed="false" tabindex="10" aria-valuetext="dd" >halo55</h1>
        <h1 id="halo" class="example" role="button" aria-pressed="false" tabindex="10" aria-valuetext="สวัสดี">halyyo</h1>
        <input type= "text" id= "tab1" value="สวัสดี"></input>
        <input type= "text" id= "tab2" value="ม่ายยยยยย"></input>
        <input type= "text" id= "tab3" value="เราจะไปไหน"></input>
        <input type= "text" id= "tab4" value="ไม่น่าเลย"></input>
        </div>
    )
*/
  
}

export default Test3;