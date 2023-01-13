import LoggedInUser from "../../api/types/LoggedInUser";

type CommentContainerProps = {
    id: number;
    author: LoggedInUser;
    body: string;
    ups: number;
    downs: number;
    createdAt: Date;
    SetFetchAgain: any;
    fetchAgain: boolean;
}

export default CommentContainerProps;