import './Message.css';
import { useEffect, useRef } from 'react';
import MessageItem from './MessageItem';
import PropTypes from 'prop-types';

const MessageList = ({ messageList, username }) => {
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(scrollToBottom, [messageList]);

  return (
    <div className="message_list">
      {messageList.map((x, idx) => (
        <MessageItem key={idx} message={x} username={username} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

MessageList.propTypes = {
  messageList: PropTypes.array,
  username: PropTypes.string,
};

export default MessageList;
