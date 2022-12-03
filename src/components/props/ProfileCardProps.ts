import { Client } from "@stomp/stompjs";
import LoggedInUser from "../../api/types/LoggedInUser";

type ProfileCardProps = {
    user: LoggedInUser;
    onConnect: (client: Client, receiver: string) => any;
    onDisconnect: (client: Client, receiver: string) => any;
    client: Client;
}
export default ProfileCardProps;