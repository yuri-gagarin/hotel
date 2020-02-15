import { combineReducers } from "redux";
import clientReducer from "./clientReducer";
import conversationReducer from "./conversationReducer";
import messageReducer from "./messageReducer";

const rootReducer = combineReducers({
  clientState: clientReducer,
  conversationState: conversationReducer,
  messageState: messageReducer
});

export default rootReducer;