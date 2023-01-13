import IncorrectCredentialsProps from "../props/IncorrectCredentialsProps";

const IncorrectCredentials = (props: IncorrectCredentialsProps) => {
  return <h1 className="text-white">{props.message}</h1>;
};

export default IncorrectCredentials;
