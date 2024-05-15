import './Message.css';
import { useCallback, useEffect, useState } from 'react';
import { useSocket } from '../../customHooks/useSocket';
import { RiSendPlaneLine, RiSendPlaneFill } from 'react-icons/ri';
import MessageList from './MessageList';
import { useFetch } from '../../customHooks/useFetch';
import PropTypes from 'prop-types';

const Message = ({ room, username }) => {
  const { socketResponse, sendData } = useSocket(room, username);
  const [messageInput, setMessageInput] = useState('');
  const [messageList, setMessageList] = useState([]);

  const { responseData } = useFetch('/message/' + room);

  const addMessageToList = useCallback(
    (val) => {
      if (val.room == '') return;
      setMessageList([...messageList, val]);
    },
    [messageList]
  );

  useEffect(() => {
    if (responseData != undefined) {
      setMessageList([...responseData, ...messageList]);
    }
  }, [messageList, responseData]);

  useEffect(() => {
    console.log('Socket Response: ', socketResponse);
    addMessageToList(socketResponse);
  }, [addMessageToList, socketResponse]);

  const sendMessage = useCallback(
    (e) => {
      e.preventDefault();
      if (messageInput != '') {
        sendData({
          content: messageInput,
        });
        addMessageToList({
          content: messageInput,
          username: username,
          createdDateTime: new Date(),
          messageType: 'CLIENT',
        });
        setMessageInput('');
      }
    },
    [addMessageToList, messageInput, sendData, username]
  );

  return (
    <div className="message_root_div">
      <span className="room_name">Room: {room} </span>
      <span className="user_name">Welcome: {username} </span>
      <div className="message_component">
        <MessageList username={username} messageList={messageList} />
        <form className="chat-input" onSubmit={(e) => sendMessage(e)}>
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Type a message"
          />
          <button type="submit">
            {messageInput == '' ? (
              <RiSendPlaneLine size={25} />
            ) : (
              <RiSendPlaneFill color="#2671ff" size={25} />
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

Message.propTypes = {
  room: PropTypes.string,
  username: PropTypes.string,
};

export default Message;