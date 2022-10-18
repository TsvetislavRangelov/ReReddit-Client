import { NavLink } from "react-router-dom";
import { Post } from "../api/types/Post";

const PostContainer = (props: Post) => {
  return (
    <NavLink className="no-underline" to={`/post/${props.id}`}>
      <div key={props.id} className="border-2 mt-2 items-center w-100">
        {props.downs} {props.ups} <br />
        {props.author.username} <br />
        {props.header}
        <br />
        {props.body}
      </div>
    </NavLink>
  );
};

export default PostContainer;
