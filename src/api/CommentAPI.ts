import { AxiosInstance } from "axios";
import axiosInstance from "./AxiosConfig";
import Comment from "./types/Comment";
import { CreateCommentData } from "./types/CreateCommentData";

export const createComment = async (axiosPrivate: AxiosInstance, commentData: CreateCommentData): Promise<void> => {
    try{
        
         (await axiosPrivate.post(`/comments`, {
            authorId: commentData.authorId,
            body: commentData.body,
            postId: commentData.postId
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

export const deleteComment = async(id: number) : Promise<any> => {
    try{
        await axiosInstance.delete(`/comments/${id}`);
    }
    catch(err){
        return "err";
    }
}