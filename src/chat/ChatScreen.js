// ChatScreen.js

import React, { useState, useRef, useEffect } from 'react';
import MessageList from './MessageList';
import * as Dateformatter from '../utils/Dateformatter';
import * as chatService from "../service/chat/chatService.js";
import { useSelector } from "react-redux";
import styles from '../style/chat.module.css';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';


const ChatScreen = (chatRoomId) => {
  // 메세지 list
  const [messages, setMessages] = useState([]);

  // websocket
  const [messageClient, setMessageClient] = useState(null);
  
  // input 값을 가져오기 위한 ref 선언
  const messageInput = useRef(null);

  // 로그인 되어있는 사용자의 id
  const userId = useSelector((state) => state.login.id);

  // 채팅방 id - 나중에 화면 전환 시 chatRoomId를 받아올 수 있도록 삭제하면 됨
  chatRoomId = 1;

  useEffect(() => {
    // SockJs를 활용하여 WebSocket Endpoint를 설정해줌
    const socket = new SockJS('http://localhost:8080/ws');

    // STOMP 클라이언트 초기화
    const stompClient = Stomp.over(socket);

    // 연결 설정
    stompClient.connect({}, () => {
        // 메세지 구독 및 수신 로직
        stompClient.subscribe('/topic/public', (message) => {
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
    getChatMessageList(1);
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
        'chatRoomId' : chatRoomId,
        'timestamp' : new Date().getNowTime('YYYYMMDDHHmmss'),
      };

      messageClient.send("/chat/sendMessage", {}, JSON.stringify(messageObject));
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
