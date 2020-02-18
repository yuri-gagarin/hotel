import { combineReducers } from "redux";
import adminConversation from "./adminConversationsReducer";
import clientReducer from "./clientReducer";
import conversationReducer from "./conversationReducer";
import messageReducer from "./messageReducer";

const rootReducer = combineReducers({
  adminConvState: adminConversation, 
  clientState: clientReducer,
  conversationState: conversationReducer,
  messageState: messageReducer
});

export default rootReducer;