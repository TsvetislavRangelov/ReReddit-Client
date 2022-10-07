import{ useEffect, useState } from 'react';
import './App.css';
import { getPosts } from "./api/PostAPI";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Post } from './api/types/Post';

function App() {
    const [posts, setPosts] = useState<Post[]>([]);
    const[loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
      getPosts().then(results => {
        setPosts(results)
        
      })
      .finally(() => {
        setLoading(false);
      })
    }, [])

    if(loading){
      return <h1>Loading...</h1>
    }

    if(typeof(posts) === typeof(undefined)){
      return <div>an error has occured</div>
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
