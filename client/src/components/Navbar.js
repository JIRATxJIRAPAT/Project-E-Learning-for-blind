import { useState,useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import axios from 'axios'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';




function Navbar1() {
  const [username,setUserName] = useState("")
  const navigate = useNavigate()

  function logout() {
    window.localStorage.removeItem('token')
    navigate('/login')
  }


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
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home" className='example' id="first">E-learning for blind</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/course" className='example'>all course</Nav.Link>
            <Nav.Link href="/profile" className='example'>profile</Nav.Link>
            <NavDropdown title="More" id="basic-nav-dropdown" className='example'>
              <NavDropdown.Item href="#action/3.1" className='example'>Setting</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2"className='example'>
                Help Center
              </NavDropdown.Item>
            </NavDropdown>
            
          </Nav>
        </Navbar.Collapse>
        
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text className='example'>
            
            Signed in as : {username}  
          </Navbar.Text>&nbsp;&nbsp;
          <Button value="logout" className="example" onClick={logout} tabIndex="0" variant="contained" id="HP6">logout</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbar1;