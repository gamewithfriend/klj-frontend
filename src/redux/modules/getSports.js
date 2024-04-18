const initialState = {
    SportsList : []
  };
  
const categorySetting = (state = initialState, action) => {
  
  switch (action.type) {
    case "basicSprotsSetting":
      return {sportsList: action.payload};
    default:
      return state;
  }
};

export default categorySetting;