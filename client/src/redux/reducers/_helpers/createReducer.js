// @flow
import type { ServiceAction, ServiceState, ServiceData,ServiceImgData } from "../service/flowTypes";
import type { ContactPostAction, ContactPostState, ContactPostData } from "../contact_posts/flowTypes";
import type { DiningEntModelAction, DiningEntertainmentState, DiningEntModelData, DiningImgData, MenuImageData } from "../dining_entertainment/flowTypes";
import type { RoomAction, RoomState, RoomData, RoomImgData } from "../rooms/flowTypes";
import type { ClientAction, ClientState } from "../client/flowTypes";
import type { ConversationAction, ConversationState } from "../conversations/flowTypes";
import type { AdminConversationAction, AdminConversationState } from "../admin_conversations/flowTypes";

export type AppAction = ServiceAction | ContactPostAction | DiningEntModelAction | RoomAction | ClientAction | ConversationAction | AdminConversationAction;
export type Reducer<S, A: AppAction> = (S, A) => S;
export type Dispatch<A> = (action: A) => any;

export type RootState = {
  serviceState: ServiceState,
  roomState: RoomState,
  contactPostState: ContactPostState,
  diningEntertainmentState: DiningEntertainmentState,
  // to add later //
  adminState: any,
  adminConversationState: AdminConversationState,
  appGeneralState: any,
  clientState: ClientState,
  conversationState: ConversationState
};

export type GenericModelData = (ServiceData | DiningEntModelData | RoomData);
export type GenericImgData = (DiningImgData | MenuImageData | RoomImgData | ServiceImgData);

export default function createReducer<S, A: *>(initialState: S, handlers: { [key: string]: Reducer<S, A> }): Reducer<S, A> {
  return function reducer(state: S = initialState, action: A): S {
    return Object.prototype.hasOwnProperty.call(handlers, action.type) ? handlers[action.type](state, action) : state;
  };
}