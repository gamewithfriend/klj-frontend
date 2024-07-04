import React, {useState, useEffect} from 'react';
import matchingModalStyle from "../style/matchingModal.module.css"
import { useSelector, useDispatch } from "react-redux";
import Fetcher from '../utils/Fetcher';
import * as matchingService from "../service/matchingService.js";

const AreaModal = ({setModalOpen, areaRegionData, setAreaRegionData, setMapSwitch, setParams}) => {

    const reduxAreaInfo = useSelector((state) => state.getArea);
    const reduxRegionInfo = useSelector((state) => state.getRegion);
    const dispatch = useDispatch();
    
    const fetchRegionCode = async (regionCode) => {
      const result = await matchingService.fetchRegionCode(regionCode);
      dispatch({type:"basicRegionSetting", payload: result})
    }

    const closeModal = () => {
      setModalOpen(false);
    };

    const areaPick = (areaParam) => {
      const updatedData = { area: areaParam.name, region : "" };
      setAreaRegionData(updatedData);
      
      if (areaParam.name === "세종특별자치시") {

        setParams(prevParams => {
            return {
                ...prevParams,
                trainingArea: areaParam.id
            };
        });

        closeModal();
        dispatch({ type: "setAreaUserWant", payload: updatedData });
        
      }
    }

    const regionPick = (region) => {

      setMapSwitch(true)
      const updatedData = { ...areaRegionData, region: region.name };
      setAreaRegionData(updatedData);
      dispatch({ type: "setAreaUserWant", payload: updatedData });

      setParams(prevParams => {
        return {
            ...prevParams,
            trainingArea: region.id
        };
    });
      
  };

    return (
      <div>
        <button className={matchingModalStyle.layer} onClick={()=>closeModal()}></button>
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
                      <button className={matchingModalStyle.areaBtn} onClick={() => {fetchRegionCode(area.id); areaPick(area);  }} key={area.id}>{area.name}</button>
                      ))}
                  </div>

                  <div className={matchingModalStyle.regionBtnContainer}>
                    <p className={matchingModalStyle.regionTitle}>상세 지역</p>
                    {reduxRegionInfo && reduxRegionInfo.regionList && reduxRegionInfo.regionList.data ? (
                        <div className={matchingModalStyle.regionBtnContainer}> 
                            {reduxRegionInfo.regionList.data.map((region) => (
                                <button className={`${matchingModalStyle.regionBtn} ${matchingModalStyle.areaBtn}`} onClick={() => {regionPick(region); closeModal() }} key={region.id}>{region.name}</button>
                            ))}
                        </div>
                    ) : (
                        <div></div>
                    )}
                  </div>



                </div>
               
            </div>
        </div>
        </div>
    );
};

export default AreaModal;