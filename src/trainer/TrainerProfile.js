import React, { useEffect, useState } from 'react';
import Header from "../template/Header";
import moduleStyle from "../style/common.module.css";
import trainerPageStyle from "../style/trainerPage.module.css";
import { StaticMap } from "react-kakao-maps-sdk"

import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

const TrainerProfile = () => {

    const reduxTrainerId = useSelector((state) => state.trainerId);
    const navigate = useNavigate(); 
    const location = useLocation();
    const { trainer } = location.state || {}; // state에서 trainer를 가져옴
    const [lati, setLati] = useState();
    const [long, setLong] = useState();

    const setLatLng = () => {
        const geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.addressSearch(trainer.address, function(result, status) {
            setLati(result[0].y);
            setLong(result[0].x);
        });
    }

    const clickBack = () => {
        navigate(-1); // 피드 
    };

    useEffect(() => {
        setLatLng()
    },[])

    return (
        <div>
            <Header/>
            <div className={trainerPageStyle.body}>        
                <div className={moduleStyle.bodySideHeight100} />
                <div className={`${trainerPageStyle.bodyCenter} ${trainerPageStyle.verticalHorizontalCenter}`} style={{display:'flex', flexDirection:'column'}} >
                        
                    <div className={trainerPageStyle.blank}></div>

                    <div className={trainerPageStyle.trainerProfileContainer}>
                        
                        <div className={trainerPageStyle.trainerInfoSection}>
                            <div>
                                <div> 트레이너 사진</div>
                                <div>{trainer.trainerName}</div>
                                <div>{trainer.gymName}</div>
                            </div>

                            <div>
                            <StaticMap 
                                center={{
                                    lat : lati,
                                    lng : long
                                }}
                                marker={{
                                    lat: lati,
                                    lng: long
                                }}
                                id="map" 
                                style={{
                                width:'20rem',
                                height:'20rem'        
                                }}
                                level={5}
                            />
                            </div>                            
                        </div>

                        <div className={trainerPageStyle.trainerExplSection}> 
                            <textarea className={trainerPageStyle.trainerExpl} readOnly>
                            트레이너 설명

                                
                            </textarea>
                        </div>

                        <div className={trainerPageStyle.feedSection}> 피드</div>

                    </div>

                    <button onClick={clickBack}>뒤로 가기</button>

                </div>
            </div>
        </div>
    );
};

export default TrainerProfile;