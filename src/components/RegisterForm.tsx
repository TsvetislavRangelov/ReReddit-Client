import { Button, Container, Form } from "react-bootstrap";
import UsernamePasswordInput from "../api/types/UsernamePasswordInput";
import { registerUser } from "../api/UserAPI";
import { useForm, SubmitHandler } from "react-hook-form";
import IncorrectCredentials from "./errors/IncorrectCredentials";
import { useState } from "react";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";

const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UsernamePasswordInput>();
  const [error, setError] = useState<string>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<UsernamePasswordInput> = async (
    credentials
  ) => {
    await registerUser(credentials).then((res) => {
      if (res !== undefined) {
        setError("Registration successful");
      } else if (res === undefined) {
        setError("A server error has occured");
      } else {
        navigate("/Login");
      }
    });
  };
  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
      className=" text-white"
    >
      <Form className="bg-gray-800" onSubmit={handleSubmit(onSubmit)}>
        <IncorrectCredentials message={error}></IncorrectCredentials>
        <Form.Group className="mb-3 ml-2 mr-2" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            {...register("email", { required: true })}
          />
          {errors.username && (
            <span className="pr-2">This field is required</span>
          )}
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3 ml-2 mr-2" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="username"
            placeholder="Enter username"
            {...register("username", { required: true })}
          ></Form.Control>
          {errors.username && <span>This field is required</span>}
        </Form.Group>

        <Form.Group className="mb-3 ml-2 mr-2" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
          />
          {errors.password && <span>This field is required</span>}
        </Form.Group>
        <Button variant="primary" type="submit" className="ml-2 mr-2 mb-2">
          Register
        </Button>
        <div className="flex flex-row ml-8">
          <p>Already have an account?</p>
          <p>
            <NavLink to="/login" className="ml-2">
              Login
            </NavLink>
          </p>
        </div>
      </Form>
    </Container>
  );
};

export default RegistrationForm;
