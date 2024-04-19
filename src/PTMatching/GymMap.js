import React, { useState, useEffect} from 'react';
import Fetcher from '../utils/Fetcher';
import { useSelector, useDispatch } from "react-redux";

const GymMap = () => {
  const [map, setMap] = useState();
  const reduxAreaRegionInfo = useSelector((state) => state.getAreaUserWant);
  const KAKAO_MAP_KEY = process.env.REACT_APP_KAKAO_MAP_KEY;
  const [gymList, setGymList] = useState([]);
  const dispatch = useDispatch();

  const getGymList = async () => {
    const fetcher = new Fetcher().setUrl("/search/gym")
                                    .setMethod("GET")
    const result = await fetcher.jsonFetch();
    setGymList(result);
  }

  useEffect(() => {
    getGymList();
    const script = document.createElement("script");
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_KEY}&libraries=services&autoload=false`;
    document.head.appendChild(script);

    script.addEventListener("load", () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
          level: 5,
        };
        const map = new window.kakao.maps.Map(container, options);
        setMap(map);
      });
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
      <div id="map" style={{width:'52rem',height:'20rem'}}></div>
    </div>
  );
};

export default GymMap;
