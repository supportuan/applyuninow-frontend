import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import { environment } from "../environments/environment";

const NEW_CHAT_MESSAGE_EVENT = "APPLICATION_INNER_CHAT";
const SOCKET_SERVER_URL = environment.API_BASE_URL;

const useChat = (studentId) => {
  const [messages, setMessages] = useState("");
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { studentId },
    });

    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
      setMessages(message);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const sendMessage = (messageBody) => {};

  return { messages, sendMessage };
};

export default useChat;
