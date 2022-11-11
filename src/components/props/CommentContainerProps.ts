import { Post } from "../../api/types/Post";
import User from "../../api/types/User";

type CommentContainerProps = {
    id: number;
    author: User;
    body: string;
    ups: number;
    downs: number;
}

export default CommentContainerProps;