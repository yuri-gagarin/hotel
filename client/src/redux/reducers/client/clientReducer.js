// @flow
import type { ClientState, ClientAction } from "./flowTypes";

const initialState: ClientState = {
  status: 200,
  responseMsg: "",
  _id: "",
  name: "",
  email: "",
  error: null,
  errorMessages: null
}
export const clientReducer = (state: ClientState = initialState, action: ClientAction): ClientState => {
  switch (action.type) {
    case "SetGuestUser": {
      return {
        ...state,
        _id: action.payload._id,
        name: action.payload.name,
        email: action.payload.email,
        error: null,
        errorMessages: null
      };
    }
    case "ClearClientError": {
      return {
        ...state,
        error: action.payload.error,
        errorMessages: action.payload.errorMessages
      };
    }
    case "SetClientError": {
      return {
        ...state,
        status: action.payload.status,
        responseMsg: action.payload.responseMsg,
        error: action.payload.error,
        errorMessages: action.payload.errorMessages
      };
    }
    default: {
      return {
        ...state
      };
    }
  }
};

export default clientReducer;