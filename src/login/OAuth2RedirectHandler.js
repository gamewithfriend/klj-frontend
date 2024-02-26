import React from "react";
import {useDispatch} from "react-redux";
import {NaverLogin} from "./NaverLogin.js";


const OAuth2RedirectHandler = () => {
    const dispatch = useDispatch();

    let code = new URL(window.location.href).searchParams.get("code");

    const handleNaverLogin = (code) => {
        dispatch(NaverLogin(code));
      };

    React.useEffect(async () => {
        handleNaverLogin(code);
    },[]);

    return <button >네이버로그인</button>;
};

export default OAuth2RedirectHandler;