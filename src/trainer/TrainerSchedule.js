import React, { useEffect, useState } from 'react';
import Header from "../template/Header";
import TrainerDetail from "./TrainerProfileDetail";
import moduleStyle from "../style/common.module.css";
import trainerPageStyle from "../style/trainerPage.module.css";

const TrainerSchedule = () => {


    const [getComponet, setComponet] = useState(<TrainerDetail/>);

    

    useEffect(() => {

    },[])

    return (
        <div>
            <h3>스케줄</h3>
        </div>
    );
};

export default TrainerSchedule;