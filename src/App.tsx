import{ useEffect } from 'react';
import './App.css';
import { useGetPosts } from "./api/PostAPI";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [posts, error, loading,  getPosts] = useGetPosts();
    
  useEffect(() => {
    getPosts();
  }, [])

  if(error){
    return <div>A {error.message} has occured</div>
  }
  if(loading){
    return <div>Loading...</div>
  }
  if(!posts){
    return <div>No data was found.</div>
  }

  const postRenderer = posts.map(post => (
    (
      <div key={post.id} style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
        {post.header} - {post.body} -  {post.downs} -  {post.ups} - {post.author.username}
        </div>
    )
  ))
  return (
    <div>
      <h1>Random placeholder text</h1>
      <div>{postRenderer}</div>
    </div>

    
  );
};

export default App;
