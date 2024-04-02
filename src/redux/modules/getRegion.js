const initialState = {
    regionList : []
  };
  
const regionSetting = (state = initialState, action) => {
  
  switch (action.type) {
    case "basicRegionSetting":
      return {regionList : action.payload};
    default:
      return state;
  }
};

export default regionSetting;