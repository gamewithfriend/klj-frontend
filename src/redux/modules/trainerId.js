const initialState = {
    trainerId : 0
  };
  
const trainerId = (state = initialState, action) => {
  
  switch (action.type) {
    case "setTrainerId":
      return {trainerId: action.payload};
    default:
      return state;
  }
};

export default trainerId;