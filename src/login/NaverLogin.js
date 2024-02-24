
import React from "react";

const NaverLogin = () => {

    const NAVER_CLIENT_ID = process.env.NAVER_CLIENT_ID;
    const REDIRECT_URI = "http://localhost:8080/login/naver/callback";
    const STATE = "false";
    const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${STATE}&redirect_uri=${REDIRECT_URI}`;

    const naverLoginClick = () => {
        window.open(NAVER_AUTH_URL, "_blank");     
    };

    return <button onClick={naverLoginClick} >네이버로그인</button>;
    
};

export default NaverLogin;

