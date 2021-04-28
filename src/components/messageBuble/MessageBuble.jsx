import "./MessageBuble.scss";
import {convertTime} from "../../utils"

const MessageBuble = (props) => {
  const {message, author, timestamp} = props.message;
  const {user} = props;

  return (
    <div className={`message-buble ${author === user.name ? 'sender' : ''}`}>
      {author !== user.name && <div className="author">{author}</div>}
      <div className="message">{message}</div>
      <div className="timestamp">{convertTime(timestamp)}</div>
  </div>
  );
};

export default MessageBuble;
