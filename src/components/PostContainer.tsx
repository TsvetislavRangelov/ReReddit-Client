import { Post } from "../api/types/Post"


const PostContainer = (props: Post) => {

    return (
        <div key={props.id} className="border-2 mt-1">
            {props.author.username} - {props.header} - {props.body} - {props.downs} - {props.ups} 
        </div>
    )

}

export default PostContainer;