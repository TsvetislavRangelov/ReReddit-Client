import { useEffect, useState } from "react";
import { Spinner, Stack } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getPosts } from "../api/PostAPI";
import { Post } from "../api/types/Post";
import NotFound404 from "../components/errors/NotFound404";
import PostContainer from "../components/PostContainer";

const PostSearchResults = () => {
  const [posts, setPosts] = useState<Post[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const { title } = useParams();

  useEffect(() => {
    getPosts().then((res) => {
      const filtered = res?.filter((post: Post) => {
        return post.header.toLowerCase().includes(title!);
      });
      setPosts(filtered);
      setLoading(false);
    });
  }, [title]);

  if (posts?.length === 0) {
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
    <div>
      {loading ? (
        <div className="text-center">
          <h3 className="text-white text-center">
            Loading results for {title}...
          </h3>
          <Spinner variant="primary" className="text-center"></Spinner>
        </div>
      ) : (
        <div className="text-center mt-2">
          <h3 className="text-white italic">Displaying results for {title}</h3>
          <Stack gap={3} className="col-md-4 mx-auto">
            {postRenderer}
          </Stack>
        </div>
      )}
    </div>
  );
};

export default PostSearchResults;
