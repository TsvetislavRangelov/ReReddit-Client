import { AxiosInstance } from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { Card, ListGroup } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { AuthContextType } from "../api/types/AuthTyped";
import LoggedInUser from "../api/types/LoggedInUser";
import { getUser } from "../api/UserAPI";
import { AuthContext } from "../context/AuthProvider";
import useAxiosPrivate from "../custom-hooks/useAxiosPrivate";
import useRefresh from "../custom-hooks/useRefresh";
import ProfileCardProps from "./props/ProfileCardProps";
import ServerError from "./ServerError";

const ProfileCard = (props: ProfileCardProps) => {
  const { auth, saveAuth } = React.useContext(AuthContext) as AuthContextType;
  const [user, setUser] = useState<LoggedInUser>();
  const refresh = useRefresh();
  const axiosPrivate = useAxiosPrivate(
    refresh,
    auth,
    saveAuth
  ) as AxiosInstance;

  useEffect(() => {
    getUser(props.id, axiosPrivate).then((res) => {
      console.log(res);
      setUser(res);
    });
  }, []);

  if (!user) {
    return <ServerError message="No data was found."></ServerError>;
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
          Role: {auth.roles}
          <ListGroup.Item className="bg-dark text-white"></ListGroup.Item>
        </ListGroup>
        <Card.Body>
          <div>
            <NavLink to="/" className="no-underline text-xxl">
              Edit Details
            </NavLink>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProfileCard;
