import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers/ProductReducers";
import { persistStore,persistReducer } from "redux-persist";
import  storage  from "redux-persist/lib/storage";
const persistconfig={
    key:'persist-key',
    storage
}
const persistreducer= persistReducer(persistconfig,reducers)
const store = createStore(persistreducer,{},applyMiddleware(thunk))
const persister=persistStore(store)
export default store
export {persister}