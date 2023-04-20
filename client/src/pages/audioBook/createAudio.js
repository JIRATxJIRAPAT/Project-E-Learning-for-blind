import React, { Fragment } from 'react';
import axios from 'axios';
import {
  MDBBtn,
  MDBRow,
}
from 'mdb-react-ui-kit';

import Form from 'react-bootstrap/Form';

import { useState,useEffect } from 'react';
import MultipleSelectCheckmarks from './components/multiSelect';
import Navbar1 from '../../components/Navbar';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

import {useNavigate} from 'react-router-dom'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import "../../css/audio.css";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'General',
  'Horror',
  'Comedy',
  'Novel',
  'Tales',
  'History'
];

function CreateAudioBook() {

    const navigate = useNavigate();

    const [audioBookName,setAudioBookName] = useState('')
    const [desc,setDesc] = useState('')
    const [personName, setPersonName] = useState([]);
    const [username, setUsername] = useState('')
    const [userid,setUserID] = useState('')

    const handleChange = (event) => {
      const {
        target: { value },
      } = event;
      setPersonName(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
    };

    useEffect(() => {

        const tk = localStorage.getItem('token')
    
    
        axios.get(`https://e-learning-backends.onrender.com/api/getUser/`,{
          headers:  {
                      "X-Auth-Token":tk,
                      "content-type": "application/json"
                    }
        })
        .then(res => [
          setUsername(res.data.user.name),
          setUserID(res.data.user._id),
          console.log("navbar",res.data.user.name)
        ])
        .catch(error => console.log(error));
    },[]);
    
    async function onSubmit(event) {
        event.preventDefault()
        
        const formData = new FormData();
        formData.append("audioBookName",audioBookName)
        formData.append("desc",desc)
        formData.append("category",personName.toString())
        formData.append("username",username)        
        formData.append("userid",userid)
       
		
        
		    axios.post(`https://e-learning-backends.onrender.com/api/audiobook/create`,formData)
          .then((res)=>[
            console.log(res.data),
            navigate("/audiobook")
          ])
          .catch((err)=>{
              console.log(err);
        })
    }


  return (
    <Fragment>
    <Navbar1/>
    <div className='box'>
        <div className='inner_box'>
        <main id="main-content">
        <form onSubmit={onSubmit} encType="multipart/form-data">

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>Audiobook name</Form.Label>
                      <Form.Control type="text" placeholder="enter name" size='lg'   onChange={(e) => setAudioBookName(e.target.value)}/>
                    </Form.Group>
                    <br></br>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>Descriptions</Form.Label>
                      <Form.Control type="text" placeholder="enter description" size='lg' onChange={(e) => setDesc(e.target.value)}/>
                    </Form.Group>

                    
                
                <MDBRow className='align-items-start pt-4 pb-3'>
                    <div>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
                        <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        value={personName}
                        onChange={handleChange}
                        input={<OutlinedInput label="Tag" />}
                        renderValue={(selected) => selected.join(', ')}
                        MenuProps={MenuProps}
                        
                        >
                        {names.map((name) => (
                            <MenuItem key={name} value={name}>
                            <Checkbox checked={personName.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                            </MenuItem>
                        ))}
                        </Select>
                    </FormControl>
                    </div>
                </MDBRow>

                <hr className="mx-n3" />

                <MDBBtn className='my-4' size='lg' type="submit" >submit</MDBBtn>

     
   

          </form>
        </main>       
      </div>
    </div>

    </Fragment>
  );
}

export default CreateAudioBook;