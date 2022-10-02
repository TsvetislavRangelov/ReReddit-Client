import axiosInstance from "./AxiosConfig";
import { useState } from 'react';
import { AxiosError } from 'axios';
import { Post } from "./types/Post";

export const useGetPosts = (): [Post[], AxiosError | undefined,boolean, () => Promise<void>] => {
    const[posts, setPosts] = useState<Post[]>([]);
    const[error, setError] = useState<AxiosError>();
    const[loading, setLoading] = useState<boolean>(true);

    const GetPosts= async (): Promise<void> => {
            await axiosInstance.get('/posts')
                .then((res) => {
                console.log("RES", res.data.posts);
                if(res.data.posts){
                    setPosts(res.data.posts as Post[])
                }
            }).catch((err) => {
                console.log("error: ", err);
                setError(err);
            }).finally(() => {
                setLoading(false);
                   });
    }
    return [posts, error, loading, GetPosts];

}