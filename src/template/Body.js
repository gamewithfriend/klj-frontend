import React from "react";
import moduleStyle from "../style/common.module.css";
import MatchingScreeForMain from "../PTMatching/MatchingScreenForMain"
import MainBanner from "./MainBanner";

function Body() {
    return (
        <div className="body" style={{display:"flex", height:"97vh",}}>        
            <div className={moduleStyle.bodySide} >
            </div>
            <div className={moduleStyle.bodyCenter} >
                <MainBanner />
            </div>
            <div className={moduleStyle.bodySide} >
            </div>      
        </div>
    );
  }
  
  export default Body;