import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { axiosPrivate } from "../api/AxiosPrivate";
import { getPosts } from "../api/PostAPI";
import { AuthContextType } from "../api/types/AuthTyped";
import LoggedInUser from "../api/types/LoggedInUser";
import { Post } from "../api/types/Post";
import { getUsers } from "../api/UserAPI";

const PostFilter = () => {
  const [posts, setPosts] = useState<Post[]>();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Post[]>();

  useEffect(() => {
    getPosts().then((res) => {
      setPosts(res);
    });
  }, []);

  const handleChange = (e: any) => {
    setQuery(e.target.value);
    const res = posts?.filter((post: Post) => {
      if (e.target.value === "") {
        return posts;
      }
      return post.header.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setResults(res);
  };
  return (
    <div>
    <Form>
      <Form.Control
        type="search"
        value={query}
        onChange={handleChange}
        style={{ color: "white", backgroundColor: "black" }}
        placeholder="Search for post title"
      />
    </Form>
    <ul>
      {query === ""
        ? ""
        : results?.map((post: Post) => {
            return (
              <div className="flex flex-row mt-1">
                <li className="mr-2" key={post.header}>
                  {post.header}
                </li>
              </div>
            );
          })}
    </ul>
  </div>
  )
};

export default PostFilter;
