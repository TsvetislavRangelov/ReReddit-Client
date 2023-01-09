import axiosInstance from "./AxiosConfig";
import axios, { AxiosInstance } from 'axios';
import { Post } from "./types/Post";
import CreatePostData from "./types/CreatePostData";
import UpvotePostData from "./types/UpvotePostData";

export const getPosts = async (page?: number, size?: number): Promise<Post[]| undefined> => {

    try{
    return (await axiosInstance.get("/posts", {params: {page: page, size: size}})).data.posts as Post[];
    }
    catch(error){
        if(axios.isAxiosError(error)){
            console.error(error.message);
        }
    }
}

export const getPost = async (id: number): Promise<Post | undefined> => {

    try{return (await axiosInstance.get(`/posts/${id}`)).data as Post;
    }
    catch(error){
        if(axios.isAxiosError(error)){
            console.error(error.message);
    }
}
}

export const createPost = async (postData: CreatePostData, axiosPrivate: AxiosInstance): Promise<number | undefined> => {
    try{
        return(await axiosPrivate.post(`/posts`, {
            authorId: postData.author.id,
            header: postData.header,
            body: postData.body
        })).data.id as number;
    }
    catch(error){
        if(axios.isAxiosError(error)){
            console.error(error.message);
        }
    }
}

export const getPostCount = async (axiosPrivate: AxiosInstance, date?: string): Promise<number | undefined> => {
    try{
        if(date){
            return (await axiosPrivate.get(`/posts/count?date=${date}`)).data;
        }
        else{
            return (await axiosPrivate.get('/posts/total')).data;
        }
    }
    catch(err){
        console.error(err);
    }
    
}
export const upvote = async (axiosPrivate: AxiosInstance, data: UpvotePostData): Promise<void> => {
    try{
        await axiosPrivate.patch(`/posts/upvote`, {
            userId: data.userId,
            postId: data.postId,
            type: data.type
        });
    }
    catch(err){
        console.error(err);
    }
}