import axios, { AxiosInstance } from "axios";
import AccessToken from "./auth/tokens/AccessToken";

const axiosInstance: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
    headers:{
        "Content-type": "application/json"
    }
});

export const setAuthToken = (authToken: string) => {
    if(authToken){
        axios.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
    }
    else{
        delete axios.defaults.headers.common["Authorization"];
    }
}

export default axiosInstance;