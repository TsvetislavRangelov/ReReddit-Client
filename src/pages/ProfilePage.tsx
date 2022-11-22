import { AxiosInstance } from "axios";
import React, { useEffect, useState } from "react";
import { Stack } from "react-bootstrap";
import { Navigate, useLocation } from "react-router";
import { AuthContextType } from "../api/types/AuthTyped";
import { Post } from "../api/types/Post";
import { getPostsByUserId } from "../api/UserPostAPI";
import PostContainer from "../components/PostContainer";
import ProfileCard from "../components/ProfileCard";
import ServerError from "../components/ServerError";
import { AuthContext } from "../context/AuthProvider";

const Profile = () => {
  const { auth, saveAuth } = React.useContext(AuthContext) as AuthContextType;
  const location = useLocation();
  const [posts, setPosts] = useState<Post[]>();

  useEffect(() => {
    getPostsByUserId(auth.id).then((res) => {
      console.log(res);
      setPosts(res);
    });
  }, []);

  if (!auth?.username) {
    return <Navigate to="/" state={{ from: location }}></Navigate>;
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
        <ProfileCard id={auth.id}></ProfileCard>
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
