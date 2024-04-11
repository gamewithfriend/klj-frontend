import React, {useState, useEffect} from 'react';
import Modal from 'react-modal';
import Header from "../template/Header";
import moduleStyle from "../style/common.module.css";
import matchingStyle from "../style/matching.module.css"
import profile from '../assets/image/profile.png';
import AreaModal from './AreaModal';
import Fetcher from '../utils/Fetcher';
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const MatchingScreen = () => {

    const [modalOpen, setModalOpen] = useState(false);
    const [areaData, setAreaData] = useState([]);
    const dispatch = useDispatch();
    const reduxAreaRegionInfo = useSelector((state) => state.getAreaUserWant);

    const showModal = () => {
        setModalOpen(true);
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
    
    useEffect(() => {
        fetchCode();
    },[]);

    return (
        <div>
            <Header/>
            <div className="body" style={{display:"flex", height:"100%",}}>        
                    <div className={moduleStyle.bodySideHeight100} />
                    
                    <div className={`${moduleStyle.bodyCenter} ${moduleStyle.verticalHorizontalCenter}`} style={{display:'flex', flexDirection:'column'}} >
                        <div className={matchingStyle.blank}></div>
                        
                        <div className={matchingStyle.area}>
                            <div>
                                <button className={matchingStyle.categoryBtn}> 
                                    카테고리 
                                    <FontAwesomeIcon className={matchingStyle.categoryArrow} icon={faAngleDown} />
                                </button>
                                
                            </div>
                            <p> 운동종류 여기 </p>
                        </div>

                        <div className={matchingStyle.area}>
                            <button className={matchingStyle.areaPickBtn} onClick={showModal}>지역 선택
                            </button>
                            {modalOpen && <AreaModal setModalOpen={setModalOpen}/> }
                            <div> 
                                {reduxAreaRegionInfo == null ? 
                                    (<p> 선택한 지역이 없습니다 </p>) 
                                    :
                                    (<p>{reduxAreaRegionInfo.area} {reduxAreaRegionInfo.region}</p> )
                                }
                            </div>
                        </div>

                        <div class className={matchingStyle.trainerWrapper}>
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