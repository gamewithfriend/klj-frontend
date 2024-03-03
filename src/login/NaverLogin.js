
import React from "react";
import axios from 'axios';

export const NaverLogin = (code,state) => {
    
    return function(code,state){


        axios.post('http://localhost:8080/login/callback/naver', {
            code: code,
            state: state
          })
        
            .then((res) => {
                console.log(res)

                const ACCESS_TOKEN = res.data.accessToken;

                localStorage.setItem("token", ACCESS_TOKEN);
                

                }
            )
            .catch((error) => {
                console.error('Naver login error:', error);
            });
    }
    
};

