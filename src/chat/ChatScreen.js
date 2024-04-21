// ChatScreen.js

import React, { useState, useRef } from 'react';
import MessageList from './MessageList';
import styles from '../style/chat.module.css';

const ChatScreen = () => {
  const [messages, setMessages] = useState([
    { text: '안녕하세요!', sender: 'user' },
    { text: '안녕하세요! 반갑습니다.', sender: 'other' },
  ]);
  
  // input 값을 가져오기 위한 ref 선언
  const messageInput = useRef(null);
  
  const sendMessage = (event) => {
    if (event.type === "keydown" && event.key !== "Enter") {
      return;
    }
    const newMessage = messageInput.current.value;
    if (newMessage.trim() !== '') {
      const updatedMessages = [...messages, { text: newMessage, sender: 'user' }];
      setMessages(updatedMessages);
      messageInput.current.value = '';
    }
  };

  return (
    <div className={styles.chatScreen}>
      <MessageList messages={messages} />
      <div className={styles.inputContainer}>
        <input
          type="text"
          ref={messageInput}
          className={styles.input}
          placeholder="메시지 입력..."
          onKeyDown={sendMessage}
        />
        <button className={styles.sendButton} onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatScreen;
