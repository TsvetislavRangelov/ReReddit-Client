import CommentContainerProps from "./props/CommentContainerProps";

const CommentContainer = (props: CommentContainerProps) => {
  return (
    <div>
      <p>
        {props.body} - {props.author.username}
      </p>
    </div>
  );
};

export default CommentContainer;
