import React, { useEffect, useState, useRef } from "react";
import Send from "../../../assets/application/Send.svg";
import useChat from "../../../Hooks/useChat";
import api from "../../../api";
import { environment } from "../../../environments/environment";
import { toast } from "react-toastify";
import { loginUser } from "../../../utils";
import moment from "moment";

const ChatHistory = () => {
  const { messages, sendMessage } = useChat([1]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatList, setChatList] = useState([]);
  const [userId, setUserId] = useState("");
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const [meta, metaData] = useState({
    current_page: "",
    total: "0",
    per_page: "0",
  });

  const onChange = (event) => {
    setNewMessage(event.target.value);
  };

  useEffect(() => {
    if (messages) {
      console.log(messages);
      if (messages.application_user_id === userId) {
        let list = [...chatList];
        let index = list.find((x) => x.id === messages.meta.id);
        if (index != -1) {
          list.push(messages.meta);
        }
        setChatList(list);

        setTimeout(() => {
          scrollToBottom();
        }, 500);
      }
    }
  }, [messages]);

  const handleSendMessage = () => {
    // sendMessage(newMessage);
    setNewMessage("");
    sendChatMessage({ message: newMessage });
  };

  const onEnterPress = (e) => {
    if (e.keyCode == 13 && e.shiftKey == false) {
      setNewMessage("");
      sendChatMessage({ message: newMessage });
    }
  };

  const sendChatMessage = (obj) => {
    api
      .post(`${environment.API_BASE_URL}/admin/chats`, obj)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        toast.error("Opps Unable to fetch POC. Please Try after some time");
      });
  };

  useEffect(() => {
    let loggedUser = loginUser();
    if (loggedUser) {
      let user = JSON.parse(loggedUser);
      setUserId(user.id);
    }
    fetchChat();
  }, []);

  const fetchChat = () => {
    setLoading(true);
    api
      .get(`${environment.API_BASE_URL}/admin/chats`)
      .then((res) => {
        setLoading(false);
        metaData(res.data.meta);
        setChatList(res.data.data);
        scrollToBottom();
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        toast.error("Opps Unable to fetch POC. Please Try after some time");
      });
  };

  return (
    <div className="p-2 md:p-6">
      <p className="text-xl md:text-2xl font-audiowide gradient-text mt-1 lg:mt-0">
        <span className="text-xl md:text-2xl font-audiowide  gradient-text ">
          {" "}
          Chat...
        </span>
      </p>
      <p className="text-xs text-primary">
        {" "}
        ApplyUniNow is happy to connect with you and will reply you at the
        earliest possible.
      </p>

      <div className="mt-5 md:mt-4 bg-light rounded-xl">
        <div className="text-white border-b border-[#404050] p-4 md:p-6"></div>

        <div
          className="mx-2 md:mx-6 bg-tab p-4 sm:p-6 flex flex-col gap-4 chat-window overflow-auto   "
          ref={messagesEndRef}
        >
          {chatList.map((x) => {
            return (
              <>
                {x.author_id !== userId && (
                  <div className="flex flex-row gap-2 lg:gap-0">
                    <div
                      className="m-0 md:m-1 mr-0 md:mr-2 w-5 md:w-10 h-5 md:h-10 p-0 md:p-4 relative flex justify-center
                                          items-center rounded-full bg-slider text-[10px] md:text-xl text-white uppercase cursor-pointer"
                    >
                      A
                    </div>
                    <div className="flex flex-col">
                      <div className="flex lg:flex-row gap-1 md:gap-2 flex-col md:mt-4 mt-1">
                        <p className="text-xs md:text-sm text-[#07A1C0] ">
                          ApplyUniNow Executive
                        </p>
                        <span className="text-text items-center md:text-[10px] hidden lg:flex">
                          {moment(x.created_at).fromNow()}
                        </span>
                      </div>
                      <div className="bg-light p-1 md:p-4 w-full max-w-xs mt-3 text-sm rounded-tr-lg rounded-br-lg rounded-bl-lg">
                        <p className="leading-6 text-xs md:text-sm break">
                          {x.message}
                          <p className="text-text text-[10px]  lg:hidden">
                            {moment(x.created_at).fromNow()}
                          </p>
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                {x.author_id == userId && (
                  <>
                    <div className="flex flex-row-reverse gap-2 lg:gap-1">
                    <div
                      className="m-0 md:m-1 mr-0 md:mr-2 w-5 md:w-10 h-5 md:h-10 p-0 md:p-4 relative flex justify-center
                                          items-center rounded-full bg-slider text-[10px] md:text-xl text-white uppercase cursor-pointer"
                    >
                      {x?.author?.name?.charAt(0)}
                    </div>
                    <div className="flex flex-col">
                      <div className="flex lg:flex-row-reverse gap-1 md:gap-2 flex-col md:mt-3 ">
                        <p className="text-xs md:text-sm text-[#57CD53] ml-4 lg:ml-0 ">
                        {x?.author?.name}
                        </p>
                        <span className="text-text items-center md:text-[10px] hidden lg:flex">
                          {moment(x.created_at).fromNow()}
                        </span>
                      </div>
                      <div className="bg-light p-1 md:p-4 w-full max-w-xs mt-3 text-sm rounded-tr-lg rounded-br-lg rounded-bl-lg">
                        <p className="leading-6 text-xs md:text-sm break">
                          {x.message}
                          <p className="text-text text-[10px]  lg:hidden">
                            {moment(x.created_at).fromNow()}
                          </p>
                        </p>
                      </div>
                    </div>
                  </div>
                  </>
                )}
                <div ref={messagesEndRef} />
              </>
            );
          })}
        </div>
        <hr className="" />
        <form onSubmit={handleSendMessage}>
          <div className="flex px-6 pb-4 w-full gap-2">
            <div className="w-full mt-4 rounded-xl flex">
              <textarea
                onKeyDown={onEnterPress}
                value={newMessage}
                onChange={onChange}
                className="h-[126px] w-full bg-[#151929] p-4 rounded-lg placeholder:text-sm"
                placeholder="Type Something here.."
                type="text"
              ></textarea>
            </div>
            <div className="mt-6">
              <img src={Send} onClick={handleSendMessage} alt="" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatHistory;
