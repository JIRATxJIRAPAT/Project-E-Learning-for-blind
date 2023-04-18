import { useState,useEffect} from "react"
import React from 'react';
import Translation from './Dataset/Data_setting.json';
import Navbar1 from "../components/Navbar";
import "../css/Auth.css"
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function Setting() {

      const [ourText, setOurText] = useState("")
      const navigate = useNavigate()

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
      },[]) 


      useEffect(() => {
        if(language==="english"){
            navigate('/setting')
        }
        else if(language==="thai"){
            navigate('/setting')
        }
      },[language]);   

    
    
    function passVal(){
      var pass_val = document.getElementById('myRange').value;
      localStorage.setItem('pass_val',pass_val)
      return false;
    }
    function passVol_0(){
        var pass_val2 = 0.0;
        localStorage.setItem('pass_val2',pass_val2)
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
    function passVol_4(){
          var pass_val2 = 0.0;
          localStorage.setItem('pass_val2',pass_val2)
          return false;
    }

    

    

      const myfirstelement = (
        <div>
            <Navbar1/>
            <div className="box_auth">
                <div className="inner_box_auth">
                    <h1>Setting</h1>
                    <Button onClick={passVol_0} type="button" id="t0">{content.vol0}</Button><br></br><br></br>
                    <Button onClick={passVol_1} type="button" id="t1">{content.vol1}</Button><br></br><br></br>
                    <Button onClick={passVol_2} type="button" id="t2">{content.vol2}</Button><br></br><br></br>
                    <Button onClick={passVol_3} type="button" id="t3">{content.vol3}</Button><br></br><br></br>
                    <Button onClick={passVol_4} type="button" id="t3">{content.vol4}</Button><br></br><br></br>
                    <br></br><br></br><br></br><br></br><br></br><br></br>
                    {content.vol5}<br></br>
                    <select value={language} onChange={(e)=>{setLanguage(e.target.value)}}>
                            <option>english</option>
                            <option>thai</option>
    
                    </select>
    
                        <h2>{content.vol4}</h2>
    
                </div>
            </div>
    
     
        </div>
    
    
        )
    
    return(
      myfirstelement
      
      
    )
  
}

export default Setting;