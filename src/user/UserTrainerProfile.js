import { useEffect, React, useState } from "react";
import { NavLink } from "react-router-dom";

import moduleStyle from "../style/common.module.css";
import Header from "../template/Header.js";
import Body from "../template/Body.js";
import { logout} from "../login/LoginHandler.js";
import Fetcher from '../utils/Fetcher';

const UserTrainerProfile = () => {
    const [getEmploymentHistoryPeriod, setEmploymentHistoryPeriod] = useState('');
    const [getPhoneNumber, setPhoneNumber] = useState('');
    const [getEmail, setEmail] = useState('');
    const [getTrainPlace, setTrainPlace] = useState('');

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
    };

    const saveTrainPlace = event => {
        setTrainPlace(event.target.value);
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
            setTrainPlace(result.data.trainPlace);
        }                                     
    }


    const fetchUserTrainerApply = async () => {
        const data = {
            employmentHistoryPeriod: getEmploymentHistoryPeriod,
            phoneNumber: getPhoneNumber,
            email:getEmail,
            trainPlace: getTrainPlace
        };
        const fetcher = new Fetcher().setUrl("/user/trainer/apply")
                                        .setMethod("POST")
                                        .setAccessToken(JSON.parse(localStorage.getItem("token")).accessToken)
                                        .setData(JSON.stringify(data));
        const result = await fetcher.jsonFetch();
        console.log("result :", result);                             
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
                        <div style={{height:"100%", width:"80%"}}>
                            <div style={{height:"80%", width:"100%"}}>
                                <div style={{height:"10%", width:"100%", alignContent:"center", textAlign:"center"}}>
                                    트레이너 신청
                                </div>
                                <div style={{height:"10%", width:"100%"}}>
                                </div>
                                <div style={{height:"10%", width:"100%", marginLeft:"5%"}}>
                                    <div style={{height:"100%", width:"20%", alignContent:"center"}}>
                                        경력기간
                                    </div>
                                </div>
                                <div style={{height:"10%", width:"100%", marginLeft:"5%"}}>
                                    <input style={{height:"40%", width:"70%"}}
                                    value={getEmploymentHistoryPeriod}
                                    onChange={saveEmploymentHistoryPeriod}
                                    >   
                                    </input>
                                </div>
                                <div style={{height:"10%", width:"100%", marginLeft:"5%"}}>
                                    <div style={{height:"100%", width:"20%", alignContent:"center"}}>
                                        전화번호
                                    </div>
                                </div>
                                <div style={{height:"10%", width:"100%", marginLeft:"5%"}}>
                                    <input style={{height:"40%", width:"70%"}}
                                    value={getPhoneNumber}
                                    onChange={savePhoneNumber}
                                    ></input>
                                </div>
                                <div style={{height:"10%", width:"100%", marginLeft:"5%"}}>
                                    <div style={{height:"100%", width:"20%", alignContent:"center"}}>
                                        이메일
                                    </div>
                                </div>
                                <div style={{height:"10%", width:"100%", marginLeft:"5%"}}>
                                    <input style={{height:"40%", width:"70%"}}
                                    value={getEmail}
                                    onChange={saveEmail}
                                    ></input>
                                </div>
                                <div style={{height:"10%", width:"100%", marginLeft:"5%"}}>
                                    <div style={{height:"100%", width:"20%", alignContent:"center"}}>
                                        트레이닝 장소
                                    </div>
                                </div>
                                <div style={{height:"10%", width:"100%", marginLeft:"5%"}}>
                                    <input style={{height:"40%", width:"70%"}}
                                    value={getTrainPlace}
                                    onChange={saveTrainPlace}
                                    ></input>
                                </div>
                                <div style={{height:"10%", width:"100%", marginLeft:"5%"}}>
                                    <div style={{height:"100%", width:"20%", alignContent:"center"}}>
                                        참고자료
                                    </div>
                                </div>
                                <div style={{height:"10%", width:"100%", marginLeft:"5%"}}>
                                    <input type="file"></input>
                                </div>
                            </div>
                            <div style={{height:"20%", width:"100%", alignContent:"center", textAlign:"center"}}>
                                <button style={{}} onClick={fetchUserTrainerApply}>
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