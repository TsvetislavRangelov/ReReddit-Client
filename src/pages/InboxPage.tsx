import { AxiosInstance } from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Spinner } from "react-bootstrap";
import { Navigate, useLocation, useParams } from "react-router";
import InboxQueryParams from "../api/params/InboxQueryParams";
import { AuthContextType } from "../api/types/AuthTyped";
import LoggedInUser from "../api/types/LoggedInUser";
import Message from "../api/types/Message";
import { getUser } from "../api/UserAPI";
import NotFound404 from "../components/errors/NotFound404";
import MessageContainer from "../components/MessageContainer";
import { AuthContext } from "../context/AuthProvider";
import useAxiosPrivate from "../custom-hooks/useAxiosPrivate";
import useRefresh from "../custom-hooks/useRefresh";

const InboxPage = () => {
  const params = useParams<InboxQueryParams>();
  //   const [foundUser, setFoundUser] = useState<LoggedInUser>();
  const { auth, saveAuth } = React.useContext(AuthContext) as AuthContextType;
  const [messages, setMessages] = useState<Message[]>([]);
  const location = useLocation();
  const parsedId = Number(params.id);
  const refresh = useRefresh();
  const axiosPrivate = useAxiosPrivate(
    refresh,
    auth,
    saveAuth
  ) as AxiosInstance;

  if (!auth?.username) {
    return <Navigate to="/" state={{ from: location }}></Navigate>;
  }
  const messageRenderer = messages?.map((msg) => (
    <MessageContainer
      id={msg.id}
      key={msg.id}
      sender={msg.sender}
      receiver={msg.receiver}
      body={msg.body}
    ></MessageContainer>
  ));

  return (
    <div>
      {messages?.length === 0 ? (
        <h1>No messages yet</h1>
      ) : (
        <div>
          {messageRenderer} - {messages.length}
        </div>
      )}
    </div>
  );
};
export default InboxPage;
