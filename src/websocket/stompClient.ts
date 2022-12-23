import {v4 as uuidv4} from 'uuid';
import { WebSocketConfig } from "../utils/WebSocketConfig";

export const client = WebSocketConfig('user');

export const activate = (): void => {
  client.activate();
}

export const connectClient = (): void => {
    client.onConnect = (frame) => {
    client.subscribe(`/topic/messages`, (message) => {
      if (message.body) {
        alert("got message with body " + message.body);
      } else {
        alert("got empty message");
      }
    });
  };
  client.onStompError = function (frame): void {
    console.log("Broker reported error: " + frame.headers["message"]);
    console.log("Additional details: " + frame.body);
    client.unsubscribe(`/topic/messages`);
  };
  client.activate();

}

export const disconnectClient = async () : Promise<void> => {
  await client.deactivate();
}

//return an error once heartbeat timer stops receiving responses, usually on socket deactivation
export const verifyHeartbeat = (): boolean => {
  return false;
}

export const receive = async (source: string): Promise<void> => {
      if(source === ""){
        client.unsubscribe(`/user/${source}/queue/messages`)
        await client.deactivate();
        return;
      }
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

export const publishMessage = (sender: string, destination: string, body: string): void => {
    const payload = {'id': uuidv4(), 'from': sender, 'body': body};
    client.publish({destination: destination, body: JSON.stringify(payload)});

}
