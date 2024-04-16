import { useEffect, React, useState } from "react";
import { NavLink } from "react-router-dom";


import moduleStyle from "../style/common.module.css";
import Header from "../template/Header.js";
import Body from "../template/Body.js";
import AdressModal from '../template/AdressModal.js';
import { logout} from "../login/LoginHandler.js";
import Fetcher from '../utils/Fetcher';

const UserTrainerProfile = () => {
    
    const [getEmploymentHistoryPeriod, setEmploymentHistoryPeriod] = useState('');
    const [getPhoneNumber, setPhoneNumber] = useState('');
    const [getEmail, setEmail] = useState('');
    const [getRegularExpressionEmail, setRegularExpressionEmail] = useState(false);
    const [getTrainPlace, setTrainPlace] = useState('');
    const [getTrainPlacePostcode, setTrainPlacePostcode] = useState('');
    const [getTrainPlaceDetail, setTrainPlaceDetail] = useState('');
    //주소 모달 state
    const [modalOpen, setModalOpen] = useState(false);

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

    const saveTrainPostcode = event => {
        setTrainPlacePostcode(event.target.value);
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
        }                                     
    }


    const fetchUserTrainerApply = async () => {

        if (!isValidEmail(getEmail)){
            alert("유효하지 않은 이메일 주소입니다.");
            return false;
        }
        console.log(getTrainPlacePostcode)
        const data = {
            employmentHistoryPeriod: getEmploymentHistoryPeriod,
            phoneNumber: getPhoneNumber,
            email:getEmail,
            trainPlace: getTrainPlace,
            trainPlaceDetail: getTrainPlaceDetail,
            trainPlacePostcode: getTrainPlacePostcode
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
                                    style={{height:"40%", width:"40%"}}
                                    ></input>  
                                </div>
                                <div style={{height:"10vh", width:"100%", marginLeft:"5%"}}>
                                    <input 
                                    className={moduleStyle.inputBottomBorderStyle}
                                    value={getTrainPlaceDetail}
                                    style={{height:"40%", width:"40%"}}
                                    ></input>  
                                </div>
                                <div style={{height:"5vh", width:"100%", marginLeft:"5%"}}>
                                    <div style={{height:"100%", width:"20%", alignContent:"center"}}>
                                        카테고리
                                    </div>
                                </div>
                                <div style={{height:"10vh", width:"100%", marginLeft:"5%"}}>
                                    <input 
                                    className={moduleStyle.inputBottomBorderStyle}
                                    style={{height:"40%", width:"40%"}}
                                    value={getTrainPlace}
                                    onChange={saveTrainPlace}
                                    ></input>
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