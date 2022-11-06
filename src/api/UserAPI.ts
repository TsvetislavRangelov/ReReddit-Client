import axiosInstance from './AxiosConfig';
import axios from 'axios';
import UsernamePasswordInput from './types/UsernamePasswordInput';
import LoginInput from './types/LoginInput';
import LoggedInUser from './types/LoggedInUser';
import { axiosAuth } from './auth/AxiosAuth';


export const registerUser = async (credentials: UsernamePasswordInput): Promise<number | undefined> => {
    try{
       return  (await axiosInstance.post('/users',{
            username: credentials.username,
            password: credentials.password,
            email: credentials.email
        
        })).data.id
    }
    catch(error){
        if(axios.isAxiosError(error)){
            console.error(error.message, error.status);
        }
    }
    };

export const login = async (credentials: LoginInput): Promise<string | undefined> => {
        try{
        return (await axiosInstance.post("/login", {
            email: credentials.email,
            password: credentials.password
        })).data.token as string;
        
        }
        catch(error){
            if(axios.isAxiosError(error)){
                console.error(error.message);
            }
        }
}

export const getUser = async(id: number): Promise<LoggedInUser | undefined> => {
    try{
        return (await axiosAuth.get(`/users/${id}`)).data as LoggedInUser;
    }
    catch(error){
        if(axios.isAxiosError(error)){
            console.error(error.message, error.code);
        }
    }
}