import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';


function ChaptersList(props,key) {
  return (
    <Tab.Container id="list-group-tabs-example" key={key}>
      <Row>
        <Col sm={4}>
          <ListGroup>
            <ListGroup.Item action href={`#link${props.id}`}>
              {props.title}
            </ListGroup.Item>

          </ListGroup>
        </Col>
        <Col sm={8}>
          <Tab.Content>
            <Tab.Pane eventKey={`#link${props.id}`}>
            <video
                preload="auto"
                width="320"
                height="240"
                controls
              >
                <source src={`https://e-learning-backends.onrender.com${props.video}`} />
                
            </video>
              
            </Tab.Pane>

          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
}

export default ChaptersList;