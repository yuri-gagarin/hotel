// @flow
import type { ServiceAction, ServiceState, ServiceData } from "../service/flowTypes";
import type { ContactPostAction, ContactPostState, ContactPostData } from "../contact_posts/flowTypes";
export type AppAction = ServiceAction | ContactPostAction;
export type Reducer<S, A: AppAction> = (S, A) => S;
export type Dispatch<A> = (action: A) => any;

export type RootState = {
  serviceState: ServiceState,
  contatPostState: ContactPostState
};

export type GenericModelData = (ServiceData | ContactPostData);

export default function createReducer<S, A: *>(initialState: S, handlers: { [key: string]: Reducer<S, A> }): Reducer<S, A> {
  return function reducer(state: S = initialState, action: A): S {
    return handlers.hasOwnProperty(action.type) ? handlers[action.type](state, action) : state;
  };
};