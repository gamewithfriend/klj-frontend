import React, {useState, useEffect} from 'react';
import matchingModalStyle from "../style/matchingModal.module.css"
import { useSelector, useDispatch } from "react-redux";
import Fetcher from '../utils/Fetcher';

const AreaModal = ({setModalOpen}) => {

    const reduxAreaInfo = useSelector((state) => state.getArea);
    const reduxRegionInfo = useSelector((state) => state.getRegion);
    const dispatch = useDispatch();
    const [areaRegionData, setAreaRegionData] = useState({
      area: "",
      region: ""
    });
    
    const fetchRegionCode = async (regionCode) => {
      
      const data = {
        id: regionCode,
        name : "test"
      };

      const fetcher = new Fetcher().setUrl("/search/area")
                                      .setMethod("POST")
                                      .setData(JSON.stringify(data));
      const result = await fetcher.jsonFetch();
      dispatch({type:"basicRegionSetting", payload: result})
    }

    const closeModal = () => {
      setModalOpen(false);
    };

    const areaPick = (areaName) => {
      const updatedData = { ...areaRegionData, area: areaName };
      setAreaRegionData(updatedData);
      
      if (areaName === "세종특별자치시") {
        closeModal();
        dispatch({ type: "setAreaUserWant", payload: updatedData });
      }
    }

    const regionPick = (regionName) => {
      const updatedData = { ...areaRegionData, region: regionName };
      setAreaRegionData(updatedData);
      dispatch({ type: "setAreaUserWant", payload: updatedData });
  };

    return (
        <div className={matchingModalStyle.modalContainer}>
            <div className="modal-content">

              <div className={matchingModalStyle.selectAreaTitle}>
                <p className={matchingModalStyle.selectAreaHeader}>지역 선택</p>
                <button className={matchingModalStyle.closeBtn} onClick={closeModal}>X</button>
              </div>
              
                <div className={matchingModalStyle.areaBtnArea}>

                  <div className={matchingModalStyle.areaBtnContainer}>
                    <p className={matchingModalStyle.areaTitle}>지역</p>
                    {reduxAreaInfo.areaList.data.map((area) => (
                      <button className={matchingModalStyle.areaBtn} onClick={() => {fetchRegionCode(area.id); areaPick(area.name);  }} key={area.id}>{area.name}</button>
                      ))}
                  </div>

                  <div className={matchingModalStyle.regionBtnContainer}>
                    <p className={matchingModalStyle.regionTitle}>상세 지역</p>
                    {reduxRegionInfo && reduxRegionInfo.regionList && reduxRegionInfo.regionList.data ? (
                        <div className={matchingModalStyle.regionBtnContainer}> 
                            {reduxRegionInfo.regionList.data.map((region) => (
                                <button className={`${matchingModalStyle.regionBtn}`} onClick={() => {regionPick(region.name); closeModal() }} className={matchingModalStyle.areaBtn} key={region.id}>{region.name}</button>
                            ))}
                        </div>
                    ) : (
                        <div></div>
                    )}
                  </div>



                </div>
               
            </div>
        </div>
    );
};

export default AreaModal;