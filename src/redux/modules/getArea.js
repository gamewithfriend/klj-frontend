const initialState = {
    AreaList : []
  };
  
const areaSetting = (state = initialState, action) => {
  
  switch (action.type) {
    case "basicAreaSetting":
      return {areaList: action.payload};
    default:
      return state;
  }
};

export default areaSetting;