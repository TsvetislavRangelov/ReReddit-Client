import axiosInstance from "./AxiosConfig";
import { useState } from 'react';
import { AxiosError, AxiosResponse } from 'axios';
import { Post } from "./types/Post";

export const getPosts = async (): Promise<Post[]> => {
    let posts!: Post[];

    await axiosInstance.get("/posts")
    .then((res: AxiosResponse) => {
        posts = res.data.posts as Post[];
    })
    .catch((error: AxiosError) => {
        console.error(error.message)
    });
    return posts;
}