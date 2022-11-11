import LoggedInUser from "./LoggedInUser";
import { Post } from "./Post";

type Comment = {
    id: number;
    author: LoggedInUser;
    body: string;
    ups: number;
    downs: number;
    createdAt: Date;

}
export default Comment;