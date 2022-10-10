import { Button, Container, Form } from 'react-bootstrap';
import UsernamePasswordInput from '../api/types/UsernamePasswordInput';
import { registerUser } from '../api/UserAPI';
import {useForm, SubmitHandler} from "react-hook-form";


const RegistrationForm = () => {
    const {register, handleSubmit, watch, formState: {errors}} = useForm<UsernamePasswordInput>();

     const onSubmit: SubmitHandler<UsernamePasswordInput> = async (credentials) => {
        await registerUser(credentials);
        
     }
    return (
        <Container style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        }}>
            
       <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" {...register("email", {required: true})}/>
        {errors.username && <span className="pr-2">This field is required</span>}
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control type="username" placeholder="Enter username" 
        {...register("username", {required: true})}></Form.Control>
        {errors.username && <span>This field is required</span>}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" {...register("password", {required: true})}/>
        {errors.password && <span>This field is required</span>}
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>  
   </Container>
    )  
}

export default RegistrationForm;