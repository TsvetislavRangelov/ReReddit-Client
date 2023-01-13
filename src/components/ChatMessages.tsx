import { Alert, Button, OverlayTrigger, Popover, Stack } from "react-bootstrap";
import { InfoCircle } from "react-bootstrap-icons";
import ChatMessagesProps from "./props/ChatMessagesProps";

const ChatMessages = (props: ChatMessagesProps) => {
  const generateTimestamp = (): string => {
    const date = new Date();
    return date.toLocaleDateString();
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Disclaimer</Popover.Header>
      <Popover.Body>
        All announcements in your inbox are sent by admins and they will never
        ask for your information. If they do, their accounts are compromised.
      </Popover.Body>
    </Popover>
  );

  return (
    <>
      <h2 className="text-white text-center mt-2">Notifications</h2>
      {props.messages.map((message) => (
        <>
          <Stack gap={3} className="col-md-4 mx-auto">
            <Alert variant="success">
              <div className="d-flex justify-content-end">
                <OverlayTrigger
                  trigger="click"
                  placement="left"
                  overlay={popover}
                >
                  <InfoCircle size={25} color="red" />
                </OverlayTrigger>
              </div>
              <Alert.Heading>Sent by {message.from}</Alert.Heading>
              <p className="break-words">{message.body}</p>
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
