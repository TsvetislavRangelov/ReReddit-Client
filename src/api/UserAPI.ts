import axiosInstance from './AxiosConfig';
import axios, { AxiosError } from 'axios';
import UsernamePasswordInput from './types/UsernamePasswordInput';
import LoginInput from './types/LoginInput';

import AccessToken from './auth/tokens/AccessToken';


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

export const login = async (credentials: LoginInput): Promise<AccessToken | undefined> => {
        try{
        return (await axiosInstance.post("/login", {
            email: credentials.email,
            password: credentials.password
        })).data.token as AccessToken;
        }
        catch(error){
            if(axios.isAxiosError(error)){
                console.error(error.message);
            }
        }
}