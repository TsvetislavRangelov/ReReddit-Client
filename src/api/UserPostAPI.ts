import axiosInstance from './AxiosConfig';
import axios, { AxiosInstance } from 'axios';
import { Post } from './types/Post';

export const getPostsByUserId = async (userId: number): Promise<Post[] | undefined> => {
    try{
        return(await axiosInstance.get(`/posts/user?user=${userId}`)).data.posts as Post[];
    }
    catch(err){
        console.error(err);
    }
}