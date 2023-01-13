import React, { useEffect, useState } from "react";
import { Button, Card, Form, ListGroup } from "react-bootstrap";
import { AuthContextType } from "../api/types/AuthTyped";
import { AuthContext } from "../context/AuthProvider";
import ProfileCardProps from "./props/ProfileCardProps";
import 'reactjs-popup/dist/index.css';
import Popup from 'reactjs-popup';
import { generateRandomPassword } from "../utils/StringGenerator";
import { changePassword, validatePasswordForUser} from "../api/UserAPI";
import UpdatePasswordData from "../api/types/UpdatePasswordData";
import { AxiosInstance } from "axios";
import useAxiosPrivate from "../custom-hooks/useAxiosPrivate";
import useRefresh from "../custom-hooks/useRefresh";
import PasswordValidationInput from "../api/types/PasswordValidationInput";
import { SubmitHandler, useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router";

const ProfileCard = ({ user}: ProfileCardProps) => {
  const { auth, saveAuth } = React.useContext(AuthContext) as AuthContextType;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [generatedPassword, setGeneratedPassword] = useState<string>('');
  const [oldPasswordMatches, setOldPasswordMatches] = useState<boolean>(false);
  const refresh = useRefresh();
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
  } = useForm<PasswordValidationInput>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<PasswordValidationInput> = async (
    pass: PasswordValidationInput
  ) => {
    pass.userId = auth.id;
    validatePasswordForUser(axiosPrivate, pass).then((res) => {
      console.log(res);
      setOldPasswordMatches(res);
      console.log(oldPasswordMatches);
    })
  }

  return (
    <div className="flex flex-col justify-center items-center mt-2 ml-2">
      <Card style={{ width: "18rem" }} className="card text-white bg-dark mb-3">
        <Card.Img
          variant="top"
          src="https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
        />
        <Card.Body className="bg-dark">
          <Card.Title className="text-white">{user.username}</Card.Title>
          <Card.Text className="text-white"></Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item className="bg-dark text-white">
            {user.email}
          </ListGroup.Item>
          <ListGroup.Item className="bg-dark text-white">
            Registered at : 
          </ListGroup.Item>
        </ListGroup>
        <Card.Body>
          {user.id !== auth.id ? (
            ""
          ) : (
            <Popup trigger={<Button variant="primary" onClick={() => {setIsOpen(!isOpen)}} disabled={isPasswordVisible}>Change Password</Button>} modal={true} open={isOpen}>
              <Form hidden={oldPasswordMatches} onSubmit={handleSubmit(onSubmit)}>
                <Form.Control type="password" placeholder="Enter your old password" {...register("oldPassword", {required: true})}></Form.Control>
                {errors.oldPassword && <span>This field is required</span>}
                <Button type="submit">Validate</Button>
              </Form>
              <div hidden={!oldPasswordMatches} className="flex flex-col" style={{textAlign: "center"}}>
                <h4>You can choose to use a strong password generated by us, or you can use your own!</h4>
                <Button className="mb-2" variant="primary" onClick={() => {
                  
                  const newPass: string = generateRandomPassword(15);
                  setGeneratedPassword(newPass);
                  const payload: UpdatePasswordData = {
                    userId: auth.id,
                    newPassword: newPass
                  }
                  console.log(payload);
                  setIsPasswordVisible(true);
                  changePassword(axiosPrivate, payload, auth.id);

                  }} disabled={isPasswordVisible}>Use Strong Password</Button>
                <Button variant="primary" disabled={isPasswordVisible} onClick={() => {
                navigate("/change-pass", {state: {code: generateRandomPassword(5)}});
                }}> Use Own Password</Button>
              </div>
              <div hidden={!isPasswordVisible}>
                <p style={{textAlign: "center", color: "red"}}>Your new generated password is: {generatedPassword}</p> <br />
                <p style= {{textAlign: "center", color: "red"}}>Make sure to save it now, otherwise you would need a new one.</p>
              </div>
            </Popup>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProfileCard;