import {FormEvent, useState} from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import UsernamePasswordInput from '../api/types/UsernamePasswordInput';
import { useRegisterUser } from '../api/UserAPI';


const RegistrationForm = () => {
    const[id, error, loading, registerUser] = useRegisterUser();
    const[email, setEmail] = useState<string>('');
    const[username, setUsername] = useState<string>('');
    const[password, setPassword] = useState<string>('');
    let err;    

     const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log(`Submission: ${email} : ${password} : ${username}`);

        const credentials: UsernamePasswordInput = {
            email,
            username,
            password
        }
        registerUser(credentials);   
     }

     if(id !== undefined){
        return(<h1 style={{
            display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
        }}>Registration Successful</h1>)
     }
     if(error){
        err = <div>a server error has occured</div>
     }
     else{
        err = <div></div>
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