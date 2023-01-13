type LoggedInUser = {
    id: number;
    username: string;
    email: string;
    roles: string[];
    registeredAt: Date;
}

export default LoggedInUser;