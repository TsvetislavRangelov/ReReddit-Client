import ServerErrorMessage from "../api/types/ServerErrorMessage";


const ServerError = (props: ServerErrorMessage) => {
    return (
        <div style={{display: "flex",
        justifyContent: "center",
        alignItems: "center"}}>
            {props.message}
        </div>
    )
}
export default ServerError;