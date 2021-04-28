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
  const [isLoaded, setIsLoaded] = useState(false);
  //reference to a text in input field and scroll position
  const messageText = useRef();
  const divRef = useRef(null);

  //Current user that uses the app
  const user = {
    name: "Nenad",
    token: "Ih65fg5moM4D",
  };

  useEffect(() => {
    //fetching all messages using a token from a user
    getAllMessages(user.token)
      .then((response) => {
        setIsLoaded(true);
        setChatState(response);
        //after getting messages we scroll to the last one
        divRef.current.scrollIntoView({ behavior: "smooth" });
      })
      .catch((error) => console.log(error.message));
  }, [user.token]);

  const onSendMessage = () => {
    //we only send message if there is a text inside the text box
    if (messageText.current.value.trim().length > 0) {
      sendMessage(user, messageText.current.value)
        .then(() => {
          //empty input after sending the message
          messageText.current.value = "";
          //getting the messages to update with our last message and the messages from other users using same database, using last message timestamp in the array
          //This approach will cause problem if the array is empty needs to be updated and refactored
          getLastMessages(user.token, chatState[chatState.length - 1].timestamp)
            .then((response) => {
              setChatState((prevState) => {
                return [...prevState, ...response];
              });
              //scroll after our message is sent
              divRef.current.scrollIntoView({ behavior: "smooth" });
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
          {isLoaded ? (
            <>
              {chatState.length > 0 ? (
                <>
                  {chatState.map((item) => (
                    <MessageBuble key={item._id} message={item} user={user} />
                  ))}
                </>
              ) : (
                <div>No Messages</div>
              )}
            </>
          ) : (
            <div>Loading...</div>
          )}
          {/* dummy div for scroll position reference */}
          <div ref={divRef} />
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
