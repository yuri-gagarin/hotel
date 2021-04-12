// @flow
import type { ServiceAction, ServiceState, ServiceData } from "../service/flowTypes";
import type { ContactPostAction, ContactPostState, ContactPostData } from "../contact_posts/flowTypes";
import type { DiningEntModelAction, DiningEntertainmentState, DiningEntModelData } from "../dining_entertainment/flowTypes";
import type { RoomAction, RoomState, RoomData } from "../rooms/flowTypes";
export type AppAction = ServiceAction | ContactPostAction | DiningEntModelAction | RoomAction;
export type Reducer<S, A: AppAction> = (S, A) => S;
export type Dispatch<A> = (action: A) => any;

export type RootState = {
  serviceState: ServiceState,
  roomState: RoomState,
  contactPostState: ContactPostState,
  diningEntertainmentState: DiningEntertainmentState
};

export type GenericModelData = (ServiceData | DiningEntModelData | RoomData);

export default function createReducer<S, A: *>(initialState: S, handlers: { [key: string]: Reducer<S, A> }): Reducer<S, A> {
  return function reducer(state: S = initialState, action: A): S {
    return handlers.hasOwnProperty(action.type) ? handlers[action.type](state, action) : state;
  };
};