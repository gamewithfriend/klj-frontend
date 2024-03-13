import { useEffect,React,useState } from "react";
import moduleStyle from "../style/common.module.css";
import {Link,NavLink } from "react-router-dom";
import {getLoginNickName,isTokenExpired,logout} from "../login/LoginHandler.js";
import Fetcher from '../utils/Fetcher';

function Header() {
  const [userInfo, setUserInfo] = useState({});
  const handleLogout = () => {
    logout();
    setUserInfo({});
  };
  const fetchUserInfo = async () => {
    console.log("ss")
    const token = JSON.parse(localStorage.getItem("token"));

    if (token != null) {
      console.log(token.accessToken);

      const fetcher = new Fetcher().setUrl("http://localhost:8080/user/info")
                                         .setMethod("GET")
                                         .setAccessToken(token.accessToken);
      const result = await fetcher.jsonFetch();
      console.log(result)
      console.log("result : ", result.data);

      try {
        setUserInfo(result.data);
      } catch (error) {
        console.error('Naver login error:', error);
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
        {Object.keys(userInfo).length === 0 ? 
          <NavLink to="/login" className={moduleStyle.menuVarLink}>로그인</NavLink> 
          :
          <div className={moduleStyle.flexJustifyRight}>
            <div>sss</div>  
            <button onClick={handleLogout}> 로그아웃 </button>
          </div> 
        }
        </div>
      </div>
    );
  }
  
  export default Header;

  