
import { useEffect,React } from "react";
import {NaverLogin} from "./NaverLogin.js";


const OAuth2RedirectHandler = () => {

    let code = new URL(window.location.href).searchParams.get("code");
    let state = new URL(window.location.href).searchParams.get("state");
    const naverLoginFunciton =  NaverLogin();

    useEffect(() => {
        naverLoginFunciton(code,state);
    },[]);

};

export default OAuth2RedirectHandler;