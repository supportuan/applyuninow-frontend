import Send from "../../assets/application/Send.svg";
import Image from "next/image";
import useChat from "../../Hooks/useChat";
import React, { useEffect, useState, useRef, useCallback } from "react";
import api from "../../api";
import { environment } from "../../environments/environment";
import { toast } from "react-toastify";
import { loginUser } from "../../utils";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import moment from "moment";

const useStyles = makeStyles((Student) => ({
  root: {
    // backgroundColor: '#151929 !important',
    paddingY: "0px",
    "&:before": {
      backgroundColor: "#151929 !important",
    },
    "& .Mui-expanded": {
      border: "none",
      backgroundColor: "transparent !important",
    },
    "& .MuiPaper-root": {
      background: "transparent !important",
      padding: "0px !important",
      borderBottom: "1px solid #404050",
    },
    "& .MuiAccordionDetails-root": {
      padding: "0px 0px 0px 0px",
    },
  },
  details: {
    backgroundColor: "transparent !important",
    borderRadius: "8px",
    "& .MuiAccordionDetails-root": {
      padding: "0px 0px 0px 0px",
    },
    marginTop: "24px",
  },

  summary: {
    backgroundColor: "#151929 !important",
    borderRadius: "8px !important",
    margin: "0px",
    "&.Mui-expanded ": {
      border: "none",
      backgroundColor: "#151929 !important",
    },
    "&.MuiButtonBase-root-MuiAccordionSummary-root.Mui-expanded": {
      height: "0px",
    },

    padding: "10px",
    // maxHeight: '25px',
  },
}));

