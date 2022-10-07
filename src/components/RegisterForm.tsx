import {FormEvent, useEffect, useState} from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import UsernamePasswordInput from '../api/types/UsernamePasswordInput';
import { registerUser } from '../api/UserAPI';


const RegistrationForm = () => {
    const[email, setEmail] = useState<string>('');
    const[username, setUsername] = useState<string>('');
    const[password, setPassword] = useState<string>('');
    const[loading, setLoading] = useState<boolean>(false);
    const[success, setSuccess] = useState<boolean>(false);
    let err;    

     const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const credentials: UsernamePasswordInput = {
            email,
            username,
            password
        }
        setLoading(true);
        registerUser(credentials)
        .then((res) => {
          if(res){
            setSuccess(true);
          }
        })
        .finally(() => {
          setLoading(false);
        });
     }

     if(success){
        return(<h1 style={{
            display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
        }}>Registration Successful</h1>)
     }

     if(loading){
      return <h1>Loading...</h1>
     }


    return (
        <Container style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        }}>
            
       <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control type="username" placeholder="Enter username" 
        value={username} onChange={(e) => setUsername(e.target.value)}></Form.Control>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>  
    <div>{err}</div>
   </Container>
    )  
}

export default RegistrationForm;