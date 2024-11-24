// ChatScreen.js

import React, { useState, useRef, useEffect } from 'react';
import MessageList from './MessageList';
import * as chatService from "../service/chat/chatService.js";
import { useSelector } from "react-redux";
import styles from '../style/chat.module.css';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

const ChatScreen = ({chatRoomId}) => {
  const APP_URI = process.env.REACT_APP_API_URI;
  // 메세지 list
  const [messages, setMessages] = useState([]);

  // websocket
  const [messageClient, setMessageClient] = useState(null);
  
  // input 값을 가져오기 위한 ref 선언
  const messageInput = useRef(null);

  // 로그인 되어있는 사용자의 id
  const userId = useSelector((state) => state.login.id);

  useEffect(() => {
    // SockJs를 활용하여 WebSocket Endpoint를 설정해줌
    const socket = new SockJS(`${APP_URI}/ws`);

    // STOMP 클라이언트 초기화
    const stompClient = Stomp.over(socket);

    // 연결 설정
    stompClient.connect({}, () => {
        // 메세지 구독 및 수신 로직
        stompClient.subscribe(`/topic/${chatRoomId}`, (message) => {
          const recivedMessage = JSON.parse(message.body || message._body);

          setMessages(prevMessages => [...prevMessages, recivedMessage]);
        });
    });

    setMessageClient(stompClient);

    // 컴포넌트가 언마운트될 때 연결 해제
    return () => {
      if (stompClient && stompClient.connected) stompClient.disconnect();
    };
  }, []);

  useEffect(() => {
    getChatMessageList(chatRoomId);
  }, []);

  const sendMessage = (event) => {
    if (event.type === "keydown" && event.key !== "Enter") {
      return;
    }
    
    const newMessage = messageInput.current.value;
    if (newMessage.trim() !== '') {
      const messageObject = {
        'type' : 'CHAT',
        'content' : newMessage,
        'senderId' : userId,
        'chatRoomId' : Number(chatRoomId),
        'timestamp' : new Date().getNowTime('YYYYMMDDHHmmss'),
      };
      
      messageClient.send(`/chat/${chatRoomId}/sendMessage`, {}, JSON.stringify(messageObject));
      messageInput.current.value = '';
    }
  };

  // 채팅방 입장 시 채팅내용 목록을 조회
  const  getChatMessageList = async (chatRoomId) => {
    const messageList = await chatService.getChatMessageList(chatRoomId);
    setMessages(messageList);
  }


  // 화면 구성부
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
