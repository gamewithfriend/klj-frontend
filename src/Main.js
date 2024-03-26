import { useEffect,React,useState } from "react";
import Header from "./template/Header";
import Body from "./template/Body";
import MainBanner from "./template/MainBanner";

function Main() {

  useEffect(() => {
  },[]);

  return (
    <div className="App">
        <Header/>
        <MainBanner/>
        <Body/>
    </div>
  );
}

export default Main;