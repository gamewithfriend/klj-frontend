import React from 'react';
import styles from '../style/chat.module.css';

const Message = ({ text, sender }) => {
  return (
    <div className={`${styles.message} ${sender === 'user' ? styles.userMessage : styles.otherMessage}`}>
      {text}
    </div>
  );
};

export default Message;
