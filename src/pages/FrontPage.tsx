import { useState, useEffect } from "react";
import { getPosts } from "../api/PostAPI";
import { Post } from "../api/types/Post";
import ServerError from "../components/ServerError";

const FrontPage = () => {
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
      return (<ServerError message="Loading..."></ServerError>)
    }

    if(typeof(posts) === typeof(undefined)){
      return(<ServerError message="An unknown server error has occured"></ServerError>);
    }
  if(!posts){
    return (<ServerError message="No data was found."></ServerError>)
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
      <h1 className="text-5x1 font-bold underline">Random placeho</h1>
      <div>{postRenderer}</div>
    </div>
  );
}


export default FrontPage;