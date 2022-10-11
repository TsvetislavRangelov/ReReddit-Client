import IncorrectCredentialsProps from "../props/IncorrectCredentialsProps";


const IncorrectCredentials = (props: IncorrectCredentialsProps) => {
    return(
        <h1>{props.message}</h1>
    )
}

export default IncorrectCredentials;