import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import modalStyle from "../style/modal.module.css"
import HorizonLine from "../template/HorizonLine";
import Fetcher from '../utils/Fetcher';


const NoticeModal = ({setModalDetailOpen,setNoticeList}) => {
    
    const dispatch = useDispatch();
    let reduxUserNoticeInfo = useSelector((state) => state.notice);
    let reduxUserNoticeListInfo = useSelector((state) => state.noticeList);

    const closeModalDetail = () => {
        setModalDetailOpen(false);
    };

    const fetchUserNoticeListDelete = async (noticeList) => {
        const token = JSON.parse(localStorage.getItem("token"));

        if (token != null) {
          //console.log(token.accessToken);
    
          const fetcher = new Fetcher().setUrl("/notice/user?noticeList="+noticeList)
                                             .setMethod("DELETE")
                                             .setAccessToken(token.accessToken);
          try {
            const result = await fetcher.jsonFetch();
            console.log("result : ", result.data);
          } catch (error) {
            console.error('login error:', error);
          }
        }
    }

    const deleteNotice = () => {
        // 리스트 정제 과정 (단건이여도 백엔드 메소드 재활용을 위해 리스트로 정제)
        let noticeList = [];
        noticeList.push(reduxUserNoticeInfo.id);
        console.log(noticeList)
        console.log(reduxUserNoticeListInfo)
        setNoticeList(reduxUserNoticeListInfo.noticeList)
        dispatch({type:"get", payload: reduxUserNoticeListInfo.noticeList});
        //fetchUserNoticeListDelete(noticeList);
        setModalDetailOpen(false);
    };
    
    return (
        <div className={modalStyle.modalNoticeDetailContainer}>
            <div className="modal-content">
                <div style={{display:"flex"}}>
                    <div>
                        <FontAwesomeIcon style={{marginLeft:"60%", marginTop:"80%"}}  icon={faTrash} />
                    </div>
                    <div style={{textAlign:"center", marginLeft:"5%", marginTop:"2.3%", cursor:"pointer"}} onClick={() =>{deleteNotice()}}>
                        삭제하기
                    </div>
                </div>
                <HorizonLine />
                <div style={{textAlign:"center", cursor:"pointer"}} onClick={closeModalDetail}>
                    취소
                </div>
            </div>
        </div>
    );
};

export default NoticeModal;