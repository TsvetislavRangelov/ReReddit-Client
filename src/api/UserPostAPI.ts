import { Post } from './types/Post';
import { axiosPrivate } from './AxiosPrivate';

export const getPostsByUserId = async (userId: number): Promise<Post[] | undefined> => {
    try{
        return(await axiosPrivate.get(`/posts/user?user=${userId}`)).data.posts as Post[];
    }
    catch(err){
        console.error(err);
    }
}