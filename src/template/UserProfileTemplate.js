import React from "react";
import { NavLink } from "react-router-dom";

import moduleStyle from "../style/common.module.css";
import Header from "../template/Header";
import Body from "../template/Body";
import { logout} from "../login/LoginHandler.js";

function UserProfileTemplate() {

    const handleLogout = () => {
        logout();
    };    
    return (
        <div>
            <Header/>
            <div className="body" style={{display:"flex", height:"100vh",}}>        
                <div className={moduleStyle.bodySideHeight100NotBorder} >
                </div>
                <div className={moduleStyle.bodyCenterNotBorder} >
                    <div style={{height:"10%"}}>
                    </div>
                    <div style={{height:"90%", display:"flex"}}>
                        <div style={{height:"100%", width:"20%", borderRight:"solid 1px", borderColor:"#efefef" }}>
                            <div style={{height:"8%", alignContent:"center", justifyItems:"center"}}>
                                <NavLink to="/" className={moduleStyle.menuVarLinkBlack} >프로필</NavLink>
                            </div>
                            <div style={{height:"8%", alignContent:"center", justifyItems:"center"}}>
                                <NavLink to="/" className={moduleStyle.menuVarLinkBlack} >트레이너 신청</NavLink>
                            </div>
                            <div style={{height:"8%", alignContent:"center", justifyItems:"center"}}>
                                <NavLink onClick={handleLogout} to="/" className={moduleStyle.menuVarLinkBlack} >로그아웃</NavLink>
                            </div>
                            <div style={{height:"10%"}}>
                            </div>
                        </div>
                        <div style={{height:"100%", width:"80%"}}>
                        </div> 
                    </div>    
                </div>
                <div className={moduleStyle.bodySideHeight100NotBorder} >
                </div>      
            </div>
        </div>
    );
  }
  
  export default UserProfileTemplate;