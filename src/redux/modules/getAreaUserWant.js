const initialState = {
    area : "",
    region : ""
  };
  
const setAreaUserWant = (state = initialState, action) => {
  
  switch (action.type) {
    case "setAreaUserWant":
      return {
        area: action.payload.area, 
        region: action.payload.region
      };
    case "resetAreaRegionSetting" :
      return{
        area: "", 
        region: ""
      }
    default:
      return state;
  }
};

export default setAreaUserWant;