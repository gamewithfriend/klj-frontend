// ChatPage.js

import React from 'react';
import ChatList from './ChatList';
import ChatScreen from './ChatScreen';
import styles from '../style/chat.module.css';

const ChatPage = () => {
  return (
    <div className={styles.chatPage}>
      <div className={styles.chatListContainer}>
        <ChatList />
      </div>
      <div className={styles.chatScreenContainer}>
        <ChatScreen />
      </div>
    </div>
  );
};

export default ChatPage;