import User from "./User";

type CreatePostData = {
    header: string;
    body: string;
    author: User

}

export default CreatePostData;