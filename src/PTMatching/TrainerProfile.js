import React from 'react';
import { useSelector, useDispatch } from "react-redux";

const TrainerProfile = () => {

    const reduxTrainerId = useSelector((state) => state.trainerId);
    
    return (
        <div>
            <p>트레이너 페이지</p>
            <p>{reduxTrainerId.trainerId}</p>
        </div>
    );
};

export default TrainerProfile;