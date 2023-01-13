import { AxiosInstance } from "axios";
import axiosInstance from "./AxiosConfig";
import CreateLogData from "./types/CreateLogData";


export const registerActivityLog = async (logData: CreateLogData): Promise<void> => {
    try{
        (await axiosInstance.post('/logs', {
            profile: logData.profile,
            success: logData.success
        }));
    }
    catch(err) {
        console.error(err);
    }
}

export const getActivityLogCount = async (axiosPrivate: AxiosInstance, date?: string) => {
    try{
        if(date){
            return (await axiosPrivate.get(`/logs/count?date=${date}`)).data.count
        }
        else{
            return (await axiosPrivate.get('/logs')).data;
        }
    }
    catch(err){
        console.error(err);
    }
    
}