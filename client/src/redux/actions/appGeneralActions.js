import { appGeneralConstants } from "../constants";
const {
  OPERATION_SUCCESSFUL,
  CLEAR_SUCCESS_STATE,
  SET_APP_ERROR, 
  CLEAR_APP_ERROR 
} = appGeneralConstants

export const operationSuccessful = ({ status, responseMsg }) => {
  return {
    type: OPERATION_SUCCESSFUL,
    payload: {
      status: status,
      responseMsg: responseMsg,
      loading: false,
      successComponentOpen: true,
      error: null
    }
  };
};

export const clearSuccessState = () => {
  return {
    type: CLEAR_SUCCESS_STATE,
    payload: {
      status: "",
      responseMsg: "",
      loading: false,
      succesComponentOpen: false,
      error: null
    }
  };
};

export const setAppError = ({ status, responseMsg, error }) => {
  return {
    type: SET_APP_ERROR,
    payload: {
      status: status,
      responseMsg: responseMsg,
      loading: false,
      error: error
    }
  };
};  

export const clearAppError = () => {
  return {
    type: CLEAR_APP_ERROR,
    payload: {
      status: "",
      responseMsg: "",
      loading: false,
      error: null
    }
  };
};