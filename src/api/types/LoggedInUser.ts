type LoggedInUser = {
    id: number;
    username: string;
    password: string;
    email: string;
    roles: string[];
}

export default LoggedInUser;