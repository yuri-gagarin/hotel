import axios from "axios";
import { operationSuccessful, setAppError } from "./appGeneralActions";
import { contactPostActions } from "../constants";
import { normalizeErrorMessages } from "./helpers/errorHelpers";

const {
  CONTACT_POST_REQUEST,
  CONTACT_POST_SUCCESS,
  SET_CONTACT_POSTS,
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

export const setContactPosts = ({ status, responseMsg, contactPosts = [] }) => {
  return {
    type: SET_CONTACT_POSTS,
    payload: {
      status: status,
      loading: false,
      responseMsg: responseMsg,
      contactPost: {},
      createdPosts: contactPosts,
      error: null
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
      const { status, data } = response;
      const { responseMsg } = data;
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
      console.log(70);
      dispatch(sendContactError(error)); 
      dispatch(setAppError({ status: status, responseMsg: responseMsg, errorMessages: errorMessages, error: error }));
      return false;
    });
};

export const fetchContactPosts = (dispatch) => {
  const requestOptions = {
    method: "get",
    url: "/api/contactPosts",
  }
  dispatch(sendContactRequest());
  return axios(requestOptions) 
    .then((response) => {
      const { status, data } = response;
      const { responseMsg } = data;
      const stateData = {
        status: status,
        responseMsg: responseMsg,
        contactPosts: data.contactPosts
      };
      dispatch(setContactPosts(stateData))
    })
    .catch((error) => {
      dispatch(sendContactError(error));
    });
};
