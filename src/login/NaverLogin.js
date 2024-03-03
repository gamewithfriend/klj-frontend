
import React from "react";
import Fetcher from '../utils/Fetcher';

export const NaverLogin = (code,state) => {
    
    return async function(code,state){
        const data = {
            code: code,
            state: state
        };

        const fetcher = new Fetcher("http://localhost:8080/login/callback/naver", "post", JSON.stringify(data));
        const result = await fetcher.jsonFetch();

        console.log("result : ", result.data);

        try {
            const ACCESS_TOKEN = result.data.accessToken;
            console.log("hello");

            localStorage.setItem("token", ACCESS_TOKEN);
        } catch (error) {
            console.error('Naver login error:', error);
        }
    }
    
};

