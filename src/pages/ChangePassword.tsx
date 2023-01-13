import { error } from "console";
import { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { Form } from "react-bootstrap";
import ChangePasswordInput from "../api/types/ChangePasswordInput";
import IncorrectCredentials from "../components/errors/IncorrectCredentials";
import { changePassword } from "../api/UserAPI";
import UpdatePasswordData from "../api/types/UpdatePasswordData";
import { AxiosInstance } from "axios";
import React from "react";
import { AuthContextType } from "../api/types/AuthTyped";
import { AuthContext } from "../context/AuthProvider";
import useAxiosPrivate from "../custom-hooks/useAxiosPrivate";
import useRefresh from "../custom-hooks/useRefresh";

const ChangePassword = () => {
  const { auth, saveAuth } = React.useContext(AuthContext) as AuthContextType;
  const location = useLocation();
  const navigate = useNavigate();
  const refresh = useRefresh();
  const [error, setError] = useState<string>();
  const axiosPrivate = useAxiosPrivate(
    refresh,
    auth,
    saveAuth
  ) as AxiosInstance;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ChangePasswordInput>();

  const onSubmit: SubmitHandler<ChangePasswordInput> = async (
    passwords: ChangePasswordInput
  ) => {
    if (passwords.newPass !== passwords.repeatPass) {
      setError("Passwords don't match. Please enter your password again.");
    } else {
      const payload: UpdatePasswordData = {
        userId: auth.id,
        newPassword: passwords.newPass,
      };
      changePassword(axiosPrivate, payload, auth.id);
      console.log("success");
    }
  };
  useEffect(() => {
    if (location.state === null) {
      navigate("/", { replace: true });
    }
  }, []);

  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Form
        className="text-white bg-gray-700"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3 className="text-center text-lime-200">
          Your authorization code is:{" "}
          {location.state ? location.state.code : "D3D9s"}
        </h3>{" "}
        <br />
        <p className="text-lime-200 ml-2 mr-2">
          Don't share this code with anyone, as it only authorizes you to change
          your password!
        </p>
        <h3 className="ml-2 mr-2">{error}</h3>
        <Form.Group
          className="mb-3 text-white ml-2 mr-2"
          controlId="formBasicPassword"
        >
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter new password"
            {...register("newPass", { required: true })}
          />
          {errors.newPass && (
            <span className="pr-2">Password can't be empty.</span>
          )}
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group
          className="mb-3 ml-2 mr-2"
          controlId="formBasicRepeatPassword"
        >
          <Form.Label>Repeat Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Repeat Password"
            {...register("repeatPass", { required: true })}
          />
          {errors.repeatPass && <span>This field is required</span>}
        </Form.Group>
        <Button variant="primary" type="submit" className="mb-2 w-100">
          Change Password
        </Button>
        <Button
          variant="danger"
          className="mt-2 mb-2 w-100"
          onClick={() => navigate(`/user/${auth.id}`)}
        >
          Cancel Password Change
        </Button>
      </Form>
    </Container>
  );
};
export default ChangePassword;
