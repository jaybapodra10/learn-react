import { useState } from 'react';
import { Container, Button, Form, Card } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';

function AddUser() {
  const [redirect, setRedirect] = useState(false)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUserName] = useState('');

  const addUserData = async (e) => {
    e.preventDefault();
    const api = await fetch('https://jsonplaceholder.typicode.com/users',{
      method: 'POST',
      body: JSON.stringify({
        name: name,
        email: email,
        username: username,
      }),
      headers: {"app-id": process.env.API_KEY}
    });
    if(api.ok) setRedirect(true);
  }

  return (
    <Container className='pt-5'>
      {redirect ? <Navigate to="/"/> : ""}
      <Card>
        <Card.Body>
        <Form action='/'>
        <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter name" onChange={(e) => {setName(e.target.value)}} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" onChange={(e) => {setEmail(e.target.value)}} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicUserName">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="User name" onChange={(e) => {setUserName(e.target.value)}} />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={addUserData}>
            Submit
          </Button>{' '}
          <Link to={'/'}><Button variant="danger" type="button">
            Cancle
          </Button></Link>
        </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AddUser