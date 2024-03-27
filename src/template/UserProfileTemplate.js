import React from "react";
import moduleStyle from "../style/common.module.css";
import Header from "../template/Header";
import Body from "../template/Body";

function UserProfileTemplate() {
    return (
        <div>
            <Header/>
            <div className="body" style={{display:"flex", height:"100%",}}>        
                <div className={moduleStyle.bodySide} >
                </div>
                <div className={moduleStyle.bodyCenter} >
                    <div style={{height:"10vh",border:"solid black 1px"}}>
                    </div>
                    <div style={{height:"70%",border:"solid black 1px"}}>
                    </div>    
                </div>
                <div className={moduleStyle.bodySide} >
                </div>      
            </div>
        </div>
    );
  }
  
  export default UserProfileTemplate;