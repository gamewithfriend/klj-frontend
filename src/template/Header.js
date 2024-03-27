import { useEffect, React, useState, useLayoutEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";

import moduleStyle from "../style/common.module.css";
import profile from '../assets/image/profile.png';
import Fetcher from '../utils/Fetcher';
import { isTokenExpired} from "../login/LoginHandler.js";


function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reduxUserInfo = useSelector((state) => state.login);


  const goUserProfile = () => {
    navigate("/userProfile");
  };

  const fetchUserInfo = async () => {
    const token = JSON.parse(localStorage.getItem("token"));

    if (token != null) {
      console.log(token.accessToken);

      const fetcher = new Fetcher().setUrl("/user/info")
                                         .setMethod("GET")
                                         .setAccessToken(token.accessToken);
      try {
        const result = await fetcher.jsonFetch();
        console.log(result)
        console.log("result : ", result.data);
        dispatch({type:"PLUS_ONE",payload: result.data})
        console.log(reduxUserInfo)
      } catch (error) {
        console.error('login error:', error);
      }
    }
  }
  
  useEffect(() => {
      isTokenExpired();
      fetchUserInfo();
  },[]);


    return (
      <div className={moduleStyle.menuVarOuter} >
        <div className={moduleStyle.menuVarInnerLeft}>
            <NavLink to="/" className={moduleStyle.menuVarLinkTitle} >pitMat</NavLink>
            <NavLink to="/matching" className={moduleStyle.menuVarLink} >트레이너 탐색</NavLink>   
        </div>
        <div className={moduleStyle.menuVarInnerRight}>
        {localStorage.getItem("token") === null ? 
          <NavLink to="/login" className={moduleStyle.menuVarLink}>로그인</NavLink> 
          :
          <div className={moduleStyle.flexJustifyRight}>
            <FontAwesomeIcon style={{color:"white", marginRight:"8%", padding:"4%"}} icon={faBell} />
            <div style={{width:"13%",borderRadius:"70%", overflow:"hidden"}}>
              <img onClick={goUserProfile}  src={profile} style={{width:"100%",height:"100%",objectFit:"cover" }} >
              </img>
            </div>
          </div> 
        }
        </div>
      </div>
    );
  }
  
  export default Header;

  