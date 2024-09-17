import React from 'react';
import styles from '../style/chat.module.css';
import { useSelector } from "react-redux";

const Message = ({ text, sender }) => {
  const userId = useSelector((state) => state.login.id);

  return (
    <div className={`${styles.message} ${sender === userId ? styles.userMessage : styles.otherMessage}`}>
      {text}
    </div>
  );
};

export default Message;
