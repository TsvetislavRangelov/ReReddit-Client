import { Client } from "@stomp/stompjs";
import LoggedInUser from "../../api/types/LoggedInUser";

type ProfileCardProps = {
    user: LoggedInUser;
    onConnect: (receiver: string) => any;
    onDisconnect: (receiver: string) => any;
}
export default ProfileCardProps;