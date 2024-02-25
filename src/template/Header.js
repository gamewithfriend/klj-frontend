import React from "react";
import moduleStyle from "../style/common.module.css";
import {Link,NavLink } from "react-router-dom";
function Header() {
    return (
      <div className={moduleStyle.menuVarOuter} >
        <div className={moduleStyle.menuVarInnerLeft}>
            <NavLink className={moduleStyle.menuVarLinkTitle} >pitMat</NavLink>
            <NavLink className={moduleStyle.menuVarLink} >트레이너 탐색</NavLink>   
        </div>
        <div className={moduleStyle.menuVarInnerRight}>
            <NavLink to="/login" className={moduleStyle.menuVarLink}>로그인</NavLink>
        </div>
      </div>
    );
  }
  
  export default Header;