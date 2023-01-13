import MessageContainerProps from "./props/MessageContainerProps";

const MessageContainer = (props: MessageContainerProps) => {
  return (
    <p>
      Body: {props.body} - Receiver: {props.receiver} - Sender: {props.sender}
    </p>
  );
};

export default MessageContainer;
