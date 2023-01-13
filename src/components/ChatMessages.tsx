import { Alert, Button, Stack } from "react-bootstrap";
import ChatMessagesProps from "./props/ChatMessagesProps";

const ChatMessages = (props: ChatMessagesProps) => {
  const generateTimestamp = (): string => {
    const date = new Date();
    return date.toLocaleDateString();
  };

  return (
    <>
      {props.messages.map((message) => (
        <>
          <Stack gap={3} className="col-md-4 mx-auto">
            <h2 className="text-white">Announcements:</h2>
            <Alert variant="success">
              <div className="d-flex justify-content-end">
                <Button variant="danger">Delete</Button>
              </div>
              <Alert.Heading>Sent by {message.from}</Alert.Heading>
              <p>{message.body}</p>
              <hr />
              <p className="mb-0">{generateTimestamp()}</p>
            </Alert>
          </Stack>
        </>
      ))}
    </>
  );
};

export default ChatMessages;
