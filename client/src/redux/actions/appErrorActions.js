import { appErrorConstants } from "../constants";
const { SET_APP_ERROR, CLEAR_APP_ERROR } = appErrorConstants;

export const setAppError = ({ status, responseMsg, }) => {
  return {
    type: SET_APP_ERROR,
    payload: {
      status: errorData.status,
      responseMsg: errorData.responseMsg,
      error: errorData.error
    }
  };
};  

export const clearAppError = () => {
  return {
    type: CLEAR_APP_ERROR,
    payload: {
      status: "",
      responseMsg: "",
      error: null
    }
  };
};