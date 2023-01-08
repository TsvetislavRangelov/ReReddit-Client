import { IMessage } from "@stomp/stompjs";
import React, { useEffect } from "react";
import { useState } from "react";
import { Navigate, useLocation, useParams } from "react-router";
import { AuthContextType } from "../api/types/AuthTyped";
import Message from "../api/types/Message";
import ChatMessages from "../components/ChatMessages";
import { AuthContext } from "../context/AuthProvider";
import { client } from "../websocket/stompClient";

const InboxPage = () => {
  const { auth, saveAuth } = React.useContext(AuthContext) as AuthContextType;
  const [messages, setMessages] = useState<Message[]>([]);
  const location = useLocation();

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
