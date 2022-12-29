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

export const getActivityLogCount = async () => {
    
}