import { useEffect, React, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import moduleStyle from "../style/common.module.css";
import matchingStyle from "../style/matching.module.css";
import Header from "../template/Header.js";
import Body from "../template/Body.js";
import AdressModal from '../template/AdressModal.js';
import { logout} from "../login/LoginHandler.js";
import Fetcher from '../utils/Fetcher';
import * as matchingService from "../service/matchingService.js";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

import CategoryModal from '../PTMatching/CategoryModal';

const UserTrainerProfile = () => {
    
    // dispatch 
    const dispatch = useDispatch();

    const [getEmploymentHistoryPeriod, setEmploymentHistoryPeriod] = useState('');
    const [getPhoneNumber, setPhoneNumber] = useState('');
    const [getEmail, setEmail] = useState('');
    const [getRegularExpressionEmail, setRegularExpressionEmail] = useState(false);
    const [getTrainPlace, setTrainPlace] = useState('');
    const [getTrainPlacePostcode, setTrainPlacePostcode] = useState('');
    const [getTrainPlaceDetail, setTrainPlaceDetail] = useState('');
    const [getTrainPlaceName, setTrainPlaceName] = useState('');
    
    //주소 모달 state
    const [modalOpen, setModalOpen] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [sportsList, setSportsList] = useState([]);

    //카테고리 관련 state
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    const [modalPathParam, setModalPathParam] = useState("trainer");
    const [categoryData, setCategoryData] = useState([]);
    const [sportsInfo, setSportsInfo] = useState([]);

    // 카테고리 관련 모달 제어 함수   
    const showCategoryModal = () => {
        setCategoryModalOpen(true);
        setClicked(true); 
    };

    // 카테고리 태그 ui 삭제 함수
    const deleteSports = (index) => {
        const updateList = [...sportsList];
        updateList.splice(index, 1);
        setSportsList(updateList);
    }

    // 카테고리 fetch 함수
    const fetchCategoryCode = async () => {
        const result = await matchingService.fetchCategoryCode();
        console.log(result)
        dispatch({type:"basicCategorySetting", payload: result})
        setCategoryData(result);
    }

    

    // 모달 제어 함수
    const showModal =  () => {
        setModalOpen(true);
    };

    const handleLogout = () => {
        logout();
    };

    const saveEmploymentHistoryPeriod = event => {
        setEmploymentHistoryPeriod(event.target.value);
    };

    const savePhoneNumber = event => {
        setPhoneNumber(event.target.value);
    };

    const saveEmail = event => {
        setEmail(event.target.value);   
        setRegularExpressionEmail(isValidEmail(event.target.value));
    };

    const saveTrainPlace = event => {
        setTrainPlace(event.target.value);
    };
    
    const saveTrainPlaceDetail = event => {
        setTrainPlaceDetail(event.target.value);
    };

    const saveTrainPostcode = event => {
        setTrainPlacePostcode(event.target.value);
    };

    const saveTrainPlaceName = event => {
        setTrainPlaceName(event.target.value);
    };

    const isValidEmail = (email) => {
        // 이메일 주소 유효성을 검사하기 위한 정규식
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
        return emailRegex.test(email);
    };
    
    const fetchUserTrainerApplyInfo = async () => {

        
        const fetcher = new Fetcher().setUrl("/user/trainer/applyInfo")
                                        .setMethod("GET")
                                        .setAccessToken(JSON.parse(localStorage.getItem("token")).accessToken);
        const result = await fetcher.jsonFetch();
        console.log("result :", result);
        if(result.data !=null){
            console.log(result.data.employmentHistoryPeriod)
            setEmploymentHistoryPeriod(result.data.employmentHistoryPeriod);
            setPhoneNumber(result.data.phoneNumber);
            setEmail(result.data.email);
            //이메일 정규식 체크용
            setRegularExpressionEmail(isValidEmail(result.data.email));
            setTrainPlace(result.data.trainPlace);
            setTrainPlacePostcode(result.data.trainPlacePostcode);
            setTrainPlaceDetail(result.data.trainPlaceDetail);
            setTrainPlaceName(result.data.trainPlaceName);
        }                                     
    }


    const fetchUserTrainerApply = async () => {

        if (!isValidEmail(getEmail)){
            alert("유효하지 않은 이메일 주소입니다.");
            return false;
        }
        console.log(getTrainPlacePostcode)
        console.log(sportsList)
        const data = {
            employmentHistoryPeriod: getEmploymentHistoryPeriod,
            phoneNumber: getPhoneNumber,
            email:getEmail,
            trainPlace: getTrainPlace,
            trainPlaceDetail: getTrainPlaceDetail,
            trainPlacePostcode: getTrainPlacePostcode,
            trainPlaceName: getTrainPlaceName
        };
        const fetcher = new Fetcher().setUrl("/user/trainer/apply")
                                        .setMethod("POST")
                                        .setAccessToken(JSON.parse(localStorage.getItem("token")).accessToken)
                                        .setData(JSON.stringify(data));
        const result = await fetcher.jsonFetch();
        alert("신청완료");
        window.location.reload();               
    }


    useEffect(() => {
        fetchUserTrainerApplyInfo();
        fetchCategoryCode();
    },[]);

    return (
        <div>
            <Header/>
            <div className="body" style={{display:"flex", height:"97vh",}}>        
                <div className={moduleStyle.bodySideHeight100NotBorder} >
                </div>
                <div className={moduleStyle.bodyCenterNotBorder} >
                    <div style={{height:"10%"}}>
                    </div>
                    <div style={{height:"90%", display:"flex"}}>
                        <div style={{height:"100%", width:"20%", borderRight:"solid 1px", borderColor:"#efefef" }}>
                            <div style={{height:"8%", alignContent:"center", justifyItems:"center"}}>
                                <NavLink to="/user/userProfile" className={moduleStyle.menuVarLinkBlack} >프로필</NavLink>
                            </div>
                            <div style={{height:"8%", alignContent:"center", justifyItems:"center"}}>
                                <NavLink to="/user/userTrainerProfile" className={moduleStyle.menuVarLinkBlack} >트레이너 신청</NavLink>
                            </div>
                            <div style={{height:"8%", alignContent:"center", justifyItems:"center"}}>
                                <NavLink onClick={handleLogout} to="/" className={moduleStyle.menuVarLinkBlack} >로그아웃</NavLink>
                            </div>
                            <div style={{height:"10%"}}>
                            </div>
                        </div>
                        <div style={{width:"80%"}}>
                            <div style={{width:"100%"}}>
                                <div style={{height:"20vh", width:"100%", alignContent:"center", textAlign:"center"}}>
                                    트레이너 신청
                                </div>
                                <div style={{height:"5vh", width:"100%", marginLeft:"5%"}}>
                                    <div style={{height:"100%", width:"20%", alignContent:"center"}}>
                                        경력기간
                                    </div>
                                </div>
                                <div style={{height:"10vh", width:"100%", marginLeft:"5%"}}>
                                    <input 
                                    className={moduleStyle.inputBottomBorderStyle}
                                    style={{height:"40%", width:"40%"}}
                                    value={getEmploymentHistoryPeriod}
                                    onChange={saveEmploymentHistoryPeriod}
                                    >   
                                    </input>
                                </div>
                                <div style={{height:"5vh", width:"100%", marginLeft:"5%"}}>
                                    <div style={{height:"100%", width:"20%", alignContent:"center"}}>
                                        전화번호
                                    </div>
                                </div>
                                <div style={{height:"10vh", width:"100%", marginLeft:"5%"}}>
                                    <input 
                                    className={moduleStyle.inputBottomBorderStyle}
                                    style={{height:"40%", width:"40%"}}
                                    value={getPhoneNumber}
                                    onChange={savePhoneNumber}
                                    ></input>
                                </div>
                                <div style={{height:"5vh", width:"100%", marginLeft:"5%"}}>
                                    <div style={{height:"100%", width:"20%", alignContent:"center"}}>
                                        이메일
                                    </div>
                                </div>
                                <div style={{height:"10vh", width:"100%", marginLeft:"5%"}}>
                                    <input 
                                    className={moduleStyle.inputBottomBorderStyle}
                                    style={{height:"40%", width:"40%"}}
                                    value={getEmail}
                                    onChange={saveEmail}
                                    ></input>
                                    {getRegularExpressionEmail === true ?
                                    <p style={{margin:"0"}}></p>
                                    :
                                    <p style={{margin:"0", color:"red", opacity:"0.4"}}>유효하지 않은 이메일입니다.</p>
                                    }
                                </div>
                                <div style={{height:"5vh", width:"100%", marginLeft:"5%"}}>
                                    <div style={{height:"100%", width:"20%", alignContent:"center"}}>
                                        트레이닝 장소
                                    </div>
                                </div>
                                <div style={{height:"10vh", width:"100%", marginLeft:"5%"}}>
                                    <input 
                                    className={moduleStyle.inputBottomBorderStyle}
                                    style={{height:"40%", width:"30%"}}
                                    value={getTrainPlacePostcode}
                                    onChange={saveTrainPostcode}
                                    ></input>
                                    <button style={{marginLeft:"3%"}} onClick={showModal} >
                                        주소찾기
                                    </button>
                                    {modalOpen && <AdressModal  
                                    setModalOpen={setModalOpen} 
                                    setTrainPlace={setTrainPlace} 
                                    setTrainPlacePostcode={setTrainPlacePostcode}
                                    /> }   
                                </div>
                                <div style={{height:"10vh", width:"100%", marginLeft:"5%"}}>
                                    <input 
                                    className={moduleStyle.inputBottomBorderStyle}
                                    value={getTrainPlace}
                                    onChange={saveTrainPlace}
                                    style={{height:"40%", width:"40%"}}
                                    ></input>  
                                </div>
                                <div style={{height:"10vh", width:"100%", marginLeft:"5%"}}>
                                    <input 
                                    className={moduleStyle.inputBottomBorderStyle}
                                    value={getTrainPlaceDetail}
                                    onChange={saveTrainPlaceDetail}
                                    style={{height:"40%", width:"40%"}}
                                    ></input>  
                                </div>
                                <div style={{height:"5vh", width:"100%", marginLeft:"5%"}}>
                                    <div style={{height:"100%", width:"20%", alignContent:"center"}}>
                                        트레이닝장소이름
                                    </div>
                                </div>
                                <div style={{height:"10vh", width:"100%", marginLeft:"5%"}}>
                                    <input 
                                    className={moduleStyle.inputBottomBorderStyle}
                                    value={getTrainPlaceName}
                                    onChange={saveTrainPlaceName}
                                    style={{height:"40%", width:"40%"}}
                                    ></input>  
                                </div>
                                <div style={{height:"13vh", width:"100%", marginLeft:"5%"}}>
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
                                                setModalPathParam={modalPathParam}
                                                sportsInfo={sportsInfo} 
                                                setSportsInfo={setSportsInfo}
                                            />}
                                        
                                    </div>
                                    <div className={matchingStyle.categoryTrainer}>
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
                                <div style={{height:"5vh", width:"100%", marginLeft:"5%"}}>
                                    <div style={{height:"100%", width:"20%", alignContent:"center"}}>
                                        참고자료
                                    </div>
                                </div>
                                <div style={{height:"10vh", width:"100%", marginLeft:"5%"}}>
                                    <input type="file"></input>
                                </div>
                            </div>
                            <div style={{height:"20vh", width:"100%", alignContent:"center", textAlign:"center"}}>
                                <button style={{marginTop:"5vh"}} onClick={fetchUserTrainerApply}>
                                    신청
                                </button>
                            </div>
                        </div> 
                    </div>    
                </div>
                <div className={moduleStyle.bodySideHeight100NotBorder} >
                </div>      
            </div>
        </div>
    );
};

export default UserTrainerProfile;