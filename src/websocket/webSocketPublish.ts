import { Client } from "@stomp/stompjs";

export const publishMessage = (client: Client, destination: string, body: string): void => {
    client.publish({
        destination: destination,
        body: body
    });

}