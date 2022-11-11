import { Post } from "../../api/types/Post"
import User from "../../api/types/User";

export type CreateCommentProps = {
    post: Post;
    author: User;
}