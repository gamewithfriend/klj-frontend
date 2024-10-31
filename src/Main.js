import { useEffect,React,useState } from "react";
import Header from "./template/Header";
import Body from "./template/Body";


function Main() {

  useEffect(() => {
    document.body.style.margin = "0";
  },[]);

  return (
    <div className="App">
        <Header/>

        <Body/>
    </div>
  );
}

export default Main;