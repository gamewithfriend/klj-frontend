
import { useEffect,React } from "react";
import Fetcher from '../utils/Fetcher';

function logout() {
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

export const getUserInfo = () => {
    
    return async function(){
        const token= JSON.parse(localStorage.getItem("token"));
        if(token !=null){
            
            console.log(token)
            const data = {
            };

            const fetcher = new Fetcher("http://localhost:8080/user/info", "GET", JSON.stringify(data),"application/json;");
            const result = await fetcher.jsonFetch();

            console.log("result : ", result.data);

            try {
                console.log(result.data)
            } catch (error) {
                console.error('Naver login error:', error);
            }
        }
    };

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