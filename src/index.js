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
import reportWebVitals from './reportWebVitals';
import OAuth2RedirectHandler from './login/OAuth2RedirectHandler';
import KakaoOAuth2RedirectHandler from './login/KakaoOAuth2RedirectHandler';
import UserProfile from "./template/UserProfileTemplate";

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
          <Route path="/userProfile" element={<UserProfile/>}/>
        </Routes>
      </BrowserRouter>
    </Provider>
  </>    
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
