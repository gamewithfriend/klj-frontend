// ChatItem.js

import React from 'react';
import styles from '../style/chat.module.css';

const ChatItem = ({ chat }) => {
  return (
    <div className={styles.chatItem}>
      <img src={chat.profileImage} alt="Profile" />
      <div>
        <h3>{chat.name}</h3>
        <p>{chat.lastMessage}</p>
      </div>
    </div>
  );
};

export default ChatItem;
