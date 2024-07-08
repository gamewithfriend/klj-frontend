import React, {useState, useEffect} from 'react';
import matchingModalStyle from "../style/matchingModal.module.css"
import { useSelector, useDispatch } from "react-redux";
import Fetcher from '../utils/Fetcher';
import * as matchingService from "../service/matchingService.js";

const CategoryModal = ({setParams, setCategoryModalOpen, setClicked, setModalPathParam, setSportsInfo, sportsInfo, clickedSports, setClickedSports}) => {

    const dispatch = useDispatch();
    
    const reduxCategoryInfo = useSelector((state) => state.getCategory);
    const reduxSportsInfo = useSelector((state) => state.getSports);
    const [sportsData, setSportsData] = useState({
        category: "",
        sports: ""
      });

    const handleClick = (id) => {
        let updatedId;

        if (clickedSports.includes(id)) {
           updatedId = clickedSports.filter(item => item !== id);
           // clickedSports 안에 같은 값이 있을 때
        } else {
           updatedId = [...clickedSports, id];
           // clickedSports 안에 같은 값이 없을 때
            
           if(updatedId.length > 5){
            alert("카테고리는 최대 5개까지 선택 가능합니다.");
            updatedId.pop();
           }
        }

        setClickedSports(updatedId);
        setParams(prevParams => {
            return {
                ...prevParams,
                category: updatedId
            };
        });
    }

    const closeCategoryModal = () => {
        setCategoryModalOpen(false);
        setClicked(false); 
    };

    const closeModal = () =>{
        setCategoryModalOpen(false);
        setClicked(false); 
    }
    
    const fetchSportsCode = async (categoryCode) => {
        const result = await matchingService.fetchSportsCode(categoryCode);
        dispatch({type:"basicSprotsSetting", payload: result})
    }   

    const categoryPick = (categoryName) => {
        const updatedData = { ...sportsData, category: categoryName };
        setSportsData(updatedData);
    }

    const saveSportsInfo = (name, id) => {

        const updateSportsInfo = { sportsName: name, sportsId: id };
        const exists = sportsInfo.some(sport => sport.sportsId === id);

        let updatedList;
        if (exists) {
        // 이미 존재하면 제거
        updatedList = sportsInfo.filter(sport => sport.sportsId !== id);
        } else {
        // 존재하지 않으면 추가
        updatedList = [...sportsInfo, updateSportsInfo];
        
        if(updatedList.length > 5){
            updatedList.pop();
        }

        }

        setSportsInfo(updatedList);

    }

    return (
        <div>
        <button className={matchingModalStyle.layer} onClick={()=>closeModal()}></button>
        <div className={ setModalPathParam == "trainer" ? matchingModalStyle.modalCategoryTrainerContainer : matchingModalStyle.modalContainer }>

            <div className={matchingModalStyle.selectAreaTitle}>
                <p className={matchingModalStyle.selectAreaHeader}>운동 선택</p>
                <button className={matchingModalStyle.closeBtn} onClick={closeCategoryModal}>X</button>
            </div>

            <div className={matchingModalStyle.areaBtnArea}>

                <div className={matchingModalStyle.areaBtnContainer}>
                    <p className={matchingModalStyle.areaTitle}>카테고리</p>
                    {reduxCategoryInfo.categoryList.data.map((category, index) => (
                    <button className={matchingModalStyle.areaBtn} onClick={() => {fetchSportsCode(category.id); categoryPick(category.name); }}  key={index}>{category.name}</button>
                    ))}
                </div>

                <div className={matchingModalStyle.regionBtnContainer}>
                    <p className={matchingModalStyle.regionTitle}>상세 운동</p>
                    {reduxSportsInfo && reduxSportsInfo.sportsList && reduxSportsInfo.sportsList.data ? (
                        <div className={matchingModalStyle.regionBtnContainer}> 
                            {reduxSportsInfo.sportsList.data.map((sports, index) => (
                                <button 
                                    className={`${matchingModalStyle.regionBtn} ${matchingModalStyle.areaBtn} ${clickedSports.includes(sports.id) ? matchingModalStyle.clickedSports : ''}`} 
                                    key={index}
                                    onClick={() => {handleClick(sports.id); saveSportsInfo(sports.name, sports.id) ; }} >
                                    {sports.name}
                                </button>
                                
                            ))}
                        </div>
                    ) : (
                        <div></div>
                    )}
                  </div>

            </div>
        </div>
        </div>
    );
};

export default CategoryModal;