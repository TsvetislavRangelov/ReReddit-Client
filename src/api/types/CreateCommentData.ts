import { Post } from "./Post";
import User from "./User";

export type CreateCommentData = {
    author: User;
    body: string;
    post: Post;

}

//  private Long author_id;
//    private String body;
//    private Long parent_id;
//    private Long post_id;