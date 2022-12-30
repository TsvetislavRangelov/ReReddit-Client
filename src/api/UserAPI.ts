import axiosInstance from './AxiosConfig';
import axios, { AxiosInstance } from 'axios';
import UsernamePasswordInput from './types/UsernamePasswordInput';
import LoginInput from './types/LoginInput';
import LoggedInUser from './types/LoggedInUser';


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

export const login = async (credentials: LoginInput): Promise<any | undefined> => {
        try{
        return (await axiosInstance.post("/login", {
            email: credentials.email,
            password: credentials.password
        })).data;
        
        }
        catch(error){
            if(axios.isAxiosError(error)){
                console.error(error.message);
            }
        }
}

export const getUser = async(id: number, axiosPrivate: AxiosInstance): Promise<LoggedInUser | undefined> => {
    try{
        return (await axiosPrivate.get(`/users/user`, {params: {id: id}})).data as LoggedInUser;
    }
    catch(error){
        if(axios.isAxiosError(error)){
            console.error(error.message, error.code);
        }
    }
}

export const getUsers = async (axiosPrivate: AxiosInstance) => {
    try{
        return (await axiosPrivate.get('/users')).data.users as LoggedInUser[];
    }
    catch(error){
        if(axios.isAxiosError(error)){
            console.error(error.message, error.code);
        }
    }
}

export const countNewUsersForDay = async (axiosPrivate: AxiosInstance, date?: string) => {
    try{
        if(date){
            return (await axiosPrivate.get(`/users/count?date=${date}`)).data;
        }
        else{
            return (await axiosPrivate.get('/users/count/total')).data;
        }
    }
    catch(err){
        console.error(err);
    }
}
