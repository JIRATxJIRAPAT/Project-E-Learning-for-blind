import React from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardSubTitle,
  MDBCardText,
  MDBCardLink
} from 'mdb-react-ui-kit';
import "../../../css/card2.css"
import { Button } from '@mui/material';

export default function AudioCard(props) {
  return (
    <MDBCard className='note' style={{ height: '27rem',width:"20rem" }} key={props.id}>
      <MDBCardBody>
        <MDBCardTitle style={{background:"orange",color:'black',fontWeight:'bold'}} tabIndex={0}>{props.name}</MDBCardTitle>
        <MDBCardSubTitle style={{background:"yellow",color:'black',fontWeight:'bold'}} tabIndex={0}>by {props.owner_name}</MDBCardSubTitle><br></br>
        <MDBCardSubTitle tabIndex={0}>Category : {props.category}</MDBCardSubTitle>
        <MDBCardText tabIndex={0}>
          {props.desc}
        </MDBCardText>
        {/* <MDBCardLink href={`/audiobook/${props.id}`}>Audio Link</MDBCardLink> */}
        <Button className='set_bottom2' aria-label='view' style={{background:"blue",color:'white',fontWeight:'bold'}} href={`/audiobook/${props.id}`}>View</Button>

      </MDBCardBody>
    </MDBCard>
  );
}