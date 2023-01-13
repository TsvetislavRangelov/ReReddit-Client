import { Client } from "@stomp/stompjs";
import LoggedInUser from "../../api/types/LoggedInUser";

type UserFilterProps = {
    client: Client;
}
export default UserFilterProps;