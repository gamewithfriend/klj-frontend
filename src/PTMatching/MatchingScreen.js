import React, {useRef, useState, useEffect} from 'react';
import { NavLink, useNavigate } from "react-router-dom";
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
import * as matchingService from "../service/matchingService.js";
import TimePicker from "./TimePicker.js"

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
    const [sportsList, setSportsList] = useState([]);
    const [sportsInfo, setSportsInfo] = useState([]);
    const [memberCount, setMemberCount] = useState(0);
    const [startDate, setStartDate] = useState(new Date());
    const [modalPathParam, setModalPathParam] = useState("matching");
    const [trainerList, setTrainerList] = useState([]);
    const [areaRegionData, setAreaRegionData] = useState({});
    const [mapSwitch, setMapSwitch] = useState(false);
    const [clickedSports, setClickedSports] = useState([]);

    
    const [params, setParams] = useState({
        category : [],
        trainingArea : "",
        personCnt : 0,
        trainingTime : ""
    });

    const memberCountMinus = () => {
        if(memberCount == 0){
            return;
        }else{
            setMemberCount(memberCount - 1);
            setParams(prevParams => {
                return {
                    ...prevParams,
                    personCnt: memberCount-1
                };
            });
        }
    }

    const memberCountPlus = () => {
        if(memberCount > 9){
            return;
        }else{
            setMemberCount(memberCount + 1);
            setParams(prevParams => {
                return {
                    ...prevParams,
                    personCnt: memberCount+1
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
    }

    const allReset = () =>{
        setMemberCount(0);
        setSportsList([]);
        setSportsInfo([]);
        setStartDate(new Date());
        setTrainerList([]);
        mapRef.current.getMap();
        dispatch({type:"resetAreaRegionSetting", payload: areaData});
        setParams({
            category : [],
            trainingArea : "",
            personCnt : 0,
            trainingTime : ""
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
        console.log(trainerId);
        dispatch({type:"setTrainerId", payload: trainerId})
    }

    const searchTrainer = async (params) => {
        const result = await matchingService.trainerSearch(params);
    }

     
    useEffect(() => {
        fetchCode();
        fetchCategoryCode();
        searchTrainer(params)
    },[params]);


    return (
        <div>
            <Header/>
            <div className={matchingStyle.body}>        
                    <div className={moduleStyle.bodySideHeight100} />
                    
                    <div className={`${matchingStyle.bodyCenter} ${matchingStyle.verticalHorizontalCenter}`} style={{display:'flex', flexDirection:'column'}} >
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
                                        setSportsList={setSportsList}
                                        sportsList={sportsList}
                                        setModalPathParam={setModalPathParam}
                                        sportsInfo={sportsInfo} 
                                        setSportsInfo={setSportsInfo}
                                        clickedSports={clickedSports} 
                                        setClickedSports={setClickedSports}
                                        setParams={setParams}
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


                        <div className={matchingStyle.memberCountSection}>
                            
                            <button className={matchingStyle.areaPickBtn}>인원 선택
                            </button>

                            <div> 
                                <button className={matchingStyle.minusBtn} onClick={memberCountMinus}>-</button>
                                <input disabled className={matchingStyle.memberCount} value={memberCount}></input>
                                <button className={matchingStyle.plusBtn} onClick={memberCountPlus}>+</button>
                            </div>

                        </div>

                        <div className={matchingStyle.timeChooseSection}>
                            
                            <button className={matchingStyle.areaPickBtn}>희망 시간
                            </button>

                            <div> 
                            <TimePicker 
                                setStartDate={setStartDate} 
                                startDate={startDate}
                                setParams={setParams}
                                />
                            </div>

                            <div className={matchingStyle.resetContainer}>
                                <button className={matchingStyle.resetBtn} onClick={allReset}>
                                    <svg className={matchingStyle.resetIcon} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 64 64">
                                    <path d="M 32 6 C 17.641 6 6 17.641 6 32 C 6 33.147 6.0844688 34.273859 6.2304688 35.380859 L 10.357422 35.865234 C 10.131422 34.608234 10 33.321 10 32 C 10 19.869 19.869 10 32 10 C 38.615909 10 44.551673 12.942341 48.587891 17.580078 L 45.505859 21.652344 L 58 22 L 54.275391 10.068359 L 51.050781 14.328125 C 46.302784 9.2111633 39.530462 6 32 6 z M 53.642578 28.134766 C 53.868578 29.391766 54 30.679 54 32 C 54 44.131 44.131 54 32 54 C 25.383867 54 19.447695 51.057454 15.412109 46.419922 L 18.494141 42.347656 L 6 42 L 9.7246094 53.931641 L 12.945312 49.675781 C 17.692812 54.79188 24.469735 58 32 58 C 46.359 58 58 46.359 58 32 C 58 30.853 57.914531 29.726141 57.769531 28.619141 L 53.642578 28.134766 z"></path>
                                    </svg>
                                </button>
                            </div>

                        </div>

                        <GymMap ref={mapRef} 
                                setTrainerList={setTrainerList} 
                                trainerList={trainerList}
                                areaRegionData={areaRegionData} 
                                setAreaRegionData={setAreaRegionData}
                                mapSwitch={mapSwitch}
                                setMapSwitch={setMapSwitch}/>

                        <div className={matchingStyle.trainerWrapper}>
                            {trainerList.length == 0 ? 
                            (<p className={matchingStyle.notMatching}>검색 결과가 없습니다.</p>)
                            : 
                            (trainerList.map((trainer, index) => (
                                <NavLink to="/matching/trainerProfile" 
                                        className={matchingStyle.trainerInput}
                                        onClick={() => setTrainerId(trainer.trainerId)}
                                        > 
                                    <div className={matchingStyle.trainerContainer} key={index}>
                                        <div className={matchingStyle.trainerPicWrapper}>
                                            <div className={matchingStyle.trainerPic}>
                                                <img src={profile} className={matchingStyle.trainerImg} >
                                                </img>
                                            </div>
                                        </div>
                                        <div>{trainer.trainerName}</div>
                                        <div>{trainer.gymName}</div>
                                    </div>
                                </NavLink>

                            )))
                            
                            }
                        </div>

                         <div className={matchingStyle.heiBlank} />
                    </div>

                </div>
        </div>
        
    );

};



export default MatchingScreen;