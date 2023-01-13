import React from "react";
import { useState, useEffect } from "react";
import { Stack } from "react-bootstrap";
import Spinner from "react-bootstrap/esm/Spinner";
import { useNavigate } from "react-router-dom";
import { getPosts } from "../api/PostAPI";
import { AuthContextType } from "../api/types/AuthTyped";
import { Post } from "../api/types/Post";
import PostContainer from "../components/PostContainer";

import ServerError from "../components/ServerError";
import { AuthContext } from "../context/AuthProvider";
import { Image, Link, PersonCircle } from "react-bootstrap-icons";

const FrontPage = () => {
  const { auth, saveAuth } = React.useContext(AuthContext) as AuthContextType;
  const [posts, setPosts] = useState<Post[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    getPosts()
      .then((results) => {
        setPosts(results);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  const loader = (page: number) => {};

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
        <div
          className="mt-3 w-50 flex flex-row bg-gray-800"
          onClick={() => navigate("/submit")}
        >
          <PersonCircle color="gray" size={35} className="mt-2.5 ml-2" />
          <input
            type="text"
            className="m-2 inline-block p-2 w-100 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Create Post"
          />
          <Image color="gray" size={30} className="mt-3 mr-2" />
          <Link color="gray" size={40} className="mt-2.5 mr-2" />
        </div>
      ) : (
        <div></div>
      )}
      <Stack gap={3} className="col-md-4 mx-auto mt-2">
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
