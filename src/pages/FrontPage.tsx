import React from "react";
import { useState, useEffect } from "react";
import { Stack } from "react-bootstrap";
import Spinner from "react-bootstrap/esm/Spinner";
import { NavLink } from "react-router-dom";
import { getPosts } from "../api/PostAPI";
import { AuthContextType } from "../api/types/AuthTyped";
import { Post } from "../api/types/Post";
import PostContainer from "../components/PostContainer";
import InfiniteScroll from "react-infinite-scroller";

import ServerError from "../components/ServerError";
import { AuthContext } from "../context/AuthProvider";

const FrontPage = () => {
  const { auth, saveAuth } = React.useContext(AuthContext) as AuthContextType;
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
  const loadFunc = (page: number) => {};

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
      {auth.id !== 0 && auth.username !== "" ? (
        <NavLink to={"/submit"}>
          <h1>Create Post!</h1>
        </NavLink>
      ) : (
        <div></div>
      )}
      <Stack gap={3} className="col-md-4 mx-auto">
        {postRenderer}
      </Stack>

      {/* <InfiniteScroll
        pageStart={0}
        loadMore={loadFunc}
        hasMore={true || false}
        loader={
          <div className="loader" key={0}>
            <Spinner animation="border" role="status" variant="secondary" />
          </div>
        }
      >
        {postRenderer}
      </InfiniteScroll> */}
    </div>
  );
};

export default FrontPage;
