import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

const TrainerProfile = () => {

    const reduxTrainerId = useSelector((state) => state.trainerId);
    const navigate = useNavigate(); 
    const clickBack = () => {
        navigate(-1); // 피드 
    };

    return (
        <div>
            <p>트레이너 페이지</p>
            <p>{reduxTrainerId.trainerId}</p>
            <button onClick={clickBack}>뒤로 가기</button>
        </div>
    );
};

export default TrainerProfile;