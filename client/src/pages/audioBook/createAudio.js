import React, { Fragment } from 'react';
import axios from 'axios';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBTextArea,
  MDBFile
}
from 'mdb-react-ui-kit';
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

function BasicExample() {



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
    
    
        axios.get(`http://localhost:5000/api/getUser/`,{
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
       
		
        
		    axios.post(`http://localhost:5000/api/audiobook/create`,formData)
          .then((res)=>console.log(res.data))
          .catch((err)=>{
              console.log(err);
        })
    }


  return (
    <Fragment>
    <Navbar1/>
    <div className='box'>
        <div className='inner_box'>
        <form onSubmit={onSubmit} encType="multipart/form-data">
        <MDBContainer fluid>

        <MDBRow className='d-flex justify-content-center align-items-center'>
            <MDBCol lg='9' className='my-5'>

            <h1 class="text-white mb-4">Apply for a job</h1>

            <MDBCard>
                <MDBCardBody className='px-4'>

                <MDBRow className='align-items-center pt-4 pb-3'>

                    <MDBCol md='3' className='ps-5'>
                    <h6 className="mb-0">Full name</h6>
                    </MDBCol>

                    <MDBCol md='9' className='pe-5'>
                    <MDBInput label="Full name" placeholder='Full name' size='lg' id='form1' type='text' onChange={(e) => setAudioBookName(e.target.value)}/>
                    </MDBCol>

                </MDBRow>

                <MDBRow className='align-items-center pt-4 pb-3'>

                    <MDBCol md='3' className='ps-5'>
                    <h6 className="mb-0">Description</h6>
                    </MDBCol>

                    <MDBCol md='9' className='pe-5'>
                    <MDBInput label='Description' placeholder='Description' size='lg' id='form1' type='text' onChange={(e) => setAudioBookName(e.target.value)}/>
                    </MDBCol>

                    </MDBRow>


                <MDBRow className='align-items-center pt-4 pb-3'>

                    <MDBCol md='3' className='ps-5'>
                    <h6 className="mb-0">Message</h6>
                    </MDBCol>

                    <MDBCol md='9' className='pe-5'>
                    <MDBTextArea label='Message' id='textAreaExample' rows={3} />
                    </MDBCol>

                </MDBRow>
                
                <MDBRow className='align-items-center pt-4 pb-3'>
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

                </MDBCardBody>
            </MDBCard>

            </MDBCol>
        </MDBRow>

        </MDBContainer>
    </form>        
        </div>
    </div>

    </Fragment>
  );
}

export default BasicExample;