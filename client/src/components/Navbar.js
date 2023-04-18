import { useState,useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import axios from 'axios'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Translation from '../pages/Dataset/Data_navbar.json';




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


    axios.get(`http://localhost:5000/api/getUser/`,{
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
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home" className='example' id="first">{content.value1}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/course" className='example'>{content.value2}</Nav.Link>
            <Nav.Link href="/profile" className='example'>{content.value3}</Nav.Link>
            <NavDropdown title={content.value4} id="basic-nav-dropdown" className='example'>
              <NavDropdown.Item href="/audiobook" className='example'>{content.value5}</NavDropdown.Item>
              <NavDropdown.Item href="/radio"className='example'>
              {content.value6}
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2"className='example'>
              {content.value7}
              </NavDropdown.Item>
            </NavDropdown>
            
          </Nav>
        </Navbar.Collapse>
        
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text className='example'>
            
          {content.value8} : {username}  
          </Navbar.Text>&nbsp;&nbsp;
          <Button value="logout" className="example" onClick={logout} tabIndex={0} variant="contained" id="HP6">{content.value9}</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbar1;