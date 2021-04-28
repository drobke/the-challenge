import React from "react";
import "./MessageBuble.scss";

const MessageBuble = (props) => {

  const {message, author, timestamp} = props.message;
  const {user} = props;

  const convertTime = (timestamp) => {
    var theDate = new Date(timestamp);
    var dateString = theDate.toGMTString();
    return dateString
  }
  
  return (
    <div className="message-buble" style={{backgroundColor: author === user.name ? 'red' : 'white'}}>
      <div className="sender">{author}</div>
      <div className="message">{message}</div>
      <div className="timestamp">{convertTime(timestamp)}</div>
  </div>
  );
};

export default MessageBuble;
