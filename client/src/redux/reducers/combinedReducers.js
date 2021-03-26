import { combineReducers } from "redux";
import adminReducer from "../reducers/adminReducer";
import adminConversation from "./adminConversationsReducer";
import diningModelReducer from "./dining_entertainment/diningEntertainmentReducer";
import roomReducer from "./roomReducer";
import appGeneralReducer from "./appGeneralReducer";
import clientReducer from "./clientReducer";
import contactPostReducer from "./contact_posts/contactPostReducer";
import conversationReducer from "./conversationReducer";
import messageReducer from "./messageReducer";
import serviceReducer from "./service/serviceReducer";

const rootReducer = combineReducers({
  adminConvState: adminConversation, 
  roomState: roomReducer,
  appGeneralState: appGeneralReducer,
  clientState: clientReducer,
  contactPostState: contactPostReducer,
  conversationState: conversationReducer,
  adminState: adminReducer,
  messageState: messageReducer,
  serviceState: serviceReducer,
  diningState: diningModelReducer
});

export default rootReducer;