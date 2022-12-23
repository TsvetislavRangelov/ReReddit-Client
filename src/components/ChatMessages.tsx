import ChatMessagesProps from "./props/ChatMessagesProps";

const ChatMessages = (props: ChatMessagesProps) => {
  return (
    <>
      <h2>Messages:</h2>
      {props.messages.map((message) => (
        <div key={message.id}>
          From: {message.from} <br />
          Message: {message.body}
        </div>
      ))}
    </>
  );
};

export default ChatMessages;
