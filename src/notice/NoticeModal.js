import React, {useState, useEffect} from 'react';
import modalStyle from "../style/modal.module.css"
import { useSelector, useDispatch } from "react-redux";
import Fetcher from '../utils/Fetcher';

const NoticeModal = ({setModalOpen}) => {

    const dispatch = useDispatch();

    //알림 List state
    const [getNoticeList, setNoticeList] = useState();


    const closeModal = () => {
        setModalOpen(false);
    };

    // 로그인 유저 알림 List 함수
  const fetchUserNoticeList = async () => {
    const token = JSON.parse(localStorage.getItem("token"));

    if (token != null) {
      //console.log(token.accessToken);

      const fetcher = new Fetcher().setUrl("/notice/user")
                                         .setMethod("GET")
                                         .setAccessToken(token.accessToken);
      try {
        const result = await fetcher.jsonFetch();
        setNoticeList(result.data);
        console.log("result : ", result.data);
      } catch (error) {
        console.error('login error:', error);
      }
    }
  }

    useEffect(() => {
        fetchUserNoticeList();
    },[]);
  
    return (
        <div className={modalStyle.modalNoticeContainer}>
            <div className="modal-content">
                <button className={modalStyle.closeBtn} onClick={closeModal}>X</button>
                <div >
                {getNoticeList && getNoticeList.length > 0 ?
                  (
                    <div style={{backgroundColor:"#f5f6f8"}}>
                    {getNoticeList.map((content)=>( 
                      <div style={{margin:"6%"
                                  , backgroundColor:"white"
                                  , borderRadius:"5%"
                                  , border:"solid 1px #efefef"
                                  }}>
                        <div style={{margin:"2%", display:"flex"}}>
                          <div style={{whiteSpace:"pre-line"}}>{content.title}</div>
                          <div style={{whiteSpace:"pre-line"}}>{content.createdDate}</div>  
                        </div>
                        <div style={{margin:"3%", marginTop:"3%",textAlign:"left", whiteSpace:"pre-line"}}>{content.content}</div> 
                      </div>
                    ))}
                    </div>
                  )
                  :
                  (
                  <div>알림이 없습니다.</div>
                  )  
                }
                </div>
            </div>
        </div>
    );
};

export default NoticeModal;