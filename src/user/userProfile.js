import { useEffect, React, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import moduleStyle from "../style/common.module.css";
import Header from "../template/Header.js";
import Body from "../template/Body.js";
import { logout} from "../login/LoginHandler.js";
import Fetcher from '../utils/Fetcher';

import profile from '../assets/image/profile.png';
import * as userService from "../service/userService.js";


const UserProfile = () => {
    const fileInput = useRef(null);
    const dispatch = useDispatch();
    let reduxUserInfo = useSelector((state) => state.login);
    const [getNickName, setNickName] = useState(reduxUserInfo.nickName);
    const [getProfileImg, setProfileImg] = useState(profile);
    const [getfileImg, setfileImg] = useState("");
    // 유저 로그인 토근 가져오기
    const token = JSON.parse(localStorage.getItem("token"));


    const saveNickName = event => {
        setNickName(event.target.value);
    };

    const handleLogout = () => {
        logout();
    };

    const fetchUserTrainerApply = async () => {
        const formData = new FormData();
        formData.append('multipartFile', getfileImg); // formData에 파일 추가
        formData.append('nickName', getNickName); // formData에 nickName 추가
        const result = await userService.fetcherUserUpdateUserProfile(token,formData);
          
    }


    const changeProfileImage = async (e) =>{
        const reader = new FileReader();
        reader.onload = () => {
            if(reader.readyState === 2){
                setProfileImg(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0]);
        setfileImg(e.target.files[0]);
    }



    return (
        <div>
            <Header/>
            <div className="body" style={{display:"flex", height:"97vh",}}>        
                <div className={moduleStyle.bodySideHeight100NotBorder} >
                </div>
                <div className={moduleStyle.bodyCenterNotBorder} >
                    <div style={{height:"10%"}}>
                    </div>
                    <div style={{height:"90%", display:"flex"}}>
                        <div style={{height:"100%", width:"20%", borderRight:"solid 1px", borderColor:"#efefef" }}>
                            <div style={{height:"8%", alignContent:"center", justifyItems:"center"}}>
                                <NavLink to="/user/userProfile" className={moduleStyle.menuVarLinkBlack} >프로필</NavLink>
                            </div>
                            <div style={{height:"8%", alignContent:"center", justifyItems:"center"}}>
                                <NavLink to="/user/userTrainerProfile" className={moduleStyle.menuVarLinkBlack} >트레이너 신청</NavLink>
                            </div>
                            <div style={{height:"8%", alignContent:"center", justifyItems:"center"}}>
                                <NavLink onClick={handleLogout} to="/" className={moduleStyle.menuVarLinkBlack} >로그아웃</NavLink>
                            </div>
                            <div style={{height:"10%"}}>
                            </div>
                        </div>
                        <div style={{height:"100%", width:"80%"}}>
                            <div style={{height:"40%", width:"100%", display:"flex"}}>
                                <div style={{height:"100%", width:"30%", padding:"3%"}}>
                                    <div style={{height:"100%"
                                                , width:"100%"
                                                , alignContent:"center"
                                                , textAlign:"center"
                                                , borderRadius:"70%"
                                                , overflow:"hidden"}} onClick={()=>{fileInput.current.click()}}>
                                            <img  src={getProfileImg} style={{width:"100%",height:"100%",objectFit:"cover" }} >
                                            </img>
                                    </div>
                                    <input accept="image/*" type="file" hidden value={""}  ref={fileInput}  onChange={changeProfileImage}/>
                                </div>
                                <div style={{height:"100%", width:"70%"}}>
                                    <div style={{height:"10%", width:"100%"}}>
                                    </div>
                                    <div style={{height:"10%", width:"100%", marginLeft:"5%"}}>
                                        <div style={{height:"100%", width:"20%", alignContent:"center"}}>
                                            닉네임
                                        </div>
                                    </div>
                                    <div style={{height:"20%", width:"100%", marginLeft:"5%"}}>
                                        <input 
                                        className={moduleStyle.inputBottomBorderStyle}
                                        style={{height:"40%", width:"70%"}}
                                        value={getNickName}
                                        onChange={saveNickName}
                                        ></input>
                                        <button style={{marginLeft:"5%"}} onClick={fetchUserTrainerApply}>
                                            변경
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div style={{height:"60%", width:"100%"}}>
                            </div>
                        </div> 
                    </div>    
                </div>
                <div className={moduleStyle.bodySideHeight100NotBorder} >
                </div>      
            </div>
        </div>
    );
};

export default UserProfile;