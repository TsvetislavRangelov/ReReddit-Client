import axios from "axios"
import { iAuth } from "../api/types/AuthTyped"


const useRefresh = () => {
    const refresh = async (auth: iAuth, saveAuth: (auth: iAuth) => void) : Promise<string> => {
        const res = await axios.post('http://localhost:8080/refresh', {refreshToken: auth.refreshToken}, {
            withCredentials:false
        });
        console.log(auth.accessToken);
        const newAuth = {...auth, accessToken: res.data.accessToken as string}
        saveAuth(newAuth);
        return res.data.accessToken as string;
    }
    return refresh;
};

export default useRefresh;