import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import modalStyle from "../style/modal.module.css"
import HorizonLine from "../template/HorizonLine";



const NoticeModal = ({setModalDetailOpen}) => {
    
    let reduxUserInfo = useSelector((state) => state.notice);

    const closeModalDetail = () => {
        setModalDetailOpen(false);
        console.log(reduxUserInfo)
    };
    
    return (
        <div className={modalStyle.modalNoticeDetailContainer}>
            <div className="modal-content">
                <div style={{display:"flex"}}>
                    <div>
                        <FontAwesomeIcon style={{marginLeft:"60%", marginTop:"80%"}}  icon={faTrash} />
                    </div>
                    <div style={{textAlign:"center", marginLeft:"5%", marginTop:"2.3%"}}>
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