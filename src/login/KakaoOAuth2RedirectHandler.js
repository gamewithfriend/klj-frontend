
import { useEffect,React } from "react";
import {KakaoLogin} from "./KakaoLogin.js";


const KakaoOAuth2RedirectHandler = () => {

    let code = new URL(window.location.href).searchParams.get("code");
    let state = new URL(window.location.href).searchParams.get("state");
    const kakaoLoginFunciton =  KakaoLogin();

    useEffect(() => {
        kakaoLoginFunciton(code,state);
    },[]);

};

export default KakaoOAuth2RedirectHandler;