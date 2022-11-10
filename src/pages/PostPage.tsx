import { useParams } from "react-router-dom";
import { getPost } from "../api/PostAPI";
import PostQueryParams from "../api/params/PostQueryParams";
import { Post } from "../api/types/Post";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import NotFound404 from "../components/errors/NotFound404";
import ViewPost from "../components/ViewPost";

const PostPage = () => {
  const params = useParams<PostQueryParams>();
  const [foundPost, setFoundPost] = useState<Post>();
  const [loading, setLoading] = useState<boolean>(true);

  const parsedId = Number(params.id);

  useEffect(() => {
    getPost(parsedId)
      .then((res) => {
        setFoundPost(res);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (isNaN(parsedId)) {
    return <h1>INVALID QUERY PARAMS</h1>;
  }
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center">
        <Spinner animation="border" role="status" variant="primary" />
      </div>
    );
  }
  if (!foundPost) {
    return <NotFound404></NotFound404>;
  }

  return (
    <div className="flex flex-col justify-center items-center mt-10">
      <ViewPost foundPost={foundPost}></ViewPost>
    </div>
  );
};

export default PostPage;
