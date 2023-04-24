import { Fragment } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "../../src/css/card2.css"


function CourseCard(props) {
  return (
    <Fragment>

          <Card style={{ width: '18rem' }} className='note' bg="light" text="dark" key={props._id}>
            <Card.Img variant="top" width="200" height="200" src={`${props.img}`} alt='course image' />
            <Card.Body >
              <Card.Title tabIndex={0} style={{fontWeight:"bold"}}>{props.name}</Card.Title>
              <br></br>
              <Card.Text tabIndex={0}>
                {props.desc}
              </Card.Text>
              
              
              <Button className='set_bottom' variant="primary" href={`/course/detail/${props._id}`}>View</Button>
              
            </Card.Body>
          </Card>

    </Fragment>
  );
}

export default CourseCard;