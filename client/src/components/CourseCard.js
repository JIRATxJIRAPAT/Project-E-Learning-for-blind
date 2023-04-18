import { Fragment } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import "../../src/css/card2.css"
import { Link } from 'react-router-dom'

function CourseCard(props) {
  return (
    <Fragment>

          <Card style={{ width: '18rem' }} className='note' bg="light" text="dark" key={props._id}>
            <Card.Img variant="top" width="200" height="200" src={`${props.img}`} alt='course image' />
            <Card.Body >
              <Card.Title tabIndex={0} style={{fontWeight:"bold"}}>{props.name}</Card.Title>
              <Card.Text tabIndex={0}>
                {props.desc}
              </Card.Text>
              
              <Link to={{pathname:`/course/${props._id}`}}>
                <Button variant="primary">View</Button>
              </Link>
            </Card.Body>
          </Card>

    </Fragment>
  );
}

export default CourseCard;