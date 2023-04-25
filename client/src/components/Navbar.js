import { useState,useEffect, Fragment } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Translation from '../pages/Dataset/Data_navbar.json';
import '../css/skip.css'
import "../css/navbar.css"



function Navbar1() {
  const [username,setUserName] = useState("")
  const navigate = useNavigate()

  function logout() {
    window.localStorage.removeItem('token')
    navigate('/login')
  }

  const [content,setContent]=useState({})

  useEffect(() => {
    if(localStorage.getItem("lang")==="english"){
        setContent(Translation.english)
        
    }else if(localStorage.getItem("lang")==="thai"){
        setContent(Translation.thai)
        
    }
    

  },[]);


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

  return (
    <header>

      <Navbar bg="dark" variant="dark" expand="lg" style={{fontWeight:"bold"}}>
        <a className='skip-nav-link' href='#main-content' id='skip'>Skip to content</a>
        <Container style={{fontSize:"18px"}}>
          <Navbar.Brand aria-label='E-learning for blind' href="/course" className='example' name="first" id="first">{content.value1}</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/course" id="course" name="course" className='example'>{content.value2}</Nav.Link>
              <Nav.Link href="/profile" id="profile" name="profile" className='example'>{content.value3}</Nav.Link>
              <NavDropdown title={content.value4} id="basic-nav-dropdown" className='example'>
                <NavDropdown.Item href="/audiobook" className='example'>{content.value5}</NavDropdown.Item>
                <NavDropdown.Item href="/radio"className='example'>
                {content.value6}
                </NavDropdown.Item>
                <NavDropdown.Item href="/helpcenter"className='example'>
                {content.value7}
                </NavDropdown.Item>
              </NavDropdown>
              
            </Nav>
          </Navbar.Collapse>
          
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text className='example'>
              
            {content.value8} : {username}  
            </Navbar.Text>&nbsp;&nbsp;
            {username !== "" &&
              <Button value="logout" className="example" onClick={logout} tabIndex={0} variant="danger" id="logout">{content.value9}</Button>
            }
            {username === "" &&
              <Button value="login" className="example" href="/login" tabIndex={0} variant="success" id="login">{content.value10}</Button>
            }
            
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Navbar1;