import React, { useState, useEffect } from 'react';
import ChatItem from './ChatItem';
import styles from '../style/chat.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as chatService from "../service/chat/chatService.js";
import { useSelector } from "react-redux";

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const userId = useSelector((state) => state.login.id);
  
  useEffect(() => {
    getChatRoomList(userId);
  }, []);

  const getChatRoomList = async (userId) => {
    const chatRoomList = await chatService.selectChatRoomList(userId);
    console.log("chatRoomList : ", chatRoomList);
    setChats(chatRoomList);
  }


















  return (
    <div className={styles.chatList}>
      <div>
        <span>채팅</span>
        <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
      </div>
      {chats.map((chat, index) => (
        <ChatItem key={index} chat={chat} />
      ))}
    </div>
  );
};

export default ChatList;
