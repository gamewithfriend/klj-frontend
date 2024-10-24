// ChatPage.js

import React from 'react';
import ChatList from './ChatList';
import ChatScreen from './ChatScreen';
import styles from '../style/chat.module.css';
import Header from "../template/Header";
import { useLocation } from 'react-router-dom';

const ChatPage = () => {
  const location = useLocation();
  const { chatRoomId } = location.state || {};  // 상태에서 chatRoomId 추출

  return (
    <div>
      <Header/>
      <div style={{height:"10vh"}}></div>
      <div className={styles.chatPage}>
        <div className={styles.chatListContainer}>
          <ChatList />
        </div>
        <div className={styles.chatScreenContainer}>
          <ChatScreen chatRoomId={chatRoomId}/>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;