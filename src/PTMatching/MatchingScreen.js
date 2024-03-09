import React from 'react';
import Header from "../template/Header";
import moduleStyle from "../style/common.module.css";

const MatchingScreen = () => {
    return (
        <div>
            <Header/>
            <div className="body" style={{display:"flex", height:"100%",}}>        
                    <div className={moduleStyle.bodySideHeight100} />
                    
                    <div className={`${moduleStyle.bodyCenter} ${moduleStyle.verticalHorizontalCenter}`} style={{display:'flex', flexDirection:'column'}} >
                        <div style={{height: '200px'}}>
                            매칭 조건
                        </div>
                        <div style={{width:'80%', display:'flex', justifyContent:"center", flexWrap:'wrap'}}>
                            <div style={{display:"flex", flexDirection: 'column', alignItems: 'center', margin:"10px"}}>
                                <div style={{border:"solid black 1px", height:"120px", width:"120px", borderRadius:'50%'}}></div>
                                <div>김피티</div>
                                <div>삼두짐</div>
                            </div>
                            <div style={{display:"flex", flexDirection: 'column', alignItems: 'center', margin:"10px"}}>
                                <div style={{border:"solid black 1px", height:"120px", width:"120px", borderRadius:'50%'}}></div>
                                <div>김피티</div>
                                <div>삼두짐</div>
                            </div>
                            <div style={{display:"flex", flexDirection: 'column', alignItems: 'center', margin:"10px"}}>
                                <div style={{border:"solid black 1px", height:"120px", width:"120px", borderRadius:'50%'}}></div>
                                <div>김피티</div>
                                <div>삼두짐</div>
                            </div>
                            <div style={{display:"flex", flexDirection: 'column', alignItems: 'center', margin:"10px"}}>
                                <div style={{border:"solid black 1px", height:"120px", width:"120px", borderRadius:'50%'}}></div>
                                <div>김피티</div>
                                <div>삼두짐</div>
                            </div>
                            <div style={{display:"flex", flexDirection: 'column', alignItems: 'center', margin:"10px"}}>
                                <div style={{border:"solid black 1px", height:"120px", width:"120px", borderRadius:'50%'}}></div>
                                <div>김피티</div>
                                <div>삼두짐</div>
                            </div>
                            <div style={{display:"flex", flexDirection: 'column', alignItems: 'center', margin:"10px"}}>
                                <div style={{border:"solid black 1px", height:"120px", width:"120px", borderRadius:'50%'}}></div>
                                <div>김피티</div>
                                <div>삼두짐</div>
                            </div>
                            <div style={{display:"flex", flexDirection: 'column', alignItems: 'center', margin:"10px"}}>
                                <div style={{border:"solid black 1px", height:"120px", width:"120px", borderRadius:'50%'}}></div>
                                <div>김피티</div>
                                <div>삼두짐</div>
                            </div>
                            <div style={{display:"flex", flexDirection: 'column', alignItems: 'center', margin:"10px"}}>
                                <div style={{border:"solid black 1px", height:"120px", width:"120px", borderRadius:'50%'}}></div>
                                <div>김피티</div>
                                <div>삼두짐</div>
                            </div>
                            <div style={{display:"flex", flexDirection: 'column', alignItems: 'center', margin:"10px"}}>
                                <div style={{border:"solid black 1px", height:"120px", width:"120px", borderRadius:'50%'}}></div>
                                <div>김피티</div>
                                <div>삼두짐</div>
                            </div>
                            <div style={{display:"flex", flexDirection: 'column', alignItems: 'center', margin:"10px"}}>
                                <div style={{border:"solid black 1px", height:"120px", width:"120px", borderRadius:'50%'}}></div>
                                <div>김피티</div>
                                <div>삼두짐</div>
                            </div>
                        </div>
                        
                    </div>

                    <div className={moduleStyle.bodySideHeight100} />
                </div>
        </div>
    );
};

export default MatchingScreen;