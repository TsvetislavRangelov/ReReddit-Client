import axiosInstance from './AxiosConfig';
import { AxiosError } from 'axios';
import UsernamePasswordInput from './types/UsernamePasswordInput';


export const registerUser = async (credentials: UsernamePasswordInput): Promise<number> => {
        let id: number;

        await axiosInstance.post('/users',{
            username: credentials.username,
            password: credentials.password,
            email: credentials.email
        
        })
        .then((res) => {
            id = res.data.id as number;
            return id;
        })
        .catch((err: AxiosError) => {
            console.error(err);
        });
        return 0;
    };