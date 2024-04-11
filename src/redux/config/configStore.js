import { createStore } from "redux";
import { combineReducers } from "redux";
import login from "../modules/login";
import getArea from "../modules/getArea";
import getRegion from "../modules/getRegion";
import getAreaUserWant from "../modules/getAreaUserWant";
import notice from "../modules/notice";

const rootReducer = combineReducers({
    login: login,
    getArea : getArea,
    getRegion : getRegion,
    getAreaUserWant : getAreaUserWant,
    notice:notice,
}); 
const store = createStore(rootReducer); 

export default store;