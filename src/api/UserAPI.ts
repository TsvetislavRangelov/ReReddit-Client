import axiosInstance from './AxiosConfig';
import axios, { AxiosError } from 'axios';
import UsernamePasswordInput from './types/UsernamePasswordInput';
import LoginInput from './types/LoginInput';
import User from './types/User';
import LoggedInUser from './types/LoggedInUser';
import userEvent from '@testing-library/user-event';


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

export const login = async (credentials: LoginInput): Promise<LoggedInUser | undefined> => {
    try{
   return (await axiosInstance.post("/login", {
        email: credentials.email,
        password: credentials.password
    })).data.loggedIn as LoggedInUser;
    }
    catch(error){
        console.error(error);
    }
}