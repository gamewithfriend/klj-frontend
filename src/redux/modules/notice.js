const initialState = {
    id: 0
};

// 리듀서
const notice = (state = initialState, action) => {
  
    switch (action.type) {
      case "delete":
        return {id: action.payload}; 
      default:
        return state;
    }
  };
  
  // 모듈파일에서는 리듀서를 export default 한다.
  export default notice;