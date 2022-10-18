import axiosInstance from "./AxiosConfig";
import axios from 'axios';
import { Post } from "./types/Post";

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