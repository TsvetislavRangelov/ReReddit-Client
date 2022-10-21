import ViewPostProps from "./props/ViewPostProps";

const ViewPost = (props: ViewPostProps) => {
  return (
    <div className="border-1 w-50 bg-gray-800 min-h-fit">
      <div>
        <div className="flex flex-row">
          <button className="hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 6.75L12 3m0 0l3.75 3.75M12 3v18"
              />
            </svg>
          </button>
          <p>{props.foundPost.ups}</p>
        </div>
        <br />
        <div className="flex flex-row">
          <button className="hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 17.25L12 21m0 0l-3.75-3.75M12 21V3"
              />
            </svg>
          </button>
          <p>{props.foundPost.downs}</p>
        </div>
        <div className="flex flex-row ">
          <h3 className="break-all">{props.foundPost.header} •</h3>
          <p className="float-right mt-2 mr-2 ml-3">
            Posted by {props.foundPost.author.username}
          </p>
        </div>
      </div>
      <div>{props.foundPost.body}</div>
    </div>
  );
};

export default ViewPost;
