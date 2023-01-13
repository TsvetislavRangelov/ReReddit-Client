import { Link } from "react-router-dom";

const NotFound404 = () => {
  return (
    <div className="text-white text-center mt-64 border-2 rounded w-1/2 ml-96">
      <h1>Sorry, the thing you're looking for couldn't be found</h1>
      <h3>The resource may have been deleted or your input was incorrect.</h3>
      <Link
        className="no-underline text-black bg-gray-200 text-xl rounded-full w-100"
        to="/"
      >
        Go Home
      </Link>
      <p className="text-sm">
        Use of this site constitutes acceptance of our User Agreement and
        Privacy Policy. ©2023 ReReddit inc. All rights reserved.
      </p>
    </div>
  );
};
export default NotFound404;
