// ChatItem.js

import React from 'react';
import styles from '../style/chat.module.css';

const ChatItem = ({ chat }) => {
  console.log("Chat : ", chat);
  return (
    <div className={styles.chatItem}>
      <img src={chat.profileImage} alt="Profile" />
      <div>
        <h>{chat.chatRoomTitle}</h>
        <p>{chat.lastMessage}</p>
      </div>
    </div>
  );
};

export default ChatItem;
