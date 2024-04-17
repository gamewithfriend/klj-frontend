const initialState = {
    CategoryList : []
  };
  
const categorySetting = (state = initialState, action) => {
  
  switch (action.type) {
    case "basicCategorySetting":
      return {categoryList: action.payload};
    default:
      return state;
  }
};

export default categorySetting;