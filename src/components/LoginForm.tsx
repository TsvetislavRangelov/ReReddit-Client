import { Button, Container, Form, ProgressBar } from "react-bootstrap";
import { login } from "../api/UserAPI";
import { useForm, SubmitHandler } from "react-hook-form";
import LoginInput from "../api/types/LoginInput";
import { useNavigate } from "react-router";
import IncorrectCredentials from "./errors/IncorrectCredentials";
import { useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { AuthContextType, iAuth } from "../api/types/AuthTyped";
import React from "react";
import { registerActivityLog } from "../api/ActivityLogAPI";
import CreateLogData from "../api/types/CreateLogData";
import { NavLink } from "react-router-dom";

const LoginForm = () => {
  const { saveAuth } = React.useContext(AuthContext) as AuthContextType;
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

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
        const logDataFail: CreateLogData = {
          success: false,
          profile: credentials.email,
        };
        registerActivityLog(logDataFail);
        setError("Incorrect Credentials. Try again");
      }
      let newAuth: iAuth = {
        id: res.id,
        username: res.username,
        roles: res.roles,
        accessToken: res.accessToken,
        refreshToken: res.refreshToken,
      };

      saveAuth(newAuth);
      const logDataSuccess: CreateLogData = {
        success: true,
        profile: credentials.email,
      };
      registerActivityLog(logDataSuccess);
      navigate("/", { replace: true });
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
      className="text-white"
    >
      <Form className="bg-gray-800" onSubmit={handleSubmit(onSubmit)}>
        <IncorrectCredentials message={error}></IncorrectCredentials>
        <Form.Group className="mb-3 ml-2 mr-2" controlId="formBasicEmail">
          <Form.Label className="ml-2 mr-2">Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="pr-2">
              Email can't be empty and must be valid.
            </span>
          )}
        </Form.Group>
        <Form.Group className="mb-3 ml-2 mr-2" controlId="formBasicPassword">
          <Form.Label className="ml-2">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            className="mr-2"
            {...register("password", { required: true })}
          />
          {errors.password && <span>Password can't be empty.</span>}
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          className="ml-2 mr-2 mb-2 w-60"
          disabled={loading}
        >
          {loading ? "Loading..." : "Login"}
        </Button>
        <div className="flex flex-row">
          <p className="mr-2 ml-8">New to ReReddit?</p>
          <p>
            <NavLink to="/register" className="no-underline">
              Sign up
            </NavLink>
          </p>
        </div>
      </Form>
    </Container>
  );
};

export default LoginForm;
