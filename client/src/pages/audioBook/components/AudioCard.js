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

export default function AudioCard(props) {
  return (
    <MDBCard className='note'>
      <MDBCardBody>
        <MDBCardTitle tabIndex="0">{props.name}</MDBCardTitle>
        <MDBCardSubTitle tabIndex="0">by {props.owner_name}</MDBCardSubTitle>
        <MDBCardSubTitle tabIndex="0">{props.category}</MDBCardSubTitle>
        <MDBCardText tabIndex="0">
          {props.desc}
        </MDBCardText>
        <MDBCardLink href='#'>Card link</MDBCardLink>
        <MDBCardLink href='#'>Another link</MDBCardLink>
      </MDBCardBody>
    </MDBCard>
  );
}