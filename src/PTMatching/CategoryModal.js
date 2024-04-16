import React, {useState, useEffect} from 'react';
import matchingModalStyle from "../style/matchingModal.module.css"
import { useSelector, useDispatch } from "react-redux";
import Fetcher from '../utils/Fetcher';

const CategoryModal = ({setCategoryModalOpen}) => {

    const closeCategoryModal = () => {
        setCategoryModalOpen(false);
      };

    return (
        <div className={matchingModalStyle.modalContainer}>
                <p>테스트</p>
                <button onClick={closeCategoryModal}>X</button>
        </div>
    );
};

export default CategoryModal;