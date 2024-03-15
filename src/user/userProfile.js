import React from 'react';
import Header from "../template/Header";
import moduleStyle from "../style/common.module.css";

const UserProfile = () => {
    
    return (
        <div>
            <Header/>
            <div className="body" style={{display:"flex", height:"100%",}}>        
                    <div className={moduleStyle.bodySideHeight100} />
                    <div className={`${moduleStyle.bodyCenter} ${moduleStyle.verticalHorizontalCenter}`} style={{display:'flex', flexDirection:'column'}} >
                                           
                    </div>
                    <div className={moduleStyle.bodySideHeight100} />
            </div>
        </div>
    );
};

export default UserProfile;