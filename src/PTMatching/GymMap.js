import React, { useState, useEffect, forwardRef, useImperativeHandle} from 'react';
import { useSelector, useDispatch } from "react-redux";
import * as matchingService from "../service/matchingService.js";
import { Map } from "react-kakao-maps-sdk"

const GymMap = forwardRef(({setTrainerList, areaRegionData, setAreaRegionData, mapSwitch, setMapSwitch}, mapRef) => {

  const [map, setMap] = useState();
  const reduxAreaRegionInfo = useSelector((state) => state.getAreaUserWant);
  const KAKAO_MAP_KEY = process.env.REACT_APP_KAKAO_MAP_KEY;
  const [gymList, setGymList] = useState([]);
  const [bounds, setBounds] = useState();
  const dispatch = useDispatch();

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

  function searchAddrFromCoords(coords, callback) {
    // 좌표로 행정동 주소 정보를 요청합니다
    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);         
  }

  function displayCenterInfo(result, status) {
    if (status === window.kakao.maps.services.Status.OK) {
        for(var i = 0; i < result.length; i++) {
            // 행정동의 region_type 값은 'H' 이므로
            if (result[i].region_type === 'H') {
                const dragArea = {
                  area : result[i].address_name.split(" ")[0],
                  region : result[i].address_name.split(" ")[1]
                }
                  dispatch({ type: "setAreaUserWant", payload: dragArea });
                break;
            }
        }
    }    
  }

  useEffect(() => {
    if (map) {
      const handleDragEnd = () => {
        setBounds(map.getBounds());
        const bounds = map.getBounds();
        const sw = new window.kakao.maps.LatLng(bounds.qa, bounds.ha);
        const ne = new window.kakao.maps.LatLng(bounds.pa, bounds.oa);
        const lb = new window.kakao.maps.LatLngBounds(sw, ne);
        const geocoder = new window.kakao.maps.services.Geocoder();

        searchAddrFromCoords(map.getCenter(), displayCenterInfo);

        gymList.data.forEach(gym => {

          let trainerInfo = {
            trainerName: gym.trainerName,
            gymAddress: gym.address,
            gymName: gym.gymName
          };
        
          geocoder.addressSearch(gym.address, function(result, status) {

            if (status === window.kakao.maps.services.Status.OK) {
              const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
              setTrainerList(prevTrainerList => {
                // 지도 경계 내에 있는 경우 추가
                if (lb.contain(coords)) {
                  const isDuplicate = prevTrainerList.some(trainer =>
                    trainer.trainerName === trainerInfo.trainerName &&
                    trainer.gymAddress === trainerInfo.gymAddress &&
                    trainer.gymName === trainerInfo.gymName
                  );
  
                  if (!isDuplicate) {
                    return [...prevTrainerList, trainerInfo];
                  }
                } else {
                  // 지도 경계 밖에 있는 경우 제거
                  return prevTrainerList.filter(trainer =>
                    !(trainer.trainerName === trainerInfo.trainerName &&
                      trainer.gymAddress === trainerInfo.gymAddress &&
                      trainer.gymName === trainerInfo.gymName)
                  );
                }
  
                return prevTrainerList;
              });
            }
          });
        });
      };

      window.kakao.maps.event.addListener(map, 'dragend', handleDragEnd);

      return () => {
        window.kakao.maps.event.removeListener(map, 'dragend', handleDragEnd);
      };
    }
  }, [map, gymList]);


  useEffect(() => {
    if (map) {
      const moveArea = () => {
        const geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.addressSearch(`${reduxAreaRegionInfo.area} ${reduxAreaRegionInfo.region}`, function(result, status){
        // geocoder.addressSearch(areaRegionData.area + areaRegionData.region , function(result, status){
          if (status === window.kakao.maps.services.Status.OK) {
            var coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
            if(mapSwitch){
              map.setCenter(coords);
              setMapSwitch(false);
            }
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
          lat: 33.450701,
          lng: 126.570667,
        }} 
        style={{
          width:'52rem',
          height:'20rem'        
        }}
        level={3}
      />
    </div>
  );
});

export default GymMap;
