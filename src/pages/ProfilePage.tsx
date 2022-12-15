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
import {
  publishMessage,
} from "../websocket/stompClient";

const Profile = () => {
  const params = useParams<UserQueryParams>();
  const [foundUser, setFoundUser] = useState<LoggedInUser>();
  const { auth, saveAuth } = React.useContext(AuthContext) as AuthContextType;
  const location = useLocation();
  const [posts, setPosts] = useState<Post[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const parsedId = Number(params.id);
  const refresh = useRefresh();
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
        <ProfileCard user={foundUser!} send={publishMessage}></ProfileCard>
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
    </div>
  );
};

export default Profile;
