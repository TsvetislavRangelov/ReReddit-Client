import axiosInstance from './AxiosConfig';
import { AxiosError } from 'axios';
import UsernamePasswordInput from './types/UsernamePasswordInput';
import LoginInput from './types/LoginInput';
import User from './types/User';
import LoggedInUser from './types/LoggedInUser';
import userEvent from '@testing-library/user-event';


export const registerUser = async (credentials: UsernamePasswordInput): Promise<number> => {
        await axiosInstance.post('/users',{
            username: credentials.username,
            password: credentials.password,
            email: credentials.email
        
        })
        .then((res) => {
            const id = res.data.id as number;
            return id;
        })
        .catch((err: AxiosError) => {
            console.error(err);
        });
        return 0;
    };

export const login = async (credentials: LoginInput): Promise<LoggedInUser> => {
    let user!: LoggedInUser;
    await axiosInstance.post("/login", {
        email: credentials.email,
        password: credentials.password
    })
    .then((res) => {
        user = res.data.loggedIn as LoggedInUser;
    })
    .catch((err: AxiosError) => {
        return err.message;
    });
    return user;

}