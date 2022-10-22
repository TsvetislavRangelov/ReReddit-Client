import { NavLink } from "react-router-dom";
import { Post } from "../api/types/Post";

const PostContainer = (props: Post) => {
  return (
    <NavLink className="no-underline" to={`/post/${props.id}`}>
      <div key={props.id} className="border-2 mt-2 items-center w-100">
        <div className="flex flex-row">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 6.75L12 3m0 0l3.75 3.75M12 3v18"
            />
          </svg>
          <p style={{ color: "green" }}>{props.ups}</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 17.25L12 21m0 0l-3.75-3.75M12 21V3"
            />
          </svg>
          <p style={{ color: "red" }}>{props.downs}</p>
        </div>
        <br />
        {props.author.username} <br />
        {props.header}
        <br />
        {props.body}
      </div>
    </NavLink>
  );
};

export default PostContainer;
