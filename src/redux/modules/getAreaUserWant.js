const initialState = {
    Area : "",
    region : ""
  };
  
const setAreaUserWant = (state = initialState, action) => {
  
  switch (action.type) {
    case "setAreaUserWant":
      return {Area: action.payload.area, region: action.payload.region};
    default:
      return state;
  }
};

export default setAreaUserWant;