import { useEffect,React,useState } from "react";
import moduleStyle from "../style/common.module.css";
import {Link,NavLink } from "react-router-dom";
import {getLoginNickName,isTokenExpired,logout} from "../login/LoginHandler.js";
import Fetcher from '../utils/Fetcher';
<script src="https://kit.fontawesome.com/0a273d6251.js" crossorigin="anonymous"></script>
function Header() {
  const [userInfo, setUserInfo] = useState({});
  const handleLogout = () => {
    logout();
    setUserInfo({});
    console.log(userInfo)
  };
  const fetchUserInfo = async () => {
    const token = JSON.parse(localStorage.getItem("token"));

    if (token != null) {
      console.log(token.accessToken);
      const data = {};

      // Fetch user info
      const fetcher = new Fetcher("http://localhost:8080/user/info", "GET", JSON.stringify(data), "application/json;", token.accessToken);
      const result = await fetcher.jsonFetch();

      console.log("result : ", result.data);

      try {
        console.log(result.data);
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

  