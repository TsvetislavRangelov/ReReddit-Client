import { Button, Container, Form } from "react-bootstrap";
import { login } from "../api/UserAPI";
import { useForm, SubmitHandler } from "react-hook-form";
import LoginInput from "../api/types/LoginInput";
import { useNavigate } from "react-router";
import IncorrectCredentials from "./errors/IncorrectCredentials";
import { useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { AuthContextType, iAuth } from "../api/types/AuthTyped";
import React from "react";

const LoginForm = () => {
  const { saveAuth } = React.useContext(AuthContext) as AuthContextType;
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginInput>();
  const [error, setError] = useState<string>();

  const onSubmit: SubmitHandler<LoginInput> = async (
    credentials: LoginInput
  ) => {
    await login(credentials).then((res) => {
      if (res === undefined) {
        setError("Incorrect Credentials. Try again");
      }
      let newAuth: iAuth = {
        id: res.id,
        username: res.username,
        roles: res.roles,
        accessToken: res.accessToken,
        refreshToken: res.refreshToken,
      };
      console.log(newAuth);

      saveAuth(newAuth);
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
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <IncorrectCredentials message={error}></IncorrectCredentials>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            {...register("email", { required: true })}
          />
          {errors.email && <span className="pr-2">This field is required</span>}
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
          />
          {errors.password && <span>This field is required</span>}
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default LoginForm;
