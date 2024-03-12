import { useEffect,React,useState } from "react";
import moduleStyle from "../style/common.module.css";
import {Link,NavLink } from "react-router-dom";
import {getLoginNickName,getUserInfo,isTokenExpired} from "../login/LoginHandler.js";

function Header() {
  const test = getUserInfo();
    useEffect(() => {
      isTokenExpired();
      let result = test();
    },[]);

    return (
      <div className={moduleStyle.menuVarOuter} >
        <div className={moduleStyle.menuVarInnerLeft}>
            <NavLink to="/" className={moduleStyle.menuVarLinkTitle} >pitMat</NavLink>
            <NavLink to="/matching" className={moduleStyle.menuVarLink} >트레이너 탐색</NavLink>   
        </div>
        <div className={moduleStyle.menuVarInnerRight}>
            <NavLink to="/login" className={moduleStyle.menuVarLink}>로그인</NavLink>
        </div>
      </div>
    );
  }
  
  export default Header;

  // {loginToken == null ? <NavLink to="/login" className={moduleStyle.menuVarLink}>로그인</NavLink> : <NavLink to="/" className={moduleStyle.menuVarLink} >로그아웃</NavLink>}  