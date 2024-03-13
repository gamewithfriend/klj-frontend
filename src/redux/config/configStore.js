import { createStore } from "redux";
import { combineReducers } from "redux";
import login from "../modules/login"

const rootReducer = combineReducers({
    login: login,
}); 
const store = createStore(rootReducer); 

export default store;