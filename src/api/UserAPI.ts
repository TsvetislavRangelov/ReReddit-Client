import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { User } from './User';

export const useGetUsers = (): [User[], AxiosError | undefined, boolean, () => Promise<void>] =>{
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState<AxiosError>();
    const [loading, setLoading] = useState<boolean>(true);
    
    const getUsers = async () => {
        try{
            await axios.get('http://localhost:8080/users')
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