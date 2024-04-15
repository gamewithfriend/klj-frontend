const initialState = {
    noticeList:[]
};

// 리듀서
const noticeList = (state = initialState, action) => {
  
    switch (action.type) {
      case "get":
        return {noticeList: action.payload}; 
      default:
        return state;
    }
  };
  
  // 모듈파일에서는 리듀서를 export default 한다.
  export default noticeList;