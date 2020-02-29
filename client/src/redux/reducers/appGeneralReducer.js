import { appGeneralConstants } from "../constants";

const {
  OPERATION_SUCCESSFUL,
  CLEAR_SUCCESS_STATE,
  SET_APP_ERROR, 
  CLEAR_APP_ERROR 
} = appGeneralConstants

const initialState = {
  status: "",
  responseMsg: "",
  errorMessages: [],
  loading: false,
  successComponentOpen: false,
  error: null
};

const errorReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case OPERATION_SUCCESSFUL: {
      return {
        status: payload.status,
        responseMsg: payload.responseMsg,
        errorMessages: [ ...payload.errorMessages ],
        loading: payload.loading,
        successComponentOpen: payload.successComponentOpen,
        error: payload.error
      };
    };
    case CLEAR_SUCCESS_STATE: {
      return {
        status: payload.status,
        responseMsg: payload.responseMsg,
        errorMessages: [ ...payload.errorMessages ],
        loading: payload.loading,
        successComponentOpen: payload.successComponentOpen,
        error: payload.error
      };
    };
    case SET_APP_ERROR: {
      return {
        status: payload.status,
        responseMsg: payload.responseMsg,
        errorMessages: [ ...payload.errorMessages ],
        loading: payload.loading,
        successComponentOpen: payload.successComponentOpen,
        error: payload.error
      };
    };
    case CLEAR_APP_ERROR: {
      return {
        sttus: payload.status,
        responseMsg: payload.responseMsg,
        errorMessages: [ ...payload.errorMessages ],
        loading: payload.loading,
        successComponentOpen: payload.successComponentOpen,
        error: payload.error
      };
    };
    default: {
      return state;
    };
  };
};

export default errorReducer;