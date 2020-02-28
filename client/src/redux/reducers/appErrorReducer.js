import { appErrorConstants } from "../constants";
const {SET_APP_ERROR, CLEAR_APP_ERROR } = appErrorConstants;

const initialState = {
  status: "",
  responseMsg: "",
  error: null
};

const errorReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_APP_ERROR: {
      return {
        ...state,
        status: payload.status,
        responseMsg: payload.responseMsg,
        error: payload.error
      };
    };
    case CLEAR_APP_ERROR: {
      return {
        ...status,
        payload: payload.status,
        responseMsg: payload.responseMsg,
        error: payload.error
      };
    };
    default: {
      return state;
    };
  };
};

export default errorReducer;