import { AxiosInstance } from "axios";
import CreateLogData from "./types/CreateLogData";


export const registerActivityLog = async (logData: CreateLogData, axiosPrivate: AxiosInstance): Promise<void> => {
    try{
        (await axiosPrivate.post('/logs', {
            profile: logData.profile,
            success: logData.success
        }));
    }
    catch(err) {
        console.error(err);
    }
}