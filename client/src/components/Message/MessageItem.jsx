import './Message.css';
import { timeStampConverter } from '../../util/timeUtils';
import PropTypes from 'prop-types';

const MessageItem = ({ message, username }) => {
  const type = message.messageType.toLowerCase();
  const self = message.username == username ? '_self' : '';
  const time = timeStampConverter(message.createdDateTime);

  return (
    <div className={'message_item_' + type + self}>
      {type != 'server' && self == '' && (
        <span className="message_item_username">{message.username}</span>
      )}
      <div className={'message_content_' + type + self}>
        <span className="message_content_value">{message.content}</span>
        <span>{time}</span>
      </div>
    </div>
  );
};

MessageItem.propTypes = {
  message: PropTypes.object,
  username: PropTypes.string,
};

export default MessageItem;
