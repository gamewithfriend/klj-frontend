import React, {useState, useEffect} from 'react';
import matchingModalStyle from "../style/matchingModal.module.css"
import { useSelector, useDispatch } from "react-redux";
import Fetcher from '../utils/Fetcher';

const CategoryModal = ({setCategoryModalOpen, setClicked, setSportsList, sportsList}) => {

    const dispatch = useDispatch();
    const reduxCategoryInfo = useSelector((state) => state.getCategory);
    const reduxSportsInfo = useSelector((state) => state.getSports);
    const [sportsData, setSportsData] = useState({
        category: "",
        sports: ""
      });

    const closeCategoryModal = () => {
        setCategoryModalOpen(false);
        setClicked(false); 
    };

    const closeModal = () =>{
        setCategoryModalOpen(false);
        setClicked(false); 
    }
    
    const fetchCategoryCode = async (categoryCode) => {
    
        const data = {
            id: categoryCode,
            name : "test"
        };

        const fetcher = new Fetcher().setUrl("/search/area")
                                        .setMethod("POST")
                                        .setData(JSON.stringify(data));
        const result = await fetcher.jsonFetch();
        dispatch({type:"basicSprotsSetting", payload: result})
    }   

    const categoryPick = (categoryName) => {
        const updatedData = { ...sportsData, category: categoryName };
        setSportsData(updatedData);
    }

    const sportsPick = (sportsName) => {
        let updatedList;

        if (sportsList.includes(sportsName)) {
            updatedList = sportsList.filter(item => item !== sportsName);
        } else {
            updatedList = [...sportsList, sportsName];
        }

        if(updatedList.length > 5){
            alert("운동은 최대 5개까지 선택 가능합니다.") // 추후에 모달로 대체
        }else{
            setSportsList(updatedList);
        }

        
    };

    return (
        <div>
        <button className={matchingModalStyle.layer} onClick={()=>closeModal()}></button>
        <div className={matchingModalStyle.modalContainer}>

            <div className={matchingModalStyle.selectAreaTitle}>
                <p className={matchingModalStyle.selectAreaHeader}>운동 선택</p>
                <button className={matchingModalStyle.closeBtn} onClick={closeCategoryModal}>X</button>
            </div>

            <div className={matchingModalStyle.areaBtnArea}>

                <div className={matchingModalStyle.areaBtnContainer}>
                    <p className={matchingModalStyle.areaTitle}>카테고리</p>
                    {reduxCategoryInfo.categoryList.data.map((category, index) => (
                    <button className={matchingModalStyle.areaBtn} onClick={() => {fetchCategoryCode(category.id); categoryPick(category.name); }}  key={index}>{category.name}</button>
                    ))}
                </div>

                <div className={matchingModalStyle.regionBtnContainer}>
                    <p className={matchingModalStyle.regionTitle}>상세 운동</p>
                    {reduxSportsInfo && reduxSportsInfo.sportsList && reduxSportsInfo.sportsList.data ? (
                        <div className={matchingModalStyle.regionBtnContainer}> 
                            {reduxSportsInfo.sportsList.data.map((sports, index) => (
                                <button 
                                    className={`${matchingModalStyle.regionBtn} ${matchingModalStyle.areaBtn}`} 
                                    key={index}
                                    onClick={() => {sportsPick(sports.name); }} >
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