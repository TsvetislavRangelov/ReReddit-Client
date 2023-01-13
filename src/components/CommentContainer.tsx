import React from "react";
import { Trash } from "react-bootstrap-icons";
import { NavLink } from "react-router-dom";
import { AuthContextType } from "../api/types/AuthTyped";
import { AuthContext } from "../context/AuthProvider";
import CommentContainerProps from "./props/CommentContainerProps";
import { deleteComment } from "../api/CommentAPI";

const CommentContainer = (props: CommentContainerProps) => {
  const { auth, saveAuth } = React.useContext(AuthContext) as AuthContextType;
  const time: string = props.createdAt.toString().split("T")[0];
  return (
    <div className="flex flex-col pl-4 border-b-2">
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
        {auth.id === props.author.id ? (
          <Trash
            className="justify-content-end ml-auto hover:bg-red-200"
            size={30}
            color="red"
            onClick={() => {
              deleteComment(props.id);
              props.SetFetchAgain(props.fetchAgain);
            }}
          ></Trash>
        ) : (
          ""
        )}
      </div>
      <div className="flex flex-row">
        <p>{props.body}</p>
      </div>
    </div>
  );
};

export default CommentContainer;
