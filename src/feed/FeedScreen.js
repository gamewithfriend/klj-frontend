import React,  {useRef, useState, useEffect} from 'react';
import Header from "../template/Header";
import moduleStyle from "../style/common.module.css";
import feedStyle from "../style/feed.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { NavLink } from 'react-router-dom';

const FeedScreen = () => {

    const [feed, setFeed] = useState(["", "", "", ""]);

    return (
        <div>
            <Header/>

            <div className={feedStyle.body}>     

                <div className={moduleStyle.bodySideHeight100} />

                <div className={`${feedStyle.bodyCenter} ${feedStyle.verticalHorizontalCenter}`} style={{display:'flex', flexDirection:'column'}} >
                        
                    <div className={feedStyle.blank}></div>

                    <div className={feedStyle.btnContainer}>
                        <NavLink to = "/feed/create" className={feedStyle.createBtn}>NEW</NavLink>
                    </div>

                    <div className={feedStyle.feedListContainer}>

                        <div className={feedStyle.feedListSection}>
                            
                        { <div className={feedStyle.feedList}>
                            {feed.length == 0 ? 
                            (<p>검색 결과가 없습니다.</p>)
                            : 
                            (feed.map((feed) => (
                                <button className={feedStyle.feed}>{feed}
                                    
                                    <div className={feedStyle.backgroudPhoto}></div>

                                    <div className={feedStyle.likeAndComment}>
                                        <FontAwesomeIcon icon={faHeart} className={feedStyle.like}/>
                                        <FontAwesomeIcon icon={faComment} className={feedStyle.comment}/>
                                    </div>
                                </button>
                            )))
                            }
                        </div>}

                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default FeedScreen;