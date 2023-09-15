import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react';
import { Container, Button, Table, Col, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function List() {
  let count = 0;
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUser();
  },[])
  const getUser = async () => {
    const api = await fetch('https://jsonplaceholder.typicode.com/users',{
      headers: {"app-id": process.env.API_KEY}
    });
    const data = await api.json();
    console.log(data)
    setUsers(data);
  }

  const handleDelete = async (id) => {
    if(window.confirm("Delete Item?")){
      let deleteData = users.filter(e => e.id != id)
      const api = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: 'DELETE',
        headers: {"app-id": process.env.API_KEY}
      });
      if(api.ok) console.log(api.ok);
      setUsers(deleteData);
    }
  }

  const searchUsers = async (e) => {
    let api;
    if(e.target.value===""){
      api = await fetch('https://jsonplaceholder.typicode.com/users',{
        headers: {"app-id": process.env.API_KEY}
      });
    }else{
      api = await fetch(`https://jsonplaceholder.typicode.com/users?username=${e.target.value}`, {
      headers: {"app-id": process.env.API_KEY}
    });
    }
    const data = await api.json();
    setUsers(data);
  }

  return (
    <Container className='pt-4'>
      <Row className='mb-4'>
        <Col><Form.Control type="text" placeholder="Search Username" onChange={(e) => searchUsers(e)} /></Col>
        <Col><Link to={'/add-user'}><Button variant="primary">Add User</Button></Link></Col>
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Username</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{count += 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.username}</td>
              <td>
                <Link to={`/view-user/${user.id}`}><Button variant='info'><FontAwesomeIcon icon={faEye} /></Button></Link>
                <Link to={`/edit-user/${user.id}`}><Button variant='warning'><FontAwesomeIcon icon={faPen} /></Button></Link>
                <Button value={user.id} onClick={() => handleDelete(user.id)} variant='danger'><FontAwesomeIcon icon={faTrash} /></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default List