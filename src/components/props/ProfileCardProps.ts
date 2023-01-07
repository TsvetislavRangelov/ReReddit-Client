import { Client } from "@stomp/stompjs";
import { AxiosInstance } from "axios";
import LoggedInUser from "../../api/types/LoggedInUser";

type ProfileCardProps = {
    user: LoggedInUser;
}
export default ProfileCardProps;