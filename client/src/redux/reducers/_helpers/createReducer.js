// @flow
import type { ServiceAction } from "../service/flowTypes";

export type AppAction = ServiceAction;
export type Reducer<S, A: AppAction> = (S, A) => S;
export type Dispatch = (action: AppAction) => any;

export default function createReducer<S, A: *>(initialState: S, handlers: { [key: string]: Reducer<S, A> }): Reducer<S, A> {
  return function reducer(state: S = initialState, action: A): S {
    return handlers.hasOwnProperty(action.type) ? handlers[action.type](state, action) : state;
  };
};