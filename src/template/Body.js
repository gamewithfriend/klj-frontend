import React from "react";
import moduleStyle from "../style/common.module.css";
import MatchingScreeForMain from "../PTMatching/MatchingScreenForMain"

function Body() {
    return (
        <div className="body" style={{display:"flex", height:"100%",}}>        
            <div className={moduleStyle.bodySide} >
            </div>
            <div className={moduleStyle.bodyCenter} >
                
            <MatchingScreeForMain/>

            </div>
            <div className={moduleStyle.bodySide} >
            </div>      
        </div>
    );
  }
  
  export default Body;