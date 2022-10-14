import axiosInstance from "./AxiosConfig";
import { useState } from 'react';
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