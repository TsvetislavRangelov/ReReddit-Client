import { NavLink } from "react-router-dom";
import CommentContainerProps from "./props/CommentContainerProps";

const CommentContainer = (props: CommentContainerProps) => {
  const time: string = props.createdAt.toString().split("T")[0];
  return (
    <div className="flex flex-col pl-4">
      <div className="flex flex-row">
        <h5>
          <NavLink
            className="no-underline text-gray-500"
            to={`/user/${props.author.id}`}
          >
            {props.author.username}
          </NavLink>
        </h5>
        <p className="ml-2">{time}</p>
      </div>
      <div className="flex flex-row">
        <p>{props.body}</p>
      </div>
    </div>
  );
};

export default CommentContainer;
