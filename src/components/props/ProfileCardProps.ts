import { Client } from "@stomp/stompjs";
import LoggedInUser from "../../api/types/LoggedInUser";

type ProfileCardProps = {
    user: LoggedInUser;
    send: (sender: string, receiver: string, destination: string, body: string) => void;
}
export default ProfileCardProps;