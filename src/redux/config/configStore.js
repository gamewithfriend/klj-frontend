import { createStore } from "redux";
import { combineReducers } from "redux";
import login from "../modules/login";
import getArea from "../modules/getArea";
import getRegion from "../modules/getRegion";

const rootReducer = combineReducers({
    login: login,
    getArea : getArea,
    getRegion : getRegion
}); 
const store = createStore(rootReducer); 

export default store;