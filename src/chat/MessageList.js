// MessageList.js

import React from 'react';
import Message from './Message';
import styles from '../style/chat.module.css';

const MessageList = ({ messages }) => {
  return (
    <div className={styles.messageList}>
      {messages.map((message, index) => (
        <Message key={index} text={message.text} sender={message.sender} />
      ))}
    </div>
  );
};

export default MessageList;
