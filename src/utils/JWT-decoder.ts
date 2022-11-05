import jwt_decode from 'jwt-decode';
import AuthPayload from '../api/auth/tokens/AuthPayload';

export const decode = (token: string)=> {
    if(token){
        try{
            return jwt_decode(token) as AuthPayload;
        }
        catch(err){
            console.error(err);
        }
        
    }
}