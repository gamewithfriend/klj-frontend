import { useEffect,React,useState } from "react";
import Header from "./template/Header";
import Body from "./template/Body";

function Main() {

  useEffect(() => {
  },[]);

  return (
    <div className="App">
        <Header/>
        <Body/>
    </div>
  );
}

export default Main;