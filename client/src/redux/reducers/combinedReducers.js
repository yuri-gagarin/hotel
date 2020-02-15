import { combineReducers } from "redux";
import conversationReducer from "./conversationReducer";
import messageReducer from "./messageReducer";

const rootReducer = combineReducers({
  conversationState: conversationReducer,
  messageState: messageReducer
});

export default rootReducer;