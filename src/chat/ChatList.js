import React, { useState, useEffect } from 'react';
import ChatItem from './ChatItem';
import styles from '../style/chat.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ChatList = () => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    // 여기서 더미 데이터를 생성하거나 서버에서 데이터를 가져올 수 있습니다.
    const dummyChats = [
      { id: 1, name: '친구 1', profileImage: 'profile1.jpg', lastMessage: '안녕하세요!' },
      { id: 2, name: '친구 2', profileImage: 'profile2.jpg', lastMessage: '오랜만이에요!' },
      { id: 3, name: '친구 3', profileImage: 'profile3.jpg', lastMessage: '뭐해요?' },
    ];
    setChats(dummyChats);
  }, []);

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
