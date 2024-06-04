import React, { useState, useEffect, forwardRef, useImperativeHandle} from 'react';
import { useSelector, useDispatch } from "react-redux";
import * as matchingService from "../service/matchingService.js";
import { Map } from "react-kakao-maps-sdk"

const GymMap = forwardRef((props, mapRef) => {

  const [map, setMap] = useState();
  const reduxAreaRegionInfo = useSelector((state) => state.getAreaUserWant);
  const KAKAO_MAP_KEY = process.env.REACT_APP_KAKAO_MAP_KEY;
  const [gymList, setGymList] = useState([]);
  const [bounds, setBounds] = useState();

  const getGymList = async () => {
    const result = await matchingService.getGymList();
    setGymList(result);
  }

  const getMap = () => {
    window.kakao.maps.load(() => {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
        level: 5,
      };
      const map = new window.kakao.maps.Map(container, options);
      setMap(map);
    });
  }

  const getGymInfoInMap = () => {
    
    var sw = new window.kakao.maps.LatLng(bounds.qa, bounds.ha);
    var ne = new window.kakao.maps.LatLng(bounds.pa, bounds.oa);
    var lb = new window.kakao.maps.LatLngBounds(sw, ne);
    // var l1 = new window.kakao.maps.LatLng(37.562, 126.96)
    const geocoder = new window.kakao.maps.services.Geocoder();
    gymList.data.forEach(gym => {
      geocoder.addressSearch(gym.address, function(result, status) {
        if (status === window.kakao.maps.services.Status.OK) {
          var coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
        }
        console.log(lb.contain(coords))
      });

    })

    // console.log(lb.contain(l1))
  }



  useImperativeHandle(mapRef, () => ({
    getMap,
  }));

  useEffect(() => {
    getGymList();
    const script = document.createElement("script");
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_KEY}&libraries=services&autoload=false`;
    document.head.appendChild(script);

    script.addEventListener("load", () => {
      getMap();
    }, []);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (map && gymList.data) {
      const locateGymList = () => {
        const geocoder = new window.kakao.maps.services.Geocoder();
        gymList.data.forEach(gym => {
          geocoder.addressSearch(gym.address, function(result, status) {
            if (status === window.kakao.maps.services.Status.OK) {
              var coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
              var marker = new window.kakao.maps.Marker({
                map: map,
                position: coords
              });
              
              //  var infowindow = new window.kakao.maps.InfoWindow({
              //     content: gym.gymName
              //   });
              //   infowindow.open(map, marker);
            }
          });
        });
      };
      locateGymList();
    }
  }, [map, gymList]);

  useEffect(() => {
    if (map) {
      const moveArea = () => {
        const geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.addressSearch(`${reduxAreaRegionInfo.area} ${reduxAreaRegionInfo.region}`, function(result, status){
          if (status === window.kakao.maps.services.Status.OK) {
            var coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
            map.setCenter(coords);
          }
        });
      };
      moveArea();
    }
    
  }, [reduxAreaRegionInfo, map]);

  return (
    <div>
      <Map 
        id="map" 
        center={{
          // 지도의 중심좌표
          lat: 33.450701,
          lng: 126.570667,
        }} 
        style={{
          width:'52rem',
          height:'20rem'        
        }}
        level={3}
        onDragEnd={(map) => {
          setBounds(map.getBounds());
        }}
      />
    </div>
  );
});

export default GymMap;
