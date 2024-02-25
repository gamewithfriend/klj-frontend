import React from "react";
import moduleStyle from "../style/common.module.css";
import {Link } from "react-router-dom";
function Header() {
    return (
      <div className={moduleStyle.menuVarOuter} >
        <div className={moduleStyle.menuVarInnerLeft}>
            <Link className={moduleStyle.menuVarLinkTitle} >pitMat</Link>
            <Link className={moduleStyle.menuVarLink} >트레이너 탐색</Link>   
        </div>
        <div className={moduleStyle.menuVarInnerRight}>
            <Link to="/login" className={moduleStyle.menuVarLink}>로그인</Link>
        </div>
      </div>
    );
  }
  
  export default Header;