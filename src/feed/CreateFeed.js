import { useEffect, React, useState, useRef, } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import Header from "../template/Header";
import moduleStyle from "../style/common.module.css";
import feedStyle from "../style/feed.module.css";

const CreateFeed = () => {
    const fileInput = useRef(null);
    const [feedImg, setFeedImg] = useState("");
    let reduxUserInfo = useSelector((state) => state.login);
    const [feedParams, setFeedParams] = useState({
        content : "",
        userId : reduxUserInfo.id,
        fileImg : ""
    })

    console.log(feedParams)

    const writingContent = (e) => {
        const value = e.target.value;
        setFeedParams((prevParams) => ({
            ...prevParams,
            content: value,
        }));
    }

    const handleButtonClick = () => {
        fileInput.current.click(); // 버튼 클릭 시 file input을 클릭하도록 합니다.
    };

    const changeFeedImage = async (e) =>{
        const reader = new FileReader();
        reader.onload = () => {
            if(reader.readyState === 2){
                setFeedImg(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0]);
        setFeedParams((prevParams) => ({
            ...prevParams,
            fileImg: e.target.files[0]
        }));
    }

    const navigate = useNavigate();

    const clickBack = () => {
        navigate(-1); 
    };


    return (
        <div>

            <Header />

            <div className={feedStyle.body}>
                <div className={moduleStyle.bodySideHeight100} />
                <div className={`${feedStyle.bodyCenter} ${feedStyle.verticalHorizontalCenter}`} style={{ display: 'flex', flexDirection: 'column' }} >
                    <div className={feedStyle.blank}></div>

                    <div className={feedStyle.feedUploadContainer}>
                        
                        <div className={feedStyle.photoSection}>
                            <div className={feedStyle.photoPreviewContainer}>
                                <img src={feedImg} className={feedStyle.photoPreview}></img>
                                <input accept="image/*" type="file"  hidden value={""}  ref={fileInput}  onChange={changeFeedImage}></input>
                            </div>

                            <button className={feedStyle.pickPhotoBtn} onClick={handleButtonClick}>사진 업로드</button>
                        </div>
                        

                        <div className={feedStyle.contentSection}>
                            <textarea className={feedStyle.contentArea} onChange={writingContent}></textarea>
                            <div className={feedStyle.uploadBtnContainer}>
                                <button className={feedStyle.uploadBtn}>등록 하기</button>
                                <button className={feedStyle.backBtn} onClick={clickBack}>뒤로 가기</button>
                            </div>
                        </div>

                    </div>



                </div>
            </div>

        </div>
    );
};

export default CreateFeed;
<div></div>

