
import React from "react";
import Header from "../template/Header";
import moduleStyle from "../style/common.module.css";
import logo from '../assets/logo/HDUO.png';
import naver from '../assets/logo/naver.png';

const LoginScreen = () => {
    const NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID;
    const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
    const STATE = "false";
    const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${STATE}&redirect_uri=${REDIRECT_URI}`;

    const naverLoginClick = () => {
        window.open(NAVER_AUTH_URL,'_blank','width=700, height=600, top=50, left=50, scrollbars=yes');     
        console.log(NAVER_AUTH_URL)
        console.log(REDIRECT_URI)
    };

        
    return  <div>
                <Header/>
                <div className="body" style={{display:"flex", height:"100%",}}>        
                    <div className={moduleStyle.bodySideHeight100} >
                    </div>
                    <div className={`${moduleStyle.bodyCenter} ${moduleStyle.verticalHorizontalCenter}`}  >
                        <div style={{border:"solid black 1px",height: "60vh", width: "60vh"}} >
                            <div style={{border:"solid black 1px",height:"20vh", justifyContent:"center",display:"flex" }}>
                                <img src={logo} style={{objectFit:"contain", width:"20vh" }} ></img>
                            </div>
                            <div style={{border:"solid black 1px",height:"40vh"}}>
                                <div style={{border:"solid black 1px",height:"10vh",margin:"2vh",justifyContent:"center",display:"flex"}}>
                                    <div onClick={naverLoginClick}>
                                        <img  src={naver} style={{width:"40vh" }} ></img>
                                    </div>
                                </div>
                                <div style={{border:"solid black 1px",height:"10vh"}}>
                                </div>
                                <div style={{border:"solid black 1px",height:"10vh"}}>
                                </div>  
                            </div>
                        </div>
                    </div>
                    <div className={moduleStyle.bodySideHeight100}  >
                    </div>      
                </div>
            </div>;
                
    
    

};

export default LoginScreen;

