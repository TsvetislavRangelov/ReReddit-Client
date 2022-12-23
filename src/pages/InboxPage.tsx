import { Client, IMessage } from "@stomp/stompjs";
import { AxiosInstance } from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Navigate, useLocation, useParams } from "react-router";
import InboxQueryParams from "../api/params/InboxQueryParams";
import { AuthContextType } from "../api/types/AuthTyped";
import Message from "../api/types/Message";
import ChatMessages from "../components/ChatMessages";
import UserFilter from "../components/UserFilter";
import { AuthContext } from "../context/AuthProvider";
import useAxiosPrivate from "../custom-hooks/useAxiosPrivate";
import useRefresh from "../custom-hooks/useRefresh";
import { client } from "../websocket/stompClient";

const InboxPage = () => {
  const params = useParams<InboxQueryParams>();
  const { auth, saveAuth } = React.useContext(AuthContext) as AuthContextType;
  const [messages, setMessages] = useState<Message[]>([]);
  const location = useLocation();
  // const parsedId = Number(params.id);
  // const refresh = useRefresh();
  // const axiosPrivate = useAxiosPrivate(
  //   refresh,
  //   auth,
  //   saveAuth
  // ) as AxiosInstance;

  useEffect(() => {
    client.onConnect = (frame) => {
      client.subscribe(`/topic/messages`, (message) => {
        if (message.body) {
          onMessageReceived(message);
        } else {
          alert("no message");
        }
      });
    };
    client.activate();
  }, []);

  const onMessageReceived = (data: IMessage) => {
    const message = JSON.parse(data.body);
    console.log(message);
    setMessages((messages) => [...messages, message]);
  };


  if (!auth?.username) {
    return <Navigate to="/" state={{ from: location }}></Navigate>;
  }

  return (
    <div className="flex flex-col align-center items-center">
      {messages?.length === 0 ? (
        <h1>No messages yet</h1>
      ) : (
        <div>
          <ChatMessages messages={messages}></ChatMessages>
        </div>
      )}
    </div>
  );
};
export default InboxPage;
