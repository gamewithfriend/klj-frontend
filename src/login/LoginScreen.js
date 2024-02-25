
import React from "react";
import Header from "../template/Header";
import moduleStyle from "../style/common.module.css";

const LoginScreen = () => {


    return  <>
                <Header/>
                <div className="body" style={{display:"flex", height:"100%",}}>        
                    <div className={moduleStyle.bodySide} >
                    </div>
                    <div className={moduleStyle.bodyCenter} >

                    </div>
                    <div className={moduleStyle.bodySide} >
                    </div>      
                </div>
            </>
                
    
    

};

export default LoginScreen;

