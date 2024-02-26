
import React from "react";
import axios from 'axios';

export const NaverLogin = (code) => {
    return function(dispatch,getState,{history}){
        axios({
            method: "GET",
            url : `http://localhost:8080/login/callback/naver?${code}`,
        })
            .then((res) => {
                console.log(res)

                const ACCESS_TOKEN = res.data.accessToken;

                localStorage.setItem("token", ACCESS_TOKEN);

                history.replace("/")

                }
            )
    }
    
};

