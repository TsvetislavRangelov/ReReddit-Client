import User from "./User";

export type Post = {
    id: number;
    author: User;
    header: string;
    body: string;
    ups: number;
    downs: number;
}