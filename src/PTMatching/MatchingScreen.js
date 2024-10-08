import React, {useRef, useState, useEffect} from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faDisplay } from "@fortawesome/free-solid-svg-icons";

import { NavLink, useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import Header from "../template/Header";
import moduleStyle from "../style/common.module.css";
import matchingStyle from "../style/matching.module.css"
import profile from '../assets/image/profile.png';
import AreaModal from './AreaModal';
import CategoryModal from './CategoryModal';
import GymMap from './GymMap';
import TrainerHoverPopup from './TrainerHoverPopup.js';
import Fetcher from '../utils/Fetcher';
import { useSelector, useDispatch } from "react-redux";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import * as matchingService from "../service/matchingService.js";
import StartTimePicker from "./StartTimePicker.js"
import EndTimePicker from "./EndTimePicker.js"
import { combineReducers } from 'redux';

const MatchingScreen = () => {

    const [modalOpen, setModalOpen] = useState(false);
    const [areaData, setAreaData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const dispatch = useDispatch();
    const mapRef = useRef({});
    const reduxAreaRegionInfo = useSelector((state) => state.getAreaUserWant);
    const reduxSportsList = useSelector((state) => state.sendSportsList);
    const [selectedRegion, setSelectedRegion] = useState("");
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [sportsInfo, setSportsInfo] = useState([]);
    const [areaRegionData, setAreaRegionData] = useState({});
    const [mapSwitch, setMapSwitch] = useState(false);
    const [clickedSports, setClickedSports] = useState([]);
    const [trainerList, setTrainerList] = useState([]);
    const [searchDetailBtn, setSearchDetailBtn] = useState(true);
    const [searchExp, setSearchExp] = useState("상세 검색하기")
    const [hoveredTrainer, setHoveredTrainer] = useState(null); 

    const navigate = useNavigate(); 
    const clickFeed = (trainerId) => {
        navigate(`/feed/${trainerId}`); // 피드 
    };

    const clickChat = () => {
        // navigate(`/chat/${trainerId}`); // 채팅
        navigate(`/chat/ChatPage`); // 채팅
    };


    const handleMouseEnter = (trainer) => {
        setHoveredTrainer(trainer.trainerId); 
    };

    const handleMouseLeave = () => {
        setHoveredTrainer(null); 
    };
    
    const [params, setParams] = useState({
        category : [],
        trainingArea : "",
        personCnt : 0,
        startTime : "01:00:00",
        endTime : "23:30:00",
        paramFlag : false
    });

    const clickSearchDetailBtn = () => {
        console.log(params)

        if(!searchDetailBtn){
            setSearchExp("상세 검색하기")
            setParams(prevParams => {
                return {
                    ...prevParams,
                    paramFlag: false
                };
            });
        }else{
            setSearchExp("지도로 검색하기")
            setParams(prevParams => {
                return {
                    ...prevParams,
                    paramFlag: true
                };
            });
        }
        
        setSearchDetailBtn(!searchDetailBtn);
    }

    const memberCountMinus = () => {
        if(params.personCnt == 0){
            return;
        }else{
            setParams(prevParams => {
                return {
                    ...prevParams,
                    personCnt: params.personCnt-1
                };
            });
        }
    }

    const memberCountPlus = () => {
        if(params.personCnt > 9){
            return;
        }else{
            setParams(prevParams => {
                return {
                    ...prevParams,
                    personCnt: params.personCnt+1
                };
            });
        }
    }

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

    const deleteSports = (index) => {
        const updateList = [...sportsInfo];
        updateList.splice(index, 1);
        setSportsInfo(updateList);
        console.log(updateList)
        setParams(prevParams => ({
            ...prevParams, 
            category: updateList
        }));
    }

    const allReset = () =>{
        setSportsInfo([]);
        setClickedSports([]);
        setTrainerList([]);
        mapRef.current.getMap();
        dispatch({type:"resetAreaRegionSetting", payload: areaData});
        setParams({
            category : [],
            trainingArea : "",
            personCnt : 0,
            startTime : "01:00:00",
            endTime : "23:30:00",
            paramFlag : false
        })
    }

    const fetchCode = async () => {
        const result = await matchingService.fetchCode();
        dispatch({type:"basicAreaSetting", payload: result})
        setAreaData(result);
    }

    const fetchCategoryCode = async () => {
        const result = await matchingService.fetchCategoryCode();
        dispatch({type:"basicCategorySetting", payload: result})
        setCategoryData(result);
    }

    const setTrainerId = async (trainerId) => {
        dispatch({type:"setTrainerId", payload: trainerId})
    }

    const searchTrainer = async (params) => {
        if(params.startTime > params.endTime){
            alert("시작 시간이 더 뒤에 있음")
        }else{
            const result = await matchingService.trainerSearch(params);
            setTrainerList(result.data);
        }
    }
     
    useEffect(() => {
        fetchCategoryCode();
        fetchCode();
    },[]);

    return (
        <div>
            <Header/>
            <div className={matchingStyle.body}>        
                    <div className={moduleStyle.bodySideHeight100} />
                    
                    <div className={`${matchingStyle.bodyCenter} ${matchingStyle.verticalHorizontalCenter}`} style={{display:'flex', flexDirection:'column'}} >
                        
                        <div className={matchingStyle.blank}></div>
                            
                        <button className={matchingStyle.searchDetailBtn} onClick={clickSearchDetailBtn}>
                            {searchExp}
                        </button>

                        <div className={matchingStyle.heiSmallBlank}>
                                <hr/>
                        </div>

                        <div className={`${matchingStyle.searchSection} ${searchDetailBtn ? matchingStyle.hiddenOption : ''} searchDetailBtn`}>
    
                            <div className={matchingStyle.btnContainer}>
                                
                                <button className={matchingStyle.searchBtn} onClick={()=> {searchTrainer(params)}}>
                                    <p>검색</p>
                                </button>
                                
                                <button className={matchingStyle.resetBtn} onClick={allReset}> 
                                    <p>초기화</p> &nbsp;&nbsp;
                                    <svg className={matchingStyle.resetIcon} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 64 64">
                                    <path d="M 32 6 C 17.641 6 6 17.641 6 32 C 6 33.147 6.0844688 34.273859 6.2304688 35.380859 L 10.357422 35.865234 C 10.131422 34.608234 10 33.321 10 32 C 10 19.869 19.869 10 32 10 C 38.615909 10 44.551673 12.942341 48.587891 17.580078 L 45.505859 21.652344 L 58 22 L 54.275391 10.068359 L 51.050781 14.328125 C 46.302784 9.2111633 39.530462 6 32 6 z M 53.642578 28.134766 C 53.868578 29.391766 54 30.679 54 32 C 54 44.131 44.131 54 32 54 C 25.383867 54 19.447695 51.057454 15.412109 46.419922 L 18.494141 42.347656 L 6 42 L 9.7246094 53.931641 L 12.945312 49.675781 C 17.692812 54.79188 24.469735 58 32 58 C 46.359 58 58 46.359 58 32 C 58 30.853 57.914531 29.726141 57.769531 28.619141 L 53.642578 28.134766 z"></path>
                                    </svg>
                                </button>
                            </div>


                            <div className={matchingStyle.categorySection}>
                                <div className={matchingStyle.categoryBtnContainer}>
                                    <button className={matchingStyle.categoryBtn} onClick={() => {showCategoryModal()}}> 
                                        카테고리 
                                        <FontAwesomeIcon className={`${clicked ? matchingStyle.clicked : matchingStyle.unclicked}`} icon={faAngleDown} />
                                    </button>
                                        {categoryModalOpen 
                                        && 
                                        <CategoryModal 
                                            setCategoryModalOpen={setCategoryModalOpen} 
                                            setClicked={setClicked} 
                                            sportsInfo={sportsInfo} 
                                            setSportsInfo={setSportsInfo}
                                            clickedSports={clickedSports} 
                                            setClickedSports={setClickedSports}
                                            setParams={setParams}
                                            categoryData={categoryData}
                                        />}
                                    
                                </div>
                                <div className={matchingStyle.category}>
                                    {sportsInfo.map((sports, index) => (
                                        <span className={matchingStyle.sportsBtn}
                                            key={index}
                                            >
                                            {sports.sportsName}
                                            <button className={matchingStyle.sportDelete} onClick={() => deleteSports(index)}>X</button>
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className={matchingStyle.areaSection}>
                                <button className={matchingStyle.areaPickBtn} onClick={showModal}>지역 선택
                                </button>
                                {modalOpen && <AreaModal 
                                                setModalOpen={setModalOpen}
                                                areaRegionData={areaRegionData} 
                                                setAreaRegionData={setAreaRegionData}
                                                setMapSwitch = {setMapSwitch} 
                                                setParams={setParams}
                                                /> }
                                <div className={matchingStyle.param}> 
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


                            <div className={matchingStyle.memberCountSection}>
                                
                                <button className={matchingStyle.areaPickBtn}>인원 선택
                                </button>

                                <div className={matchingStyle.param}> 
                                    <button className={matchingStyle.minusBtn} onClick={memberCountMinus}>-</button>
                                    <input disabled className={matchingStyle.memberCount} value={params.personCnt}></input>
                                    <button className={matchingStyle.plusBtn} onClick={memberCountPlus}>+</button>
                                </div>

                            </div>

                            <div className={matchingStyle.timeChooseSection}>
                                
                                <button className={matchingStyle.areaPickBtn}>희망 시간
                                </button>

                                <div className={matchingStyle.param}> 
                                
                                    <div className={matchingStyle.timeArea}>

                                        <StartTimePicker 
                                            params={params}
                                            setParams={setParams}
                                            />

                                        &nbsp;&nbsp; <p>~</p> &nbsp;&nbsp;

                                        <EndTimePicker 
                                            params={params}
                                            setParams={setParams}
                                            />

                                    </div>
                                
                                </div>

                            </div>
                        </div>

                        <div className={matchingStyle.heiSmallBlank}>
                                <hr/>
                        </div>

                        <GymMap ref={mapRef} 
                                setTrainerList={setTrainerList} 
                                trainerList={trainerList}
                                areaRegionData={areaRegionData} 
                                setAreaRegionData={setAreaRegionData}
                                mapSwitch={mapSwitch}
                                setMapSwitch={setMapSwitch}
                                params={params}
                                setParams={setParams}
                                searchTrainer={searchTrainer}
                                />

                        { <div className={matchingStyle.trainerWrapper}>
                            {trainerList.length == 0 ? 
                            (<p className={matchingStyle.notMatching}>검색 결과가 없습니다.</p>)
                            : 
                            (trainerList.map((trainer, index) => (
                                <NavLink to="/matching/trainerProfile" 
                                        className={matchingStyle.trainerInput}
                                        onClick={() => setTrainerId(trainer.trainerId)}
                                        key={index}
                                        state={{trainer}}
                                        > 
                                    <div className={matchingStyle.trainerContainer} key={index}
                                        onMouseEnter={() => handleMouseEnter(trainer)}
                                        onMouseLeave={handleMouseLeave}
                                        >
                                        <div className={matchingStyle.trainerPicWrapper}>
                                            <div className={matchingStyle.trainerPic}>
                                                <img src={profile} className={matchingStyle.trainerImg} >
                                                </img>
                                            </div>
                                        </div>
                                        <div>{trainer.trainerName}</div>
                                        <div>{trainer.gymName}</div>
                                    </div>

                                    <div className={matchingStyle.trainerBtnArea}>
                                        <button><FontAwesomeIcon icon={faHouse}/> 상세</button>

                                        <button
                                            onClick={(e) => {
                                                e.preventDefault(); // NavLink 기본 이동 방지
                                                clickFeed(trainer.trainerId); // 피드 페이지로 이동
                                            }}
                                        ><FontAwesomeIcon icon={faDisplay}/> 피드</button>

                                        <button
                                            onClick={(e) => {
                                                e.preventDefault(); // NavLink 기본 이동 방지
                                                clickChat(); // 피드 페이지로 이동
                                            }}
                                        ><FontAwesomeIcon icon={faComments}/> 채팅</button>
                                    </div>
                                    
                                    
                                    {hoveredTrainer === trainer.trainerId && (
                                        <div className={`${matchingStyle.trainerHoverPopup} ${hoveredTrainer === trainer.trainerId ? 'show' : ''}`}>
                                            <TrainerHoverPopup trainer={trainer} />
                                        </div>
                                    )}
                                </NavLink>

                            )))
                            
                            }
                        </div>}

                        <div className={matchingStyle.heiBlank} />
                    </div>

                </div>
        </div>
        
    );

};



export default MatchingScreen;