// @flow
import type { ClientState, ClientAction } from "./flowTypes";

const initialState = {

}
export const clientReducer = (state: ClientState = initialState, action: ClientAction): ClientState => {
  switch (action.type) {
    case "SetGuestUser": {
      return {
        ...state,
        _id: action.payload._id,
        name: action.payload.name,
        email: action.payload.email,
        error: null
      };
    };
    case "ClearClientError": {
      return {
        ...state,
        error: action.payload.error
      };
    };
    case "SetClientError": {
      return {
        ...state,
        error: action.payload.error
      };
    };
    default: {
      return {
        ...state
      };
    };
  }
};

export default clientReducer;