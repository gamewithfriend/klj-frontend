import React, {useState, useEffect} from 'react';
import matchingModalStyle from "../style/matchingModal.module.css"
import { useSelector, useDispatch } from "react-redux";
import Fetcher from '../utils/Fetcher';

const CategoryModal = ({setCategoryModalOpen, setClicked}) => {

    const reduxCategoryInfo = useSelector((state) => state.getCategory);

    const closeCategoryModal = () => {
        setCategoryModalOpen(false);
        setClicked(false); 
      };
    

    return (
        <div className={matchingModalStyle.modalContainer}>

            <div className={matchingModalStyle.selectAreaTitle}>
                <p className={matchingModalStyle.selectAreaHeader}>운동 선택</p>
                <button className={matchingModalStyle.closeBtn} onClick={closeCategoryModal}>X</button>
            </div>

            <div className={matchingModalStyle.areaBtnArea}>

                <div className={matchingModalStyle.areaBtnContainer}>
                    <p className={matchingModalStyle.areaTitle}>카테고리</p>
                    {reduxCategoryInfo.categoryList.data.map((category) => (
                    <button className={matchingModalStyle.areaBtn}>{category.name}</button>
                    ))}
                </div>

                <div className={matchingModalStyle.regionBtnContainer}>
                    <p className={matchingModalStyle.regionTitle}>상세 운동</p>
                  </div>

            </div>
        </div>
    );
};

export default CategoryModal;