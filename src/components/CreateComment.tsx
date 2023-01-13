import { AxiosInstance } from "axios";
import React from "react";
import { Button, Form } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { createComment } from "../api/CommentAPI";
import { AuthContextType } from "../api/types/AuthTyped";
import { CreateCommentData } from "../api/types/CreateCommentData";
import { AuthContext } from "../context/AuthProvider";
import useAxiosPrivate from "../custom-hooks/useAxiosPrivate";
import useRefresh from "../custom-hooks/useRefresh";
import { CreateCommentProps } from "./props/CreateCommentProps";

const CreateComment = (props: CreateCommentProps) => {
  const { auth, saveAuth } = React.useContext(AuthContext) as AuthContextType;
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
    commentData.postId = props.post.id;
    await createComment(axiosPrivate, commentData);
  };

  return (
    <div>
      <Form className="border-t ml-4" onSubmit={handleSubmit(onSubmit)}>
        <Form.Group>
          <Form.Label className="text-xl mt-2">Share your thoughts!</Form.Label>
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
  );
};

export default CreateComment;
