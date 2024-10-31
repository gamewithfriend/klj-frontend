import React from 'react';
import ReactDOM from 'react-dom/client';
import { Routes, Route, Link,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  BrowserRouter 
} from "react-router-dom";
import { Provider } from 'react-redux';
import store from "./redux/config/configStore"; 
import App from './App';
import Login from "./login/LoginScreen";
import Matching from './PTMatching/MatchingScreen';
import TrainerProfile from './PTMatching/TrainerProfile';
import reportWebVitals from './reportWebVitals';
import OAuth2RedirectHandler from './login/OAuth2RedirectHandler';
import KakaoOAuth2RedirectHandler from './login/KakaoOAuth2RedirectHandler';
import UserProfile from "./user/userProfile";
import UserTrainerProfile from "./user/UserTrainerProfile";
import FeedScreen from './feed/FeedScreen';
import CreateFeed from './feed/CreateFeed';
import ChatPage from "./chat/ChatPage";

const HealthCheck = () => {
  // 여기에 건강 검사 로직을 추가합니다.
  return <div>Health Check OK</div>;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <style>
      {`
      #root {
        margin: 0%;
      }
      `}
    </style>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <App /> }></Route>
          <Route path="/login" element={<Login/>} />
          <Route path="/login/callback/naver" element={<OAuth2RedirectHandler/>} />
          <Route path="/login/callback/kakao" element={<KakaoOAuth2RedirectHandler/>} />
          <Route path="/matching" element={<Matching/>}/>
          <Route path="/matching/trainerProfile" element={<TrainerProfile/>}/>

          <Route path="/chat/ChatPage" element={<ChatPage/>}/>

          <Route path="/feed" element={<FeedScreen/>}/>
          <Route path="/feed/create" element={<CreateFeed/>}/>

          <Route path="/user/userProfile" element={<UserProfile/>}/>
          <Route path="/user/userTrainerProfile" element={<UserTrainerProfile/>}/>
          {/* 건강 검사 엔드포인트 */}
          <Route path="/health" element={<HealthCheck />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </>    
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
