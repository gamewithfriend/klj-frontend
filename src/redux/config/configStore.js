import { createStore } from "redux";
import { combineReducers } from "redux";
import login from "../modules/login";
import getArea from "../modules/getArea";
import getRegion from "../modules/getRegion";
import getAreaUserWant from "../modules/getAreaUserWant";
import getCategory from "../modules/getCategory"
import getSports from "../modules/getSports";
import notice from "../modules/notice";
import noticeList from "../modules/noticeList";
import trainerId from "../modules/trainerId";

const rootReducer = combineReducers({
    login: login,
    getArea : getArea,
    getRegion : getRegion,
    getAreaUserWant : getAreaUserWant,
    notice:notice,
    noticeList:noticeList,
    getCategory:getCategory,
    getSports:getSports,
    trainerId : trainerId,
}); 
const store = createStore(rootReducer); 

export default store;