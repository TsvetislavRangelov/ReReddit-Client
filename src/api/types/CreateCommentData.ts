import LoggedInUser from "./LoggedInUser";
import { Post } from "./Post";

export type CreateCommentData = {
    authorId: number;
    body: string;
    postId: number;

}

//  private Long author_id;
//    private String body;
//    private Long parent_id;
//    private Long post_id;