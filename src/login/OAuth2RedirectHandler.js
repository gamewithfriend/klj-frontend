
import { useEffect,React } from "react";
import {NaverLogin} from "./NaverLogin.js";


const OAuth2RedirectHandler = () => {

    let code = new URL(window.location.href).searchParams.get("code");

    const naverLoginFunciton =  NaverLogin();

    useEffect(() => {
        naverLoginFunciton(code);
    },[]);

};

export default OAuth2RedirectHandler;