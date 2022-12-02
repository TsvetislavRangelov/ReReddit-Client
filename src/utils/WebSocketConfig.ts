import { Client } from "@stomp/stompjs"
import { AuthContextType } from "../api/types/AuthTyped"
import { useAuth } from "../custom-hooks/useAuth"

export const WebSocketConfig = (): Client => {
    const {auth}= useAuth() as AuthContextType;
    return new Client({
        brokerURL: 'ws://localhost:8080/ws',
        connectHeaders: {
            login: auth.username,
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