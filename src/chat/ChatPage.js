// ChatPage.js

import React from 'react';
import ChatList from './ChatList';
import ChatScreen from './ChatScreen';
import styles from '../style/chat.module.css';
import Header from "../template/Header";

const ChatPage = () => {
  return (
    <div>
      <Header/>
      <div style={{height:"10vh"}}></div>
      <div className={styles.chatPage}>
        <div className={styles.chatListContainer}>
          <ChatList />
        </div>
        <div className={styles.chatScreenContainer}>
          <ChatScreen />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;