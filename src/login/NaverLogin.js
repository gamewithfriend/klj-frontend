
import React from "react";
import Fetcher from '../utils/Fetcher';

export const NaverLogin = (code,state) => {
    
    return async function(code,state){
        const data = {
            code: code,
            state: state
        };

        // const fetcher = new Fetcher("http://localhost:8080/login/callback/naver", "post", JSON.stringify(data));
        const fetcher = new Fetcher().setUrl("http://localhost:8080/login/callback/naver")
                                     .setMethod("post")
                                     .setData(JSON.stringify(data))
                                     .build();
        console.log("fetcher :", fetcher);
        const result = await fetcher.jsonFetch();

        try {
            let accessToken = result.data;

            const expirationTime = new Date().getTime() + 3600 * 1000;
            localStorage.setItem("token",JSON.stringify(accessToken));
            localStorage.setItem('expirationTime', expirationTime);
            window.opener.location.href="/";
            window.close();

        } catch (error) {
            console.error('Naver login error:', error);
        }
    }
    
};

