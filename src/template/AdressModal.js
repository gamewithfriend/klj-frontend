import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DaumPostcode from 'react-daum-postcode';

import modalStyle from "../style/modal.module.css"
import Fetcher from '../utils/Fetcher';

const AdressModal = ({setModalOpen}) => {

    const dispatch = useDispatch();

    // 유저 로그인 토근 가져오기
    const token = JSON.parse(localStorage.getItem("token"));

    const closeModal = () => {
        setModalOpen(false);
    };

    useEffect(() => {
    },[]);
  
    return (
        <div className={modalStyle.modalAdressContainer} >
            <button className={modalStyle.closeBtn} onClick={closeModal}>X</button>
            <div className="modal-content" >
                <DaumPostcode style={{overflow:"hidden"}} 
                ></DaumPostcode>
            </div>
        </div>
    );
};

export default AdressModal;