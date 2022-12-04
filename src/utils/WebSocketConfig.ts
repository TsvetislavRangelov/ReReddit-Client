import { Client } from "@stomp/stompjs"

export const WebSocketConfig = (subject: string): Client => {
    return new Client({
        brokerURL: 'ws://localhost:8080/ws',
        connectHeaders: {
            login: subject,
            passcode: ""
        },
        debug: (str) => {
            console.log(str);
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
    });
}
