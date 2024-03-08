import React from 'react';
import ReactDOM from 'react-dom/client';
import { Routes, Route, Link,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  BrowserRouter 
} from "react-router-dom";
import { Provider } from 'react-redux'; 
import App from './App';
import Login from "./login/LoginScreen";
import Matching from './PTMatching/MatchingScreen';
import reportWebVitals from './reportWebVitals';
import OAuth2RedirectHandler from './login/OAuth2RedirectHandler';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <App /> }></Route>
          <Route path="/login" element={<Login/>} />
          <Route path="/matching" element={<Matching/>}/>
          <Route path="/login/callback/naver" element={<OAuth2RedirectHandler/>} />
        </Routes>
      </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
