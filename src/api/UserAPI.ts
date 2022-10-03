import axiosInstance from './AxiosConfig';
import { useState } from 'react';
import { User } from './types/User';
import { AxiosError } from 'axios';
import UsernamePasswordInput from './types/UsernamePasswordInput';

export const useGetUsers = (): [User[], AxiosError | undefined, boolean, () => Promise<void>] =>{
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState<AxiosError>();
    const [loading, setLoading] = useState<boolean>(true);
    
    const getUsers = async (): Promise<void> => {
        try{
            await axiosInstance.get('/users')
                .then((res) => {
                console.log("RES", res.data.users);
                if(res.data.users){
                    setUsers(res.data.users as User[])
                }
            }).catch((err) => {
                console.log("error: ", err);
                setError(err);
            }).finally(() => {
                setLoading(false);
                   });

        }
        catch(err){
            console.error(err);
        }
    };
    return [users, error, loading, getUsers];
} 

export const useRegisterUser = (): [number | undefined, 
    AxiosError | undefined, 
    boolean, (credentials: UsernamePasswordInput) => Promise<void>] => {
    const[id, setId] = useState<number>();
    const[error, setError] = useState<AxiosError>();
    const[loading, setLoading] = useState<boolean>(true);

    const registerUser = async (credentials: UsernamePasswordInput): Promise<void> => {

        await axiosInstance.post('/users',{
            username: credentials.username,
            password: credentials.password,
            email: credentials.email
        
        })
        .then((res) => {
            console.log(res.data.id);
            setId(res.data.id);
        })
        .catch((err) => {
            console.log(err);
            setError(err);
        })
        .finally(() => {
            setLoading(false);
        })
        
    };


    return [id, error, loading, registerUser];
}