
import React from "react";
import { Routes, Route, Link,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider, 
} from "react-router-dom";
import Header from "./template/Header";
import Login from "./login/LoginScreen";
import Main from "./Main";


function App () {
  return (
    <div className="app">
      <Routes> 
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </div>
  );
};

export default App;
