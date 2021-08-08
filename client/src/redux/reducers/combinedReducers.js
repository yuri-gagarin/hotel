import { combineReducers } from "redux";
import adminReducer from "../reducers/adminReducer";
import adminConversationsReducer from "./admin_conversations/adminConversationsReducer";
import diningEntertainmentReducer from "./dining_entertainment/diningEntertainmentReducer";
import roomReducer from "./rooms/roomReducer";
import appGeneralReducer from "./appGeneralReducer";
import clientReducer from "./client/clientReducer";
import contactPostReducer from "./contact_posts/contactPostReducer";
import conversationReducer from "./conversations/conversationReducer";
import serviceReducer from "./service/serviceReducer";
import newsPostsReducer from "./news_posts/newsPostReducer";

const rootReducer = combineReducers({
  adminConversationState: adminConversationsReducer, 
  roomState: roomReducer,
  appGeneralState: appGeneralReducer,
  clientState: clientReducer,
  contactPostState: contactPostReducer,
  conversationState: conversationReducer,
  adminState: adminReducer,
  serviceState: serviceReducer,
  diningEntertainmentState: diningEntertainmentReducer,
  newsPostsState: newsPostsReducer
});

export default rootReducer;