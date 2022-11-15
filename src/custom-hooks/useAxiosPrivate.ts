import { AxiosRequestConfig, AxiosRequestHeaders } from "axios";
import { clearConfigCache } from "prettier";
import { useEffect } from "react";
import { axiosPrivate } from "../api/AxiosPrivate";
import { iAuth } from "../api/types/AuthTyped";


const useAxiosPrivate = (refresh: (auth: iAuth, saveAuth: (auth: iAuth) => void) 
=> Promise<any>, auth: iAuth, saveAuth:(auth: iAuth) => void) => {
     useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            (config : AxiosRequestConfig<AxiosRequestHeaders>) => {
                if (config && config.headers) {
                    if(!(config.headers['Authorization'])) {
                        config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
                    }
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            async (config) => {
                return config;
             },
            async (error) => {
                const prevRequest = error.config;
                if(error.response !== undefined) {
                    if (error.response.status === 403 && !prevRequest.sent) {
                        prevRequest.sent = true;
                        const newAccessToken = (await refresh(auth, saveAuth));
                        prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                        return axiosPrivate(prevRequest);
                    }
                }else {
                    console.log(prevRequest.status);
                    return Promise.reject(error);
                }
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [auth, saveAuth, refresh])

    return axiosPrivate;

}