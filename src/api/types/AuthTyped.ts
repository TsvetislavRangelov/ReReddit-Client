export interface iAuth{
    id: number;
    username: string;
    roles: string[];
    accessToken: string;
    refreshToken: string;
}

export type AuthContextType = {
    auth: iAuth;
    saveAuth: (auth: iAuth) => void;
}