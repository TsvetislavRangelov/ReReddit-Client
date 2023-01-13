import { useEffect, useState } from "react";
import { Stack } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getPosts } from "../api/PostAPI";
import { Post } from "../api/types/Post";
import PostContainer from "../components/PostContainer";

const PostSearchResults = () => {
  const [posts, setPosts] = useState<Post[]>();
  const { title } = useParams();

  useEffect(() => {
    getPosts().then((res) => {
      const filtered = res?.filter((post: Post) => {
        return post.header.toLowerCase().includes(title!);
      });
      setPosts(filtered);
    });
  }, [title]);

  if (posts?.length === 0) {
    return <h1 className="text-white">NO POSTS FOUND</h1>;
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
      <h3>Displaying results for {title}</h3>
      <Stack gap={3} className="col-md-4 mx-auto">
        {postRenderer}
      </Stack>
    </div>
  );
};

export default PostSearchResults;
