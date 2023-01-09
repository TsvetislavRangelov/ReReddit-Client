import { AxiosInstance } from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { Stack } from "react-bootstrap";
import { ArrowDown, ArrowUp } from "react-bootstrap-icons";
import { getCommentsForPost } from "../api/CommentAPI";
import { downvote, hasVoted, upvote } from "../api/PostAPI";
import { AuthContextType } from "../api/types/AuthTyped";
import Comment from "../api/types/Comment";
import DownvotePostData from "../api/types/DownvotePostData";
import UpvotePostData from "../api/types/UpvotePostData";
import { AuthContext } from "../context/AuthProvider";
import useAxiosPrivate from "../custom-hooks/useAxiosPrivate";
import useRefresh from "../custom-hooks/useRefresh";
import CommentContainer from "./CommentContainer";
import CreateComment from "./CreateComment";
import ViewPostProps from "./props/ViewPostProps";

const ViewPost = (props: ViewPostProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const { auth, saveAuth } = React.useContext(AuthContext) as AuthContextType;
  const [upvoteCount, setUpvoteCount] = useState<number>(props.foundPost.ups);
  const [downvoteCount, setDownvoteCount] = useState<number>(props.foundPost.downs);
  const [previousVote, setPreviousVote] = useState<boolean>(false);
  const [voteType, setVoteType] = useState<string>('');
  const refresh = useRefresh();
  const axiosPrivate = useAxiosPrivate(
    refresh,
    auth,
    saveAuth
  ) as AxiosInstance;

  useEffect(() => {
    getCommentsForPost(props.foundPost.id).then((res) => {
      setComments(res!);
    });
    if(auth.id){
      hasVoted(axiosPrivate, {userId: auth.id, postId: props.foundPost.id})
      .then((res) => {
        if(res.hasVoted){
          setPreviousVote(true);
          setVoteType(res.type);
        }
      })
    }
    console.log(previousVote);
    console.log(voteType);
  }, []);

  const upvotePost = () => {
    const data: UpvotePostData = {
      userId: auth.id,
      postId: props.foundPost.id,
      type: '+'
    }
    upvote(axiosPrivate, data);
    if(!previousVote){
      setUpvoteCount(upvoteCount + 1);
    }
    setPreviousVote(true);
    setVoteType('+');
  }
  const downvotePost = () => {
    const data: DownvotePostData = {
      userId: auth.id,
      postId: props.foundPost.id,
      type: '-'
    }
    downvote(axiosPrivate, data);
    if(!previousVote){
      setDownvoteCount(downvoteCount + 1);
    }
    setPreviousVote(true);
    setVoteType('-');
  }

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
    <div className="w-50 bg-gray-800 min-h-fit  text-white">
      <div className="ml-4 flex flex-col border-1  text-white">
        <div className="flex flex-row  text-white">
          <button className="hover:bg-green-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
                  onClick={upvotePost}
                  disabled={!auth.id ? true : false || previousVote}
                    >
            <ArrowUp size={35} color={previousVote && voteType === '+' ? "yellow" : "green"}></ArrowUp>
          </button>
          <p style={{color: 'green'}}>{upvoteCount}</p>
        </div>
        <br />
        <div className="flex flex-row">
          <button className="hover:bg-red-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
          onClick={downvotePost}
          disabled={!auth.id ? true : false || previousVote}
          >
           <ArrowDown size={35} color={previousVote && voteType === '-' ? "yellow" : "red"}></ArrowDown>
          </button>
          <p style={{color: 'red'}}>{downvoteCount}</p>
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
