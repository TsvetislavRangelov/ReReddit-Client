import axiosInstance from "./AxiosConfig";
import axios, { AxiosInstance } from 'axios';
import { Post } from "./types/Post";
import CreatePostData from "./types/CreatePostData";

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