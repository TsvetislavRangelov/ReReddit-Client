import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createPost } from "../api/PostAPI";
import CreatePostData from "../api/types/CreatePostData";
import LoggedInUser from "../api/types/LoggedInUser";
import { getUser } from "../api/UserAPI";

const CreatePost = () => {
  const navigate = useNavigate();
  const token = window.sessionStorage.getItem("accessToken");
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreatePostData>();
  //gotta check OAuth token here

  const onSubmit: SubmitHandler<CreatePostData> = async (
    postData: CreatePostData
  ) => {
    const author: LoggedInUser = (await getUser(
      Number(window.sessionStorage.getItem("userId"))
    ))!;
    postData.author = author;
    console.log(author.id, author.email);
    if (author.id !== 0) {
      console.log(postData);
      await createPost(postData).then((res) => {
        if (res !== undefined) {
          navigate("/");
        }
      });
    }
  };

  return (
    <div className="flex flex-col justify-between items-center w-50 mt-10 bg-gray-900">
      <div className="flex flex-row justify-around border-b-2 w-100 items-center object-contain place-content-center bg-gray-900">
        <button className="flex align-center hover:border-b-2 text-xl grow border-r-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
            />
          </svg>
          Text
        </button>
        <button className="flex align-center hover:border-b-2 grow border-r-2 text-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          Image
        </button>
        <button className="flex align-center hover:border-b-2 grow text-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
            />
          </svg>
          Link
        </button>
      </div>
      <div className="mt-6 w-full">
        <form
          className="flex flex-col items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            type="text"
            className=" mb-2 inline-block p-2 w-11/12 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Title*"
            {...register("header", { required: true })}
          />
          {errors.header && (
            <span>A title is required to create your post</span>
          )}
          <textarea
            rows={6}
            className="inline-block p-2.5 w-11/12 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Text(optional)"
            {...register("body", { required: false })}
          />
          <input
            type="submit"
            value="Post"
            className="bg-white hover:bg-white-700 text-black font-bold py-2 px-4 rounded place-self-end mt-2 mr-2"
          />
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