const Discussions = ({ student }) => {
  const classes = useStyles();
  const { messages, sendMessage } = useChat(student.id);
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

  const onChange = (e) => {
    e.preventDefault();
    e.stopPropagation();
    let { value } = e.target
    setNewMessage(value);
  };

  useEffect(() => {
    if (messages && messages.application_id === student.id) {
      const messageExists = chatList.some((x) => x.id === messages.meta.id);
      if (!messageExists) {
        setChatList((prev) => [...prev, messages.meta]);

        setTimeout(() => {
          scrollToBottom();
        }, 500);
      }
    }
  }, [messages, chatList, student.id]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // sendMessage(newMessage);
    setNewMessage("");
    sendChatMessage({ message: newMessage, student_id: student.id });
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
        toast.error("Unable to initiate chat");
      });
  };

  useEffect(() => {
    let loggedUser = loginUser();
    if (loggedUser) {
      let user = JSON.parse(loggedUser);
      setUserId(user.id);
    }
    fetchChat();
  }, [fetchChat]);

  const onEnterPress = (e) => {
    if (e.keyCode == 13 && e.shiftKey == false) {
      setNewMessage("");
      e.preventDefault();
      e.stopPropagation();
      sendChatMessage({ message: newMessage, student_id: student.id });
    }
  }


  const fetchChat = useCallback(() => {
    setLoading(true);
    api
      .get(`${environment.API_BASE_URL}/admin/chats?student_id=` + student.id)
      .then((res) => {
        console.log(res);
        setLoading(false);
        metaData(res.data.meta);
        setChatList(res.data.data);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        toast.error("Opps Unable to fetch POC. Please Try after some time");
      });
  }, [student.id]);

  return (
    <div className="w-full rounded flex flex-col gap-6">
      <Accordion
        key="chat-discussion"
        defaultExpanded={false}
        elevation={0}
        className={classes.root}
        sx={{ border: "none", borderRadius: "8px" }}
      >
        <AccordionSummary
          sx={{ borderRadius: "8px", height: "10px" }}
          style={{ minHeight: "48px" }}
          expandIcon={
            // <img src={undefined} alt="icon" className="mx-3" />
            <svg
              className="rotate"
              width="12"
              height="7"
              viewBox="0 0 12 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.99922 0.0281248C6.13255 0.0281248 6.26155 0.0531254 6.38622 0.103126C6.51155 0.153126 6.61589 0.219792 6.69922 0.303125L11.2992 4.90312C11.4826 5.08646 11.5742 5.31979 11.5742 5.60313C11.5742 5.88646 11.4826 6.11979 11.2992 6.30313C11.1159 6.48646 10.8826 6.57812 10.5992 6.57812C10.3159 6.57812 10.0826 6.48646 9.89922 6.30313L5.99922 2.40312L2.09922 6.30313C1.91589 6.48646 1.68255 6.57812 1.39922 6.57812C1.11588 6.57812 0.882553 6.48646 0.69922 6.30313C0.515886 6.11979 0.424218 5.88646 0.424218 5.60313C0.424218 5.31979 0.515886 5.08646 0.69922 4.90312L5.29922 0.303125C5.39922 0.203125 5.50755 0.132459 5.62422 0.0911255C5.74089 0.0491257 5.86589 0.0281248 5.99922 0.0281248Z"
                fill="white"
              />
            </svg>
          }
          aria-controls="panel1a-content"
          id="panel1a-header"
          className={classes.summary}
        >
          <Typography>
            <p className="audio my-2 mx-2 text-white">Discussions</p>
          </Typography>
        </AccordionSummary>

        <AccordionDetails className={classes.details}>
          <div className=" ">
            {/* <hr className="border border-2 mt-3" /> */}

            <div className="flex flex-row  lg:h-[451px]  rounded-xl lg:rounded-none px-1 md:px-4 lg:pt-0  mt-2 bg-tab   lg:mt-6 lg:gap-6 lg:pl-0">
              <div className="container overflow-auto  " ref={messagesEndRef}>
                {chatList.map((x, index) => {
                  return (
                    <div key={x.id || index} className="w-full px-2 py-2 md:px-4 md:py-4">
                      {x.author_id != userId && (
                        <div className="flex flex-row py-4 gap-2">
                          <div
                            className="m-0 md:m-1 mr-0 md:mr-2 w-5 md:w-10 h-5 md:h-10 p-0 md:p-4 relative flex justify-center
                                          items-center rounded-full bg-slider text-[10px] md:text-xl text-white uppercase cursor-pointer"
                          >
                            {x?.author?.name?.charAt(0)}
                          </div>
                          <div className="flex flex-col">
                            <div className="flex lg:flex-row gap-1 md:gap-2 flex-col md:mt-3 mt-1">
                              <p className="text-xs md:text-sm text-[#57CD53] ">
                                {x?.author?.name}
                              </p>
                              <span className="text-text items-center md:text-[10px] hidden lg:flex">
                                {moment(x.created_at).fromNow()}
                              </span>
                            </div>
                            <div className="bg-light p-1 md:p-4 w-full max-w-xs mt-3 text-sm rounded-tr-lg rounded-br-lg rounded-bl-lg">
                              <p className="leading-6 text-xs md:text-sm break text-white">
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
                        <div className="flex justify-end gap-1 md:gap-2 sm:gap-4">
                          <div className="flex flex-col">
                            <div className="flex gap-0 w-[130px] md:w-full  md:gap-2 items-center justify-center md:justify-end flex-col-reverse lg:flex-row md:mt-3 mt-1">
                              <span className="text-text text-xs md:text-[10px] hidden lg:flex">
                                {moment(x.created_at).fromNow()}
                              </span>
                              <p className="text-xs md:text-sm text-[#07A1C0] text-right">
                                ApplyUniNow Executive
                              </p>
                            </div>
                            <div className="ml-auto bg-light p-1 md:p-4 w-full max-w-xs mt-3 rounded-tl-lg rounded-br-lg rounded-bl-lg">
                              <p className="leading-6 text-xs md:text-sm break text-white">
                                {x.message}
                                <p className="text-text text-[10px] lg:hidden">
                                  {moment(x.created_at).fromNow()}
                                </p>
                              </p>
                            </div>
                          </div>
                          <div>
                            <div
                              className="m-0 md:m-1 mr-0 md:mr-2 w-5 md:w-10 h-5 md:h-10 p-0 md:p-4 relative flex justify-center
                                                    items-center rounded-full bg-slider text-[10px] md:text-xl text-white uppercase cursor-pointer"
                            >
                              A
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
                <div className="relative" ref={messagesEndRef} />
                {!chatList.length && !loading && (
                  <div>
                    <p className="text-center md:mt-4 text-2xl text-white">
                      No Chats Found
                    </p>
                  </div>
                )}
              </div>
            </div>

            <hr className="" />
            <form onSubmit={handleSendMessage}>
              <div className="flex  w-full gap-2">
                <div className="w-full mt-4 rounded-xl flex">
                  <textarea
                    value={newMessage}
                    onKeyDown={onEnterPress}
                    onChange={onChange}
                    className="h-[126px]  bg-[#151929] p-4 rounded-lg text-white"
                    placeholder="Type Something Here.."
                    type="text"
                    rows="4"
                  ></textarea>
                </div>
                <div className="mt-6 cursor-pointer">
                  <Image src={Send} onClick={handleSendMessage} alt="Send" width={24} height={24} />
                </div>
              </div>
            </form>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Discussions;
