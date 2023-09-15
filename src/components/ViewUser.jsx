import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react';
import { Container, Button, Card, Table, Col, Form, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

function ViewUser() {
  const [user, setUser] = useState([]);
  const params = useParams();
  useEffect(() => {
    getUser(params);
  },[])
  const getUser = async (params) => {
    const api = await fetch(`https://jsonplaceholder.typicode.com/users/${params.id}`,{
      headers: {"app-id": process.env.API_KEY}
    });
    const data = await api.json();
    setUser(data);
  }

  return (
    <Container className='pt-4'>
      <Card>
        <Card.Body>
          <Row>
            <Col>
              <Card.Title>Name:</Card.Title>
              <Card.Text>
                {user.name}
              </Card.Text>
            </Col>
            <Col>
              <Card.Title>Email:</Card.Title>
              <Card.Text>
                {user.email}
              </Card.Text>
            </Col>
            <Col>
              <Card.Title>Phone:</Card.Title>
              <Card.Text>
                {user.phone}
              </Card.Text>
            </Col>
            <Col className='mb-4'>
              <Card.Title>Username:</Card.Title>
              <Card.Text>
                {user.username}
              </Card.Text>
            </Col>
            <Link to={'/'}><Button variant="primary">Go Back</Button></Link>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ViewUser