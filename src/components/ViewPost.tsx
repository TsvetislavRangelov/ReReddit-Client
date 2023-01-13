import { AxiosInstance } from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { Button, Form, Stack } from "react-bootstrap";
import { ArrowDown, ArrowUp } from "react-bootstrap-icons";
import { SubmitHandler, useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { createComment, getCommentsForPost } from "../api/CommentAPI";
import { downvote, hasVoted, upvote } from "../api/PostAPI";
import { AuthContextType } from "../api/types/AuthTyped";
import Comment from "../api/types/Comment";
import { CreateCommentData } from "../api/types/CreateCommentData";
import DownvotePostData from "../api/types/DownvotePostData";
import UpvotePostData from "../api/types/UpvotePostData";
import { AuthContext } from "../context/AuthProvider";
import useAxiosPrivate from "../custom-hooks/useAxiosPrivate";
import useRefresh from "../custom-hooks/useRefresh";
import CommentContainer from "./CommentContainer";
import ViewPostProps from "./props/ViewPostProps";

const ViewPost = (props: ViewPostProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [fetchAgain, setFetchAgain] = useState<boolean>(true);
  const { auth, saveAuth } = React.useContext(AuthContext) as AuthContextType;
  const [upvoteCount, setUpvoteCount] = useState<number>(props.foundPost.ups);
  const [downvoteCount, setDownvoteCount] = useState<number>(
    props.foundPost.downs
  );
  const [previousVote, setPreviousVote] = useState<boolean>(false);
  const [voteType, setVoteType] = useState<string>("");
  const refresh = useRefresh();
  const axiosPrivate = useAxiosPrivate(
    refresh,
    auth,
    saveAuth
  ) as AxiosInstance;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateCommentData>();

  const onSubmit: SubmitHandler<CreateCommentData> = async (
    commentData: CreateCommentData
  ) => {
    commentData.authorId = auth.id;
    commentData.postId = props.foundPost.id;
    await createComment(axiosPrivate, commentData);
    setFetchAgain(!fetchAgain);
  };

  useEffect(() => {
    getCommentsForPost(props.foundPost.id).then((res) => {
      setComments(res!);
    });
    if (auth.id) {
      hasVoted(axiosPrivate, {
        userId: auth.id,
        postId: props.foundPost.id,
      }).then((res) => {
        if (res.hasVoted) {
          setPreviousVote(true);
          setVoteType(res.type);
        }
      });
    }
  }, [!fetchAgain]);

  const upvotePost = () => {
    const data: UpvotePostData = {
      userId: auth.id,
      postId: props.foundPost.id,
      type: "+",
    };
    upvote(axiosPrivate, data);
    if (!previousVote) {
      setUpvoteCount(upvoteCount + 1);
    }
    setPreviousVote(true);
    setVoteType("+");
  };
  const downvotePost = () => {
    const data: DownvotePostData = {
      userId: auth.id,
      postId: props.foundPost.id,
      type: "-",
    };
    downvote(axiosPrivate, data);
    if (!previousVote) {
      setDownvoteCount(downvoteCount + 1);
    }
    setPreviousVote(true);
    setVoteType("-");
  };

  const commentRenderer = comments.map((comment) => (
    <CommentContainer
      key={comment.id}
      id={comment.id}
      body={comment.body}
      author={comment.author}
      ups={comment.ups}
      downs={comment.downs}
      createdAt={comment.createdAt}
      SetFetchAgain={setFetchAgain}
      fetchAgain={!fetchAgain}
    ></CommentContainer>
  ));

  return (
    <div className="w-50 bg-gray-800 min-h-fit  text-white">
      <div className="ml-4 flex flex-col border-1  text-white">
        <div className="flex flex-row  text-white">
          <button
            className="hover:bg-green-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
            onClick={upvotePost}
            disabled={!auth.id ? true : false || previousVote}
          >
            <ArrowUp
              size={35}
              color={previousVote && voteType === "+" ? "blue" : "white"}
            ></ArrowUp>
          </button>
          <p style={{ color: "green" }}>{upvoteCount}</p>
        </div>
        <br />
        <div className="flex flex-row">
          <button
            className="hover:bg-red-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
            onClick={downvotePost}
            disabled={!auth.id ? true : false || previousVote}
          >
            <ArrowDown
              size={35}
              color={previousVote && voteType === "-" ? "blue" : "white"}
            ></ArrowDown>
          </button>
          <p style={{ color: "red" }}>{downvoteCount}</p>
        </div>
        <div className="flex flex-row ">
          <strong>
            <h3 className="break-all">{props.foundPost.header} •</h3>
          </strong>
          <NavLink
            className="text-gray-500 float-right mt-2 mr-2 ml-3 no-underline hover:underline"
            to={`/user/${props.foundPost.author.id}`}
          >
            Posted by {props.foundPost.author.username}
          </NavLink>
        </div>
        <p className="break-words">{props.foundPost.body}</p>
      </div>
      {auth?.id !== 0 ? (
        <div className="border-b pb-2">
          <div>
            <Form className="border-t ml-4" onSubmit={handleSubmit(onSubmit)}>
              <Form.Group>
                <Form.Label className="text-xl mt-2">
                  Share your thoughts!
                </Form.Label>
              </Form.Group>
              <textarea
                rows={6}
                className="inline-block p-2.5 w-7/12 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter comment"
                {...register("body", { required: true })}
              />
              <br />
              {errors.body && (
                <span className="text-red-500">A comment body is required</span>
              )}
              <Form.Group>
                <Button variant="primary" type="submit">
                  Comment
                </Button>
              </Form.Group>
            </Form>
          </div>
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
