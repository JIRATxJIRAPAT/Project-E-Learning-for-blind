import {React,useEffect} from 'react';
import Button from '@mui/material/Button';
import Navbar1 from '../../src/components/Navbar';
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

*/
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
    return(
        <div>
            
            <Navbar1></Navbar1>
            <div tabIndex="-1"></div>
            <Button id="second" className="example"  variant="contained">Topic</Button>
            <Button className="example"  variant="contained">second</Button>
            <Button className="example"  variant="contained">third</Button>
            <Button className="example"  variant="contained">Hello World</Button>
            <a href="">dwkpk</a>
            <label className='example'>enter name
            <input type='text' placeholder='enter name'></input>
            </label>
            <div id="demo"></div>
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