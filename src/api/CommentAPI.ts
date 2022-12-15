import axiosInstance from "./AxiosConfig";
import Comment from "./types/Comment";
import { CreateCommentData } from "./types/CreateCommentData";

export const createComment = async (commentData: CreateCommentData): Promise<void> => {
    try{
        console.log(commentData.author);
        console.log(commentData.post);
         (await axiosInstance.post(`/comments`, {
            authorId: commentData.author.id,
            body: commentData.body,
            post: commentData.post
        }));
    }
            catch(err){
            console.error(err);
        }

}

export const getCommentsForPost = async (postId: number) : Promise<Comment[] | undefined> => {
    try{
        return(await axiosInstance.get(`/comments?post=${postId}`)).data.comments as Comment[];
    }
    catch(err){
        console.error(err);
    }
}