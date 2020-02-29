import axios from "axios";
import { operationSuccessful, setAppError } from "./appGeneralActions";
import { contactPostActions } from "../constants";
import { normalizeErrorMessages } from "./helpers/errorHelpers";

const {
  CONTACT_POST_REQUEST,
  CONTACT_POST_SUCCESS,
  CONTACT_POST_ERROR
} = contactPostActions;

export const sendContactRequest = () => {
  return {
    type: CONTACT_POST_REQUEST,
    payload: {
      loading: true,
      error: null
    }
  };
};

export const sendContactSuccess = ({ status, responseMsg }) => {
  return {
    type: CONTACT_POST_SUCCESS,
    payload: {
      status: status,
      loading: false,
      responseMsg: responseMsg,
      error: null
    }
  };
};

export const sendContactError = (error) => {
  return {
    type: CONTACT_POST_ERROR,
    payload: {
      status: 500,
      loading: false,
      responseMsg: "An error occured",
      error: error
    }
  };
};

export const sendContactFormData = (dispatch, formData) => {
  const requestOptions = {
    method: "post",
    url: "/api/contactPosts",
    data: {
      formData: formData
    }
  };
  dispatch(sendContactRequest());
  return axios(requestOptions)
    .then((response) => {
      const { status, responseMsg } = response;
      dispatch(sendContactSuccess({
        status: status,
        responseMsg: responseMsg
      })); 
      dispatch(operationSuccessful({ status: status, responseMsg: responseMsg }));
      return true;
    })
    .catch((err) => {
      const { status, data } = err.response;
      const { responseMsg, error } = data;
      const errorMessages = normalizeErrorMessages(data);
      dispatch(sendContactError(error)); 
      dispatch(setAppError({ status: status, responseMsg: responseMsg, errorMessages: errorMessages, error: error }));
      return false;
    });
};  
