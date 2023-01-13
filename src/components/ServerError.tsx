import ServerErrorMessage from "../api/types/ServerErrorMessage";

const ServerError = (props: ServerErrorMessage) => {
  return (
    <div
      className="text-white"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {props.message}
    </div>
  );
};
export default ServerError;
