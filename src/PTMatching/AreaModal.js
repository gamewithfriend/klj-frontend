import React, {useState, useEffect} from 'react';
import matchingModalStyle from "../style/matchingModal.module.css"
import { useSelector, useDispatch } from "react-redux";
import Fetcher from '../utils/Fetcher';

const AreaModal = ({setModalOpen}) => {

    const reduxAreaInfo = useSelector((state) => state.getArea);
    const reduxRegionInfo = useSelector((state) => state.getRegion);
    const dispatch = useDispatch();
    const [areaName, setAreaName] = useState("");
    const [regionName, setRegionName] = useState("");


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
      console.log(areaName);
    }

    const regionPick = (regionName) => {
      console.log(regionName);
    }

    const areaData = {
      Area : areaName,
      region : regionName
    }
    
    return (
        <div className={matchingModalStyle.modalContainer}>
            <div className="modal-content">

              <div className={matchingModalStyle.selectAreaTitle}>
                <p>지역 선택</p>
                <button className={matchingModalStyle.closeBtn} onClick={closeModal}>X</button>
              </div>
              
                <div className={matchingModalStyle.areaBtnArea}>

                  <div className={matchingModalStyle.areaBtnContainer}>
                    {reduxAreaInfo.areaList.data.map((area) => (
                      <button onClick={() => {fetchRegionCode(area.id); areaPick(area.name);}} className={matchingModalStyle.areaBtn} key={area.id}>{area.name}</button>
                    ))}
                  </div>

                  <div>
                  {reduxRegionInfo && reduxRegionInfo.regionList && reduxRegionInfo.regionList.data ? (
                      <div className={matchingModalStyle.areaBtnContainer}> 
                          {reduxRegionInfo.regionList.data.map((region) => (
                              <button onClick={() => {regionPick(region.name); closeModal()}} className={matchingModalStyle.areaBtn} key={region.id}>{region.name}</button>
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