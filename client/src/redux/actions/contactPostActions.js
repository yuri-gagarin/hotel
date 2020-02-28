import axios from "axios";
import { contactPostActions } from "../constants";

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
    })
    .catch((error) => {
      console.error(error);
      dispatch(sendContactError(error)); 
    });
};  
