import React, { useEffect, useState } from 'react';
import Header from "../template/Header";
import TrainerDetail from "../trainer/TrainerProfileDetail";
import TrainerSchedule from "../trainer/TrainerSchedule";
import moduleStyle from "../style/common.module.css";
import trainerPageStyle from "../style/trainerPage.module.css";

const TrainerProfile = () => {


    const [getComponet, setComponet] = useState(<TrainerDetail/>);

    const clickNavi = (menuNum) => {
        switch (menuNum){
            case 1:
                setComponet(<TrainerDetail/>)
                break;
            case 2:    
                setComponet(<TrainerSchedule/>)
                break;
        }
    };
    

    useEffect(() => {

    },[])

    return (
        <div>
            <Header/>
            <div className={trainerPageStyle.body}>        
                <div className={moduleStyle.bodySideHeight100} />
                <div className={`${trainerPageStyle.bodyCenter} ${trainerPageStyle.verticalHorizontalCenter}`} style={{display:'flex', flexDirection:'column'}} >
                        
                    <div className={trainerPageStyle.blank}></div>
                    <div className={trainerPageStyle.trainerTopContainer}> 
                    </div>
                    <div className={trainerPageStyle.trainerMenuNavi}>  
                        <div className={trainerPageStyle.trainerMenuContainer} onClick={() => clickNavi(1)}>
                            프로필
                        </div>
                        <div className={trainerPageStyle.trainerMenuContainer} onClick={() => clickNavi(2)}>
                            스케줄
                        </div>
                    </div>
                    <div className={trainerPageStyle.trainerProfileContainer}>                       
                        {getComponet}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrainerProfile;