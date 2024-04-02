import React, {useState, useEffect} from 'react';
import matchingModalStyle from "../style/matchingModal.module.css"
import { useSelector, useDispatch } from "react-redux";
import Fetcher from '../utils/Fetcher';

const AreaModal = () => {

    const reduxAreaInfo = useSelector((state) => state.getArea);
    const reduxRegionInfo = useSelector((state) => state.getRegion);
    const [regionData, setRegionData] = useState([]);
    const dispatch = useDispatch();


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
      console.log(result.data);
      
    }
  
    return (
        <div className={matchingModalStyle.modalContainer}>
            <div className="modal-content">
              <p>지역 선택</p>
                <div className={matchingModalStyle.areaBtnArea}>

                  <div className={matchingModalStyle.areaBtnContainer}>
                    {reduxAreaInfo.areaList.data.map((area) => (
                      <button onClick={() => fetchRegionCode(area.id)} className={matchingModalStyle.areaBtn} key={area.id}>{area.name}</button>
                    ))}
                  </div>

                </div>
               
            </div>
        </div>
    );
};

export default AreaModal;