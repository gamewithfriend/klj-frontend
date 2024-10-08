import React from 'react';
import Header from "../template/Header";
import moduleStyle from "../style/common.module.css";
import trainerPageStyle from "../style/trainerPage.module.css";
import GymMap from './GymMap';

import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

const TrainerProfile = () => {

    const reduxTrainerId = useSelector((state) => state.trainerId);
    const navigate = useNavigate(); 
    const location = useLocation();
    const { trainer } = location.state || {}; // state에서 trainer를 가져옴


    const clickBack = () => {
        navigate(-1); // 피드 
    };

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
                                지도
                            </div>                            
                        </div>

                        <div className={trainerPageStyle.trainerExplSection}> 트레이너 설명</div>

                        <div className={trainerPageStyle.feedSection}> 피드</div>

                    </div>

                    <button onClick={clickBack}>뒤로 가기</button>

                </div>
            </div>
        </div>
    );
};

export default TrainerProfile;