import { useState,useEffect} from "react"
import React from 'react';
import Translation from './Dataset/Data_setting.json';
import "../css/Auth.css"
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import axios from 'axios'
import Translation2 from '../pages/Dataset/Data_navbar.json';

function Setting() {

    const navigate = useNavigate()
    
    const [language,setLanguage]=useState("")
    const [content,setContent]=useState({})
      
      
      useEffect(() => {
        var set_lang = localStorage.getItem("lang")
        
        if(set_lang==="english"){
            setContent(Translation.english)
            setContent2(Translation2.english)
        }else{
            setContent(Translation.thai)
            setContent2(Translation2.thai)
        }

      },[]); 


      useEffect(()=>{
          if(language==="english"){
              setContent(Translation.english)
              localStorage.setItem("lang",language)
              console.log(localStorage.getItem("lang"))
          }else if(language==="thai"){
              setContent(Translation.thai)
              localStorage.setItem("lang",language)
              console.log(localStorage.getItem("lang"))
          }

      },[language]) 


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

//////////////////////////////////////////////////////////////////////

    const [content2,setContent2]=useState({})

    useEffect(() => {
    if(localStorage.getItem("lang")==="english"){
        setContent2(Translation2.english)
        
    }else if(localStorage.getItem("lang")==="thai"){
        setContent2(Translation2.thai)
        
    }},[language]);

    function logout() {
        window.localStorage.removeItem('token')
        navigate('/login')
      }
    
    const [username,setUserName] = useState("")

    useEffect(() => {

        const tk = localStorage.getItem('token')
    
    
        axios.get(`https://e-learning-backends.onrender.com/api/getUser/`,{
          headers:  {
                      "X-Auth-Token":tk,
                      "content-type": "application/json"
                    }
        })
        .then(res => [
          setUserName(res.data.user.name),
          console.log("navbar",res.data.user.name)
        ])
        .catch(error => console.log(error));
      },[]);


      function setLanguage_button(val) {
        if(val==="english"){
            console.log("xxxxxxxxcccccccc",val)
            setLanguage(val)
        }else{
            console.log("xxxxxxxxcccccccc",val)
            setLanguage(val)
        }
      }
        
    

    

    const navbar_setting = (
        <Navbar bg="dark" variant="dark" expand="lg">
            <a className='skip-nav-link' href='#main-content' id='skip'>Skip to content</a>
            <Container>
                <Navbar.Brand href="/course" className='example' id="first">{content2.value1}</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/course" className='example'>{content2.value2}</Nav.Link>
                    <Nav.Link href="/profile" className='example'>{content2.value3}</Nav.Link>
                    <NavDropdown title={content2.value4} id="basic-nav-dropdown" className='example'>
                    <NavDropdown.Item href="/audiobook" className='example'>{content2.value5}</NavDropdown.Item>
                    <NavDropdown.Item href="/radio"className='example'>
                    {content2.value6}
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2"className='example'>
                    {content2.value7}
                    </NavDropdown.Item>
                    </NavDropdown>
                    
                </Nav>
                </Navbar.Collapse>
                
                <Navbar.Collapse className="justify-content-end">
                <Navbar.Text className='example'>
                    
                {content2.value8} : {username}  
                </Navbar.Text>&nbsp;&nbsp;
                {username !== "" &&
                    <Button value="logout" className="example" onClick={logout} tabIndex={0} variant="danger" id="logout">{content2.value9}</Button>
                }
                {username === "" &&
                    <Button value="login" className="example" href="/login" tabIndex={0} variant="success" id="login">{content2.value10}</Button>
                }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )

      const myfirstelement = (
        <div>
            {navbar_setting}
            
            <div className="box_auth">
                <div className="inner_box_auth">
                    <h1>Setting</h1>
                    <Button onClick={passVol_0} type="button" id="t0">{content.vol0}</Button><br></br><br></br>
                    <Button onClick={passVol_1} type="button" id="t1">{content.vol1}</Button><br></br><br></br>
                    <Button onClick={passVol_2} type="button" id="t2">{content.vol2}</Button><br></br><br></br>
                    <Button onClick={passVol_3} type="button" id="t3">{content.vol3}</Button><br></br><br></br>
                    <br></br><br></br><br></br><br></br><br></br><br></br>
                    {content.vol5}<br></br>
                    {/* <select value={language} onChange={(e)=>{setLanguage(e.target.value)}}>
                            <option>english</option>
                            <option>thai</option>
    
                    </select> */}
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Select Language
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={()=>{setLanguage_button("english")}}>english</Dropdown.Item>
                            <Dropdown.Item onClick={()=>{setLanguage_button("thai")}}>thai</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

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