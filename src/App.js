
import React from "react";
import { Routes, Route, Link,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider, 
} from "react-router-dom";
import Main from "./Main";
import { useSelector, useDispatch } from "react-redux";



function App () {
  return (
      <div className="app">
        <Routes> 
          <Route path="/" element={<Main />} />
        </Routes>
      </div>
    
  );
};

export default App;
