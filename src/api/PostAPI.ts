import axiosInstance from "./AxiosConfig";
import axios from 'axios';
import { Post } from "./types/Post";
import CreatePostData from "./types/CreatePostData";
import { axiosAuth } from "./auth/AxiosAuth";

export const getPosts = async (): Promise<Post[]| undefined> => {

    try{
    return (await axiosInstance.get("/posts")).data.posts as Post[];
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

export const createPost = async (postData: CreatePostData): Promise<number | undefined> => {
    try{
        return(await axiosAuth.post(`/posts`, {
            author: postData.author,
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