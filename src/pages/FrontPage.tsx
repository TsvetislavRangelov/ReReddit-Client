import { useState, useEffect } from "react";
import { Stack } from "react-bootstrap";
import Spinner from "react-bootstrap/esm/Spinner";
import { NavLink } from "react-router-dom";
import { getPosts } from "../api/PostAPI";
import { Post } from "../api/types/Post";
import PostContainer from "../components/PostContainer";

import ServerError from "../components/ServerError";

const FrontPage = () => {
  const [posts, setPosts] = useState<Post[]>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getPosts()
      .then((results) => {
        setPosts(results);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center">
        <Spinner animation="border" role="status" variant="primary" />
      </div>
    );
  }

  if (typeof posts === typeof undefined) {
    return (
      <ServerError message="An unknown server error has occured"></ServerError>
    );
  }
  if (!posts) {
    return <ServerError message="No data was found."></ServerError>;
  }

  const postRenderer = posts.map((post) => (
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
    <div className="flex flex-col justify-center items-center">
      <NavLink to={"/submit"}>
        <h1>Create Post!</h1>
      </NavLink>
      <Stack gap={3} className="col-md-6 mx-auto">
        {postRenderer}
      </Stack>
    </div>
  );
};

export default FrontPage;
