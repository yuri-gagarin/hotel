import { combineReducers } from "redux";
import conversationReducer from "./conversationReducer";

const rootReducer = combineReducers({
  conversationReducer: conversationReducer
});

export default rootReducer;