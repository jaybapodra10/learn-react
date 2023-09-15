import { useEffect, useState } from 'react';
import { Container, Button, Form, Card } from 'react-bootstrap';
import { Link, Navigate, useParams } from 'react-router-dom';

function EditUser() {
  const params = useParams();
  const [redirect, setRedirect] = useState(false)
  const [user, setUser] = useState([]);

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

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [username, setUserName] = useState(user.username);

  const editUserData = async (e) => {
    e.preventDefault();
    const api = await fetch(`https://jsonplaceholder.typicode.com/users/${params.id}`,{
      method: 'PUT',
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
            <Form.Control type="text" placeholder="Enter name" value={user.name} onChange={(e) => {setName(e.target.value)}} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={user.email} onChange={(e) => {setEmail(e.target.value)}} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicUserName">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="User name" value={user.username} onChange={(e) => {setUserName(e.target.value)}} />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={editUserData}>
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

export default EditUser