import React, {useState, useEffect} from 'react';
import Modal from 'react-modal';
import Header from "../template/Header";
import moduleStyle from "../style/common.module.css";
import matchingStyle from "../style/matching.module.css"
import profile from '../assets/image/profile.png';
import AreaModal from './AreaModal';
import Fetcher from '../utils/Fetcher';
import { useSelector, useDispatch } from "react-redux";


const MatchingScreen = () => {

    const [modalOpen, setModalOpen] = useState(false);
    const [areaData, setAreaData] = useState([]);
    const dispatch = useDispatch();

    const showModal = () => {
        setModalOpen(true);
    };

    const fetchCode = async () => {
        const data = {
            id: "region",
            name : "test"
        };
    
        const fetcher = new Fetcher().setUrl("/search/area")
                                        .setMethod("POST")
                                        .setData(JSON.stringify(data));
        const result = await fetcher.jsonFetch();
        dispatch({type:"basicAreaSetting", payload: result})
        setAreaData(result);
    }
    
    useEffect(() => {
        fetchCode();
    },[]);

    return (
        <div>
            <Header/>
            <div className="body" style={{display:"flex", height:"100%",}}>        
                    <div className={moduleStyle.bodySideHeight100} />
                    
                    <div className={`${moduleStyle.bodyCenter} ${moduleStyle.verticalHorizontalCenter}`} style={{display:'flex', flexDirection:'column'}} >
                        <div className={matchingStyle.blank}></div>
                        
                        <div className={matchingStyle.category}>
                            <select>
                                <option value="">헬스</option>
                                <option value="">필라테스</option>
                                <option value="">크로스핏</option>
                            </select>
                        </div>

                        <div className={matchingStyle.area}>
                            <button onClick={showModal}>지역 선택
                            </button>
                            {modalOpen && <AreaModal setModalOpen={setModalOpen}/> }
                            <div> 선택한 지역 여기에</div>
                        </div>

                        <div class className={matchingStyle.trainerWrapper}>
                            <div className={matchingStyle.trainerContainer}>
                                <div className={matchingStyle.trainerPicWrapper}>
                                <div className={matchingStyle.trainerPic}>
                                    <img src={profile} className={matchingStyle.trainerImg} >
                                    </img>
                                </div>
                                </div>
                                <div>김피티</div>
                                <div>삼두짐</div>
                            </div>
                            
                            <div className={matchingStyle.trainerContainer}>
                                <div className={matchingStyle.trainerPicWrapper}>
                                <div className={matchingStyle.trainerPic}>
                                    <img src={profile} className={matchingStyle.trainerImg} >
                                    </img>
                                </div>
                                </div>
                                <div>김피티</div>
                                <div>삼두짐</div>
                            </div>

                            <div className={matchingStyle.trainerContainer}>
                                <div className={matchingStyle.trainerPicWrapper}>
                                <div className={matchingStyle.trainerPic}>
                                    <img src={profile} className={matchingStyle.trainerImg} >
                                    </img>
                                </div>
                                </div>
                                <div>김피티</div>
                                <div>삼두짐</div>
                            </div>

                        </div>
                        
                    </div>

                    <div className={moduleStyle.bodySideHeight100} />
                </div>
        </div>

        
    );

};



export default MatchingScreen;