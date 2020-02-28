import { combineReducers } from "redux";
import adminReducer from "../reducers/adminReducer";
import adminConversation from "./adminConversationsReducer";
import adminRoomReducer from "./adminRoomReducer";
import clientReducer from "./clientReducer";
import contactPostReducer from "./contactPostReducer";
import conversationReducer from "./conversationReducer";
import errorReducer from "./appErrorReducer";
import messageReducer from "./messageReducer";

const rootReducer = combineReducers({
  adminConvState: adminConversation, 
  adminRoomState: adminRoomReducer,
  appErrorState: errorReducer,
  clientState: clientReducer,
  contactPostState: contactPostReducer,
  conversationState: conversationReducer,
  adminState: adminReducer,
  messageState: messageReducer
});

export default rootReducer;