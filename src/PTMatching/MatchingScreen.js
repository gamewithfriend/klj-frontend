import React, {useState, useEffect} from 'react';
import Modal from 'react-modal';
import Header from "../template/Header";
import moduleStyle from "../style/common.module.css";
import matchingStyle from "../style/matching.module.css"
import profile from '../assets/image/profile.png';
import AreaModal from './AreaModal';
import CategoryModal from './CategoryModal';
import GymMap from './GymMap';
import Fetcher from '../utils/Fetcher';
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const MatchingScreen = () => {

    const [modalOpen, setModalOpen] = useState(false);
    const [areaData, setAreaData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const dispatch = useDispatch();
    const reduxAreaRegionInfo = useSelector((state) => state.getAreaUserWant);
    const reduxSportsList = useSelector((state) => state.sendSportsList);
    const [selectedRegion, setSelectedRegion] = useState("");
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [sportsList, setSportsList] = useState([]);


    // console.log(reduxSportsList.sportsList)
    const onClickRegion = (e) => {
        setSelectedRegion(e.target.value);
      };

    const showModal = () => {
        setModalOpen(true);
        dispatch({type:"resetAreaSetting", payload: areaData})
    };

    const showCategoryModal = () => {
        setCategoryModalOpen(true);
        setClicked(true); 
    };

    const fetchCode = async () => {
        const data = {
            id: "region",
            name : "test"
        };
    
        const fetcher = new Fetcher().setUrl("/search/area")
                                        .setMethod("POST")
                                        .setData(JSON.stringify(data));
        const result = await fetcher.jsonFetch();
        dispatch({type:"basicAreaSetting", payload: result})
        setAreaData(result);
    }

    const fetchCategoryCode = async () => {
        const data = {
            id: "category",
            name : "test"
        };
    
        const fetcher = new Fetcher().setUrl("/search/area")
                                        .setMethod("POST")
                                        .setData(JSON.stringify(data));
        const result = await fetcher.jsonFetch();
        dispatch({type:"basicCategorySetting", payload: result})
        setCategoryData(result);
    }
     
    useEffect(() => {
        fetchCode();
        fetchCategoryCode();
    },[]);

    return (
        <div>
            <Header/>
            <div className="body" style={{display:"flex", height:"100%",}}>        
                    <div className={moduleStyle.bodySideHeight100} />
                    
                    <div className={`${moduleStyle.bodyCenter} ${moduleStyle.verticalHorizontalCenter}`} style={{display:'flex', flexDirection:'column'}} >
                        <div className={matchingStyle.blank}></div>
                        
                        <div className={matchingStyle.area}>
                            <div className={matchingStyle.categoryBtnContainer}>
                                <button className={matchingStyle.categoryBtn} onClick={showCategoryModal}> 
                                    카테고리 
                                    <FontAwesomeIcon className={`${clicked ? matchingStyle.clicked : matchingStyle.unclicked}`} icon={faAngleDown} />
                                </button>
                                    {categoryModalOpen 
                                    && 
                                    <CategoryModal 
                                        setCategoryModalOpen={setCategoryModalOpen} 
                                        setClicked={setClicked} 
                                        sportsList={sportsList} 
                                        setSportsList={setSportsList}
                                    />}
                                
                            </div>
                            <div className={matchingStyle.category}>
                                {sportsList.map((sports, index) => (
                                    <button 
                                        key={index}
                                        >
                                        {sports}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className={matchingStyle.areaSection}>
                            <button className={matchingStyle.areaPickBtn} onClick={showModal}>지역선택
                            </button>
                            {modalOpen && <AreaModal setModalOpen={setModalOpen}/> }
                            <div> 
                                {reduxAreaRegionInfo == null ? 
                                    (<p> 선택한 지역이 없습니다 </p>) 
                                    :
                                    (<input className={matchingStyle.areaInput} disabled
                                            type="text" 
                                            value={`${reduxAreaRegionInfo.area} ${reduxAreaRegionInfo.region}`} 
                                            onChange={onClickRegion} 
                                    /> )
                                }
                            </div>
                        </div>


                                <GymMap/>


                        <div className={matchingStyle.trainerWrapper}>
                            <div className={matchingStyle.trainerContainer}>
                                <div className={matchingStyle.trainerPicWrapper}>
                                <div className={matchingStyle.trainerPic}>
                                    <img src={profile} className={matchingStyle.trainerImg} >
                                    </img>
                                </div>
                                </div>
                                <div>김피티</div>
                                <div>삼두짐</div>
                            </div>
                            
                            <div className={matchingStyle.trainerContainer}>
                                <div className={matchingStyle.trainerPicWrapper}>
                                <div className={matchingStyle.trainerPic}>
                                    <img src={profile} className={matchingStyle.trainerImg} >
                                    </img>
                                </div>
                                </div>
                                <div>김피티</div>
                                <div>삼두짐</div>
                            </div>

                            <div className={matchingStyle.trainerContainer}>
                                <div className={matchingStyle.trainerPicWrapper}>
                                <div className={matchingStyle.trainerPic}>
                                    <img src={profile} className={matchingStyle.trainerImg} >
                                    </img>
                                </div>
                                </div>
                                <div>김피티</div>
                                <div>삼두짐</div>
                            </div>

                        </div>
                        
                    </div>

                    <div className={moduleStyle.bodySideHeight100} />
                </div>
        </div>

        
    );

};



export default MatchingScreen;