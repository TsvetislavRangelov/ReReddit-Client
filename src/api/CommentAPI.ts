import { axiosAuth } from "./auth/AxiosAuth";
import axiosInstance from "./AxiosConfig";
import { CreateCommentData } from "./types/CreateCommentData";

export const createComment = async (commentData: CreateCommentData): Promise<void> => {
    try{
        console.log(commentData.author);
        console.log(commentData.post);
         (await axiosInstance.post(`/comments`, {
            author: commentData.author,
            body: commentData.body,
            post: commentData.post
        }));
    }
            catch(err){
            console.error(err);
        }

}