import React, { useState, useEffect, useRef } from "react";
import MessageBuble from "../../components/messageBuble/MessageBuble";
import "./style.scss";
import {
  getAllMessages,
  sendMessage,
  getLastMessages,
} from "../../services/ChatService";
const Chat = () => {
  const [chatState, setChatState] = useState([]);
  const messageText = useRef();
  const user = {
    name: "Nenad",
    token: "Ih65fg5moM4D",
  };

  useEffect(() => {
    getAllMessages(user.token)
      .then((response) => {
        setChatState(response);
      })
      .catch((error) => console.log(error.message));
  }, [user.token]);

  const onSendMessage = () => {
    if (messageText.current.value.length > 0) {
      sendMessage(user, messageText.current.value)
        .then(() => {
          messageText.current.value = "";
          getLastMessages(user.token, chatState[chatState.length - 1].timestamp)
            .then((response) => {
              setChatState((prevState) => {
                return [...prevState, ...response];
              });
            })
            .catch((error) => console.log(error.message));
        })
        .catch((error) => console.log(error.message));
    } else alert("please enter a message");
  };
  
  return (
    <>
      <div className="main-wrapper">
        <div className="message-wrapper">
          {chatState.map((item) => (
              <MessageBuble key={item._id} message={item} user={user} />
            ))}
        </div>
      </div>
      <div className="bottom-wrapper">
        <div className="input-wrapper">
          <input placeholder="Message" ref={messageText} />
          <button onClick={onSendMessage}>Send</button>
        </div>
      </div>
    </>
  );
};

export default Chat;
