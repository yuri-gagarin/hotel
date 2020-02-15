import { createStore } from "redux";
import rootReducer from "./reducers/combinedReducers";

export default createStore(rootReducer);