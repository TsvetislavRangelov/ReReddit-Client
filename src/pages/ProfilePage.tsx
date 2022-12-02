import { AxiosInstance } from "axios";
import React, { useEffect, useState } from "react";
import { Spinner, Stack } from "react-bootstrap";
import { Navigate, useLocation, useParams } from "react-router";
import UserQueryParams from "../api/params/UserQueryParams";
import { AuthContextType } from "../api/types/AuthTyped";
import LoggedInUser from "../api/types/LoggedInUser";
import { Post } from "../api/types/Post";
import { getUser } from "../api/UserAPI";
import { getPostsByUserId } from "../api/UserPostAPI";
import NotFound404 from "../components/errors/NotFound404";
import PostContainer from "../components/PostContainer";
import ProfileCard from "../components/ProfileCard";
import ServerError from "../components/ServerError";
import { AuthContext } from "../context/AuthProvider";
import useAxiosPrivate from "../custom-hooks/useAxiosPrivate";
import useRefresh from "../custom-hooks/useRefresh";
import { WebSocketConfig } from "../utils/WebSocketConfig";

const Profile = () => {
  const params = useParams<UserQueryParams>();
  const [foundUser, setFoundUser] = useState<LoggedInUser>();
  const { auth, saveAuth } = React.useContext(AuthContext) as AuthContextType;
  const location = useLocation();
  const [posts, setPosts] = useState<Post[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const parsedId = Number(params.id);
  const refresh = useRefresh();
  const [connected, setConnected] = useState();
  const client = WebSocketConfig();
  const axiosPrivate = useAxiosPrivate(
    refresh,
    auth,
    saveAuth
  ) as AxiosInstance;

  useEffect(() => {
    getUser(parsedId, axiosPrivate)
      .then((res) => {
        if (res) {
          setFoundUser(res);
          getPostsByUserId(res.id).then((postRes) => {
            setPosts(postRes);
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [parsedId]);

  client.onConnect = (frame) => {
    // Do something, all subscribes must be done is this callback
    // This is needed because this will be executed after a (re)connect
    client.subscribe("/topic/messages", (message) => {
      // called when the client receives a STOMP message from the server
      if (message.body) {
        alert("got message with body " + message.body);
      } else {
        alert("got empty message");
      }
    });
  };
  client.onStompError = function (frame) {
    // Will be invoked in case of error encountered at Broker
    // Bad login/passcode typically will cause an error
    // Complaint brokers will set message header with a brief message. Body may contain details.
    // Compliant brokers will terminate the connection after any error
    console.log("Broker reported error: " + frame.headers["message"]);
    console.log("Additional details: " + frame.body);
    client.unsubscribe("/topic/messages");
  };

  useEffect(() => {
    client.activate();

    return () => {
      client.deactivate();
    };
  }, []);

  if (isNaN(parsedId)) {
    return <h1>INVALID QUERY PARAMS</h1>;
  }

  if (!auth?.username) {
    return <Navigate to="/" state={{ from: location }}></Navigate>;
  }

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center">
        <Spinner animation="border" role="status" variant="primary" />
      </div>
    );
  }
  if (!foundUser) {
    return <NotFound404></NotFound404>;
  }
  const postRenderer = posts?.map((post) => (
    <PostContainer
      key={post.id}
      id={post.id}
      header={post.header}
      body={post.body}
      author={post.author}
      ups={post.ups}
      downs={post.downs}
    ></PostContainer>
  ));

  return (
    <div className="flex flex-row justify-center">
      <div>
        <ProfileCard user={foundUser!}></ProfileCard>
      </div>
      <div>
        {posts ? (
          <div className="flex flex-col">
            <Stack gap={3} className="col-md-6 mx-auto">
              {postRenderer}
            </Stack>
          </div>
        ) : (
          <ServerError message="no posts were found for this user"></ServerError>
        )}
      </div>
      <button></button>
    </div>
  );
};

export default Profile;
