import { Client } from "@stomp/stompjs";

export const connectClient = (client: Client, receiver: string): any => {
    client.onConnect = (frame) => {
    client.subscribe(`/topic/messages`, (message) => {
      if (message.body) {
        alert("got message with body " + message.body);
      } else {
        alert("got empty message");
      }
    });
  };
  client.onStompError = function (frame) {
    console.log("Broker reported error: " + frame.headers["message"]);
    console.log("Additional details: " + frame.body);
    client.unsubscribe(`/topic/messages`);
  };
  client.activate();

}

export const disconnectClient = async (client: Client, receiver: string) : Promise<void> => {
  await client.deactivate();
}

export const verifyHeartbeat = (): boolean => {
  return false;
}

export const receive = (client: Client, source: string) => {
     client.onConnect = (frame) => {
    client.subscribe(`/user/${source}/queue/messages`, (message) => {
      if (message.body) {
        alert("got message with body " + message.body);
      } else {
        alert("got empty message");
      }
    });
  };
  client.onStompError = function (frame) {
    console.log("Broker reported error: " + frame.headers["message"]);
    console.log("Additional details: " + frame.body);
    client.unsubscribe(`/user/${source}/queue/messages`);
  };
  client.activate();
}
