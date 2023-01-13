import { NavLink } from "react-router-dom";
import { Post } from "../api/types/Post";

const PostContainer = (props: Post) => {
  return (
    <div
      key={props.id}
      className="border-2 mt-2 items-center flex text-left bg-gray-900  text-white"
    >
      <div className="flex flex-column">
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
        <p style={{ color: "green" }} className="ml-3">{props.ups}</p>
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
        <p style={{ color: "red" }} className="ml-3">{props.downs}</p>
      </div>
      <div>
        <div className="flex flex-col">
          <NavLink
            className="no-underline text-gray-200"
            to={`/post/${props.id}`}
          >
            <h2>{props.header}</h2>
          </NavLink>
          <NavLink
            to={`/user/${props.author.id}`}
            className="no-underline text-gray-200"
          >
            <h5 className="mr-4">Posted by {props.author.username}</h5>
          </NavLink>
        </div>
        <p>{props.body}</p>
      </div>
    </div>
  );
};

export default PostContainer;
