import {React, useState, useEffect} from 'react';
import Fetcher from '../utils/Fetcher';
import Modal from 'react-modal';
import Header from "../template/Header";
import moduleStyle from "../style/common.module.css";
import matchingStyle from "../style/matching.module.css"
import profile from '../assets/image/profile.png';
import AreaModal from './AreaModal';

const MatchingScreen = () => {

    const [modalOpen, setModalOpen] = useState(false);

    const toggleModal = () => {
      setModalOpen(!modalOpen);
    };

    const fetchCode = async () => {
        
        const data = {
            id: "region"
        };
        
        const fetcher = new Fetcher().setUrl("/search/area")
                                        .setMethod("POST")
                                        .setData(JSON.stringify(data));
        const result = await fetcher.jsonFetch();
        console.log("result :", result);                             
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
                            {/* <select>
                                <option value="seoul">서울</option>
                                <option value="incheon">인천, 경기</option>
                                <option value="chungcheong">충청도</option>
                                <option value="jeonla">전라도</option>
                                <option value="gyeongsang">경상도</option>
                                <option value="gangwon">강원도</option>
                            </select> */}
                            <button onClick={toggleModal}>지역</button>
                            {modalOpen && 
                                <AreaModal/>
                            }
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