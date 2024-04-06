import React, {useState, useEffect} from 'react';
import modalStyle from "../style/modal.module.css"
import { useSelector, useDispatch } from "react-redux";
import Fetcher from '../utils/Fetcher';

const NoticeModal = ({setModalOpen}) => {

    const dispatch = useDispatch();
    const closeModal = () => {
        setModalOpen(false);
    };
  
    return (
        <div className={modalStyle.modalNoticeContainer}>
            <div className="modal-content">
                <button className={modalStyle.closeBtn} onClick={closeModal}>X</button>
            </div>
        </div>
    );
};

export default NoticeModal;