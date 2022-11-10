import axios, { AxiosRequestConfig } from "axios";

export const axiosAuth = axios.create({
    baseURL: 'http://localhost:8080'
}
);

axiosAuth.interceptors.request.use(
    async(config: AxiosRequestConfig) => {
        const accessToken = window.sessionStorage.getItem('accessToken');
        console.log(accessToken);
        if(!config.headers!.Authorization && accessToken){
            config.headers!.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    }, (error) => Promise.reject(error)
);

axiosAuth.interceptors.response.use(
    response => response,
    async(error) => {
        const previousRequest = error?.config;
        if(error?.response.status === 403 && !previousRequest?.sent){
            //setting custom previous request flag
            previousRequest.sent = true;
            //refresh token should go here, implement in backend
            //const refreshToken = ...
        }
    }
)