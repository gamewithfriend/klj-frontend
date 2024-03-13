
import { useEffect,React } from "react";
import Fetcher from '../utils/Fetcher';
import { useSelector, useDispatch } from "react-redux"; 

export function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
}

// 토큰의 만료 여부 확인
export const isTokenExpired = () => {
    const expirationTime = localStorage.getItem('expirationTime');
    if(expirationTime && new Date().getTime() > expirationTime){
        logout();    
    }
};  

export const getLoginNickName = () => {
    const token= JSON.parse(localStorage.getItem("token"));
    let userNickName= "";
    if(token !=null){
        console.log(token.nickName)
        console.log(token.oauthId)    
        userNickName =token.nickName;       
    }
    return userNickName;
};