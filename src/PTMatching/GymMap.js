import React, { useState, useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Map, MapMarker } from "react-kakao-maps-sdk";

const { kakao } = window;

const GymMap = () => {

    const reduxAreaRegionInfo = useSelector((state) => state.getAreaUserWant);
    const KAKAO_MAP_KEY = process.env.REACT_APP_KAKAO_MAP_KEY;
    
    useEffect(() => {

        const script = document.createElement("script");
        script.async = true;
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_KEY}&autoload=false`;
        document.head.appendChild(script);

        script.addEventListener("load", () => {
            window.kakao.maps.load(() => {
              const container = document.getElementById("map");
              const options = {
                center: new window.kakao.maps.LatLng(37.566826, 126.9786567), // 초기 중심 좌표 (위도, 경도)
                level: 3, // 지도 확대 레벨
              };
              new window.kakao.maps.Map(container, options);
            });
          });

    },[]);

    return (
        <div>
            <div id="map" style={{width:'500px',height:'400px'}}>
        
            </div>

        </div>
    );
};

export default GymMap;

