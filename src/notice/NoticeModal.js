import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import modalStyle from "../style/modal.module.css"
import Fetcher from '../utils/Fetcher';
import NoticeModalDetail from '../notice/NoticeModalDetail.js';

const NoticeModal = ({setModalOpen}) => {

    const dispatch = useDispatch();

    //알림 List state
    const [getNoticeList, setNoticeList] = useState();

    //알림 Detail모달 state
    const [modalDetailOpen, setModalDetailOpen] = useState(false);

    const showModalDetail = (id) => {
      setModalDetailOpen(true);
      dispatch({type:"delete", payload: id})
    };

    const closeModal = () => {
      setModalOpen(false);
    };

      // 로그인 유저 알림 List 함수
    const getUserNoticeList = async () => {
      const token = JSON.parse(localStorage.getItem("token"));

      if (token != null) {
        //console.log(token.accessToken);

        const fetcher = new Fetcher().setUrl("/notice/user")
                                          .setMethod("GET")
                                          .setAccessToken(token.accessToken);
        try {
          const result = await fetcher.jsonFetch();
          setNoticeList(result.data);
          dispatch({type:"get", payload: result.data});
          console.log("result : ", result.data);
        } catch (error) {
          console.error('login error:', error);
        }
      }
    }

    useEffect(() => {
      getUserNoticeList();
    },[]);
  
    return (
        <div style={{overflow: modalDetailOpen ? "hidden" : "auto"}} className={modalStyle.modalNoticeContainer}>
            <div className="modal-content">
                <button className={modalStyle.closeBtn} onClick={closeModal}>X</button>
                <div >
                {getNoticeList && getNoticeList.length > 0 ?
                  (
                    <div style={{backgroundColor:"#f5f6f8"}}>
                    {getNoticeList.map((content)=>( 
                      <div style={{margin:"6%"
                                  , backgroundColor:"white"
                                  , borderRadius:"5%"
                                  , border:"solid 1px #efefef"
                                  }}>
                        <div style={{margin:"2%", display:"flex"}}>
                          <div style={{whiteSpace:"pre-line", fontWeight:"bold"}}>{content.title}</div>
                          <div style={{whiteSpace:"pre-line", marginLeft:"4%"}}>{content.createdDate}</div>
                          <FontAwesomeIcon style={{marginTop:"1%", marginLeft:"10%", cursor:"pointer"}} onClick={() =>{showModalDetail(content.id)}} icon={faEllipsisVertical} />
                        </div>
                        <div style={{margin:"3%", marginTop:"3%",textAlign:"left", whiteSpace:"pre-line"}}>{content.content}</div> 
                      </div>
                    ))}
                    </div>
                  )
                  :
                  (
                  <div>알림이 없습니다.</div>
                  )  
                }
                </div>
                {modalDetailOpen && <NoticeModalDetail  setModalDetailOpen={setModalDetailOpen}/> }
            </div>
        </div>
    );
};

export default NoticeModal;