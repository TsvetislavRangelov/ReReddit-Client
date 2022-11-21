import React from "react";
import { useEffect, useState } from "react";
import { Stack } from "react-bootstrap";
import { getCommentsForPost } from "../api/CommentAPI";
import { AuthContextType } from "../api/types/AuthTyped";
import Comment from "../api/types/Comment";
import { AuthContext } from "../context/AuthProvider";
import CommentContainer from "./CommentContainer";
import CreateComment from "./CreateComment";
import ViewPostProps from "./props/ViewPostProps";

const ViewPost = (props: ViewPostProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const { auth, saveAuth } = React.useContext(AuthContext) as AuthContextType;

  useEffect(() => {
    getCommentsForPost(props.foundPost.id).then((res) => {
      setComments(res!);
    });
  }, []);

  const commentRenderer = comments.map((comment) => (
    <CommentContainer
      key={comment.id}
      id={comment.id}
      body={comment.body}
      author={comment.author}
      ups={comment.ups}
      downs={comment.downs}
      createdAt={comment.createdAt}
    ></CommentContainer>
  ));

  return (
    <div className="w-50 bg-gray-800 min-h-fit">
      <div className="ml-4 flex flex-col border-1">
        <div className="flex flex-row">
          <button className="hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300">
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
          </button>
          <p>{props.foundPost.ups}</p>
        </div>
        <br />
        <div className="flex flex-row">
          <button className="hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300">
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
          </button>
          <p>{props.foundPost.downs}</p>
        </div>
        <div className="flex flex-row ">
          <strong>
            <h3 className="break-all">{props.foundPost.header} •</h3>
          </strong>
          <p className="float-right mt-2 mr-2 ml-3">
            Posted by {props.foundPost.author.username}
          </p>
        </div>
        <div>{props.foundPost.body}</div>
      </div>
      {auth?.id !== 0 ? (
        <div className="border-b pb-2">
          <CreateComment
            post={props.foundPost}
            author={props.foundPost.author}
          ></CreateComment>
        </div>
      ) : (
        <div></div>
      )}

      {comments.length === 0 ? (
        <h1>No comments yet!</h1>
      ) : (
        <div>
          <Stack gap={3} className="mt-2 pb-2 mx-auto">
            {commentRenderer}
          </Stack>
        </div>
      )}
    </div>
  );
};

export default ViewPost;
