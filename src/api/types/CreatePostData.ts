import LoggedInUser from "./LoggedInUser";

type CreatePostData = {
    header: string;
    body: string;
    author: LoggedInUser

}

export default CreatePostData;