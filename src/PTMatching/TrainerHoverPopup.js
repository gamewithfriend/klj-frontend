import React from 'react';
import ReactDOM from 'react-dom'
import matchingStyle from "../style/matching.module.css";
import profile from '../assets/image/profile.png';
import matchingModalStyle from "../style/matchingModal.module.css"
import { useSelector, useDispatch } from "react-redux";

const TrainerHoverPopup = ({trainer}) => {

    const reduxTrainerId = useSelector((state) => state.trainerId);

    return (
        <div>
            <div className={matchingStyle.trainerPopupContainer}>
                
                <div className={matchingStyle.trainerInfoArea}>
                    <div className={matchingStyle.trainerPicWrapper}>
                        <div className={matchingStyle.trainerPic}>
                            <img src={profile} className={matchingStyle.trainerImg} >
                            </img>
                        </div>
                    </div>
                    <p>트레이너명 : {trainer.trainerName}</p>
                    <p>트레이닝 장소 : {trainer.gymName}</p>
                </div>

                <div className={matchingStyle.introAndBtnContainer}>
                    <textarea className={matchingStyle.introArea}>
                        트레이너 소개
                    </textarea>
                </div>




            </div>

        </div>
    );
};

export default TrainerHoverPopup;