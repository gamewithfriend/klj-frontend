import { useEffect, React, useState, useLayoutEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";

import moduleStyle from "../style/common.module.css";
import profile from '../assets/image/profile.png';
import NoticeModal from '../notice/NoticeModal.js';
import Fetcher from '../utils/Fetcher';
import { isTokenExpired} from "../login/LoginHandler.js";



function Header() {
  //리덕스 관련
  const dispatch = useDispatch();
  let reduxUserInfo = useSelector((state) => state.login);
  //화면 이동 navigate
  const navigate = useNavigate();
  //알림 카운트 state
  const [getUnReadNoticeCount, setUnReadNoticeCount] = useState(0);
  //알림 모달 state
  const [modalOpen, setModalOpen] = useState(false);

  // 화면 이동 함수
  const goUserProfile = () => {
    navigate("/user/userProfile");
  };

  // 모달 제어 함수
  const showModal = () => {
    setModalOpen(true);
  };

  // 로그인 유저 정보 함수
  const fetchUserInfo = async () => {
    const token = JSON.parse(localStorage.getItem("token"));

    if (token != null) {
      //console.log(token.accessToken);

      const fetcher = new Fetcher().setUrl("/user/info")
                                         .setMethod("GET")
                                         .setAccessToken(token.accessToken);
      try {
        const result = await fetcher.jsonFetch();
        //console.log("result : ", result.data);
        dispatch({type:"PLUS_ONE",payload: result.data})
        //console.log(reduxUserInfo)
      } catch (error) {
        console.error('login error:', error);
      }
    }
  }

  // 로그인 유저 알림 카운트 함수
  const fetchUserNoticeCount = async () => {
    const token = JSON.parse(localStorage.getItem("token"));

    if (token != null) {
      //console.log(token.accessToken);

      const fetcher = new Fetcher().setUrl("/notice/count")
                                         .setMethod("GET")
                                         .setAccessToken(token.accessToken);
      try {
        const result = await fetcher.jsonFetch();
        setUnReadNoticeCount(result.data)
        //console.log("result : ", result.data);
      } catch (error) {
        console.error('login error:', error);
      }
    }
  }
  
  useEffect(() => {
      isTokenExpired();
      fetchUserInfo();
      fetchUserNoticeCount();
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
          <div className={moduleStyle.flexJustifyRight} onClick={showModal}>
            {modalOpen && <NoticeModal  setModalOpen={setModalOpen}/> }
            <FontAwesomeIcon style={{color:"white", padding:"4%", paddingRight:"0%"}} icon={faBell} />
            {getUnReadNoticeCount === 0 ?
            <a style={{color:"red"}}></a>
            :
            <a style={{color:"red"}} >
              {getUnReadNoticeCount}
            </a> 
            }
            <div style={{width:"13%",borderRadius:"70%", marginLeft:"7%", overflow:"hidden"}}>
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

  