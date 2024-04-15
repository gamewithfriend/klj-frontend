const initialState = {
    regionList : []
  };
  
const regionSetting = (state = initialState, action) => {
  
  switch (action.type) {
    case "basicRegionSetting":
      return {regionList : action.payload};
    case "resetAreaSetting":
      return {regionList : [] };
    default:
      return state;
  }
};

export default regionSetting;