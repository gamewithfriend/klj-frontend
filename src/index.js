import React from 'react';
import ReactDOM from 'react-dom/client';
import { Routes, Route, Link,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  BrowserRouter 
} from "react-router-dom";
import App from './App';
import Login from "./login/LoginScreen";
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <App /> }></Route>
        <Route path="/login" element={<Login/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
