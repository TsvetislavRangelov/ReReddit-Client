import React, { useState } from "react";
import { Button, Card, ListGroup } from "react-bootstrap";
import { AuthContextType } from "../api/types/AuthTyped";
import { AuthContext } from "../context/AuthProvider";
import ProfileCardProps from "./props/ProfileCardProps";

const ProfileCard = ({ user, send }: ProfileCardProps) => {
  const { auth, saveAuth } = React.useContext(AuthContext) as AuthContextType;
  const [connected, setConnected] = useState<boolean>(false);

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
            Registered at : Placeholder Date
          </ListGroup.Item>
        </ListGroup>
        <Card.Body>
          {user.id !== auth.id ? (
            <>
              <Button
                disabled={connected}
                onClick={() => {
                  send(
                    auth.username,
                    user.username,
                    `/user/${user.username}/queue/messages`,
                    "YOOOO WHATS POPPIN"
                  );
                }}
              >
                Message
              </Button>
            </>
          ) : (
            <Button variant="primary">Edit Details</Button>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProfileCard;
