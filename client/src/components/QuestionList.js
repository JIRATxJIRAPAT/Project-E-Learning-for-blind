import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Quiz from '../pages/E-learning/quiz';
import React, { useState } from 'react';



/*
    <Tab.Container id="list-group-tabs-example" >
      <Row>
        <Col sm={4}>
          <ListGroup tabIndex="0">
            <ListGroup.Item action href={`#link${props.id}`} >
              Quiz
            </ListGroup.Item>

          </ListGroup>
        </Col>
        <Col sm={8}>
          <Tab.Content>
            <Tab.Pane eventKey={`#link${props.id}`}>
              
              <Quiz></Quiz>
              
            </Tab.Pane> 

          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>

*/
function QuestionList(props) {

  return (
    <Tab.Container id="list-group-tabs-example" >
    <Row>
      <Col sm={4}>
        <ListGroup tabIndex={0}>
          <ListGroup.Item  action href={`#link${props.id}`} >
            Quiz
          </ListGroup.Item>

        </ListGroup>
      </Col>
      <Col sm={8}>
        <Tab.Content>
          <Tab.Pane eventKey={`#link${props.id}`}>
            
            <Quiz></Quiz>
            
          </Tab.Pane> 

        </Tab.Content>
      </Col>
    </Row>
  </Tab.Container>
  );
}

export default QuestionList;