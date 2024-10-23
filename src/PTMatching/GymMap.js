import React, { useState, useEffect, forwardRef, useImperativeHandle} from 'react';
import { useSelector, useDispatch } from "react-redux";
import * as matchingService from "../service/matchingService.js";
import { Map } from "react-kakao-maps-sdk"

const GymMap = forwardRef(({setTrainerList, trainerList, mapSwitch, setMapSwitch, params, setParams, searchTrainer}, mapRef) => {

  const [map, setMap] = useState();
  const reduxAreaRegionInfo = useSelector((state) => state.getAreaUserWant);
  const KAKAO_MAP_KEY = process.env.REACT_APP_KAKAO_MAP_KEY;
  const [bounds, setBounds] = useState();
  const dispatch = useDispatch();
  const [markers, setMarkers] = useState([]);

  // 지역 정보 가져와서 param에 저장하는 함수
  const selectRegionCode = async (reduxRegion) => {

    const regionCode = await matchingService.selectRegionCode(reduxRegion);
    setParams(prevParams => {
      return {
          ...prevParams,
          trainingArea: regionCode.data.id
      };
    });
    
  }

  // param 보내서 트레이너 목록 가져오는 함수
  const getTraineList = (params) => {
    const result = matchingService.trainerSearch(params);
    setTrainerList(result.data);
  }

  // 맵 가져오기 함수
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

  // 좌표로 행정동 주소 정보를 요청
  const searchAddrFromCoords = (coords, callback) => {
    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);         
  }

  // 지도 중심기준 행정구역 저장하는 함수
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

  // trainerList 지도에 찍기
  const locateTrainerList = () => {
    const geocoder = new window.kakao.maps.services.Geocoder();
    const newMarkers = [];

      trainerList.forEach(gym => {
        geocoder.addressSearch(gym.address, function(result, status) {
          if (status === window.kakao.maps.services.Status.OK) {
            var coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
            var marker = new window.kakao.maps.Marker({
              map: map,
              position: coords
            });
            marker.setMap(map);
            newMarkers.push(marker);
          }
        });
      });
      setMarkers(newMarkers);
  };

  // 맵 이동시 이벤트
  const handleDragEnd = () => {
    setBounds(map.getBounds());
    const bounds = map.getBounds();
    const sw = new window.kakao.maps.LatLng(bounds.qa, bounds.ha);
    const ne = new window.kakao.maps.LatLng(bounds.pa, bounds.oa);
    const lb = new window.kakao.maps.LatLngBounds(sw, ne);
    const geocoder = new window.kakao.maps.services.Geocoder();

    searchAddrFromCoords(map.getCenter(), displayCenterInfo);

    // console.log(trainerList)
    trainerList.forEach(trainer => {

      let trainerInfo = {
        trainerId : trainer.trainerId,
        address: trainer.address,
        gymName: trainer.gymName,
        trainerName: trainer.trainerName,
      };


      geocoder.addressSearch(trainer.address, function(result, status) {

        if (status === window.kakao.maps.services.Status.OK) {
          const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
          setTrainerList(prevTrainerList => {
            // 지도 경계 내에 있는 경우 추가
            if (lb.contain(coords)) {
              const isDuplicate = prevTrainerList.some(trainer =>
                trainer.trainerName === trainerInfo.trainerName &&
                trainer.address === trainerInfo.address &&
                trainer.gymName === trainerInfo.gymName
              );

              if (!isDuplicate) {
                return [...prevTrainerList, trainerInfo];
              }
            } else {
              // 지도 경계 밖에 있는 경우 제거
              return prevTrainerList.filter(trainer =>
                !(trainer.trainerName === trainerInfo.trainerName &&
                  trainer.address === trainerInfo.address &&
                  trainer.gymName === trainerInfo.gymName)
              );
            }

            return prevTrainerList;
          });
        }
      });
    });
  };

  const moveArea = () => {
    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.addressSearch(`${reduxAreaRegionInfo.area} ${reduxAreaRegionInfo.region}`, function(result, status){
      
      let reduxRegion = {
        area : reduxAreaRegionInfo.area,
        region : reduxAreaRegionInfo.region
      };

      if(reduxRegion.area != ''){
        selectRegionCode(reduxRegion);
      }

      if (status === window.kakao.maps.services.Status.OK) {
        var coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
        if(mapSwitch){
          map.setCenter(coords);
          setMapSwitch(false);
        }
      }
    });
  };

  useImperativeHandle(mapRef, () => ({
    getMap
  }));

  useEffect(() => {
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
    if (map) {
      handleDragEnd()
      window.kakao.maps.event.addListener(map, 'dragend', handleDragEnd);

      return () => {
        window.kakao.maps.event.removeListener(map, 'dragend', handleDragEnd);
      };
    }
  }, [map, trainerList]);

  useEffect(() => {
    if (map) {
      moveArea();
      locateTrainerList();
    }
  }, [reduxAreaRegionInfo, map]);
  
  useEffect(()=>{
    if(trainerList.length > 0 ){
      locateTrainerList();
    }else {
      markers.forEach(marker => marker.setMap(null));
      setMarkers([]); // 상태 초기화
    }
  },[trainerList]);

  useEffect(() => {
    if(map && params){
      searchTrainer(params);
      console.log(trainerList)
    }
  }, [params.trainingArea])

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
