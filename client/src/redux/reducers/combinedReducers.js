import { combineReducers } from "redux";
import adminReducer from "../reducers/adminReducer";
import adminConversation from "./adminConversationsReducer";
import adminRoomReducer from "./adminRoomReducer";
import clientReducer from "./clientReducer";
import conversationReducer from "./conversationReducer";
import messageReducer from "./messageReducer";

const rootReducer = combineReducers({
  adminConvState: adminConversation, 
  adminRoomState: adminRoomReducer,
  clientState: clientReducer,
  adminState: adminReducer,
  conversationState: conversationReducer,
  messageState: messageReducer
});

export default rootReducer;