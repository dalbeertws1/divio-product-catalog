import { combineReducers } from "redux";
import reducer from "./ProductReducers";
const reducers=combineReducers({
    products:reducer
})
export default reducers