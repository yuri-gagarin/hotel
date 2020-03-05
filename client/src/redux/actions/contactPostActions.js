import axios from "axios";
import { operationSuccessful, setAppError } from "./appGeneralActions";
import { contactPostActions } from "../constants";
import { normalizeErrorMessages } from "./helpers/errorHelpers";

const {
  CONTACT_POST_REQUEST,
  CONTACT_POST_SUCCESS,
  SET_CONTACT_POSTS,
  OPEN_CONTACT_POST,
  CLOSE_CONTACT_POST,
  DELETE_CONTACT_POST,
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
      numberOfPosts: contactPosts.length,
      error: null
    }
  };
};

export const openContactPost = (postId, contactPosts = []) => {
  const contactPost = contactPosts.filter((contactPost) => contactPost._id == postId)[0];
  console.log(postId);
  return {
    type: OPEN_CONTACT_POST,
    payload: {
      loading: false,
      responseMsg: "Post Opened",
      contactPost: contactPost,
      error: null
    }
  };
};

export const closeContactPost = (postId) => {
  return {
    type: CLOSE_CONTACT_POST,
    payload: {
      loading: false,
      responseMsg: "Close contact post",
      contactPost: {},
      error: null
    }
  };
};

export const deleteContactPost = ({ status, responseMsg, createdPosts }) => {
  return {
    type: DELETE_CONTACT_POST,
    payload: {
      status: status,
      loading: false,
      responseMsg: responseMsg,
      contactPost: {},
      createdPosts: createdPosts,
      numberOfPosts: createdPosts.length,
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
      dispatch(sendContactError(error)); 
      dispatch(setAppError({ status: status, responseMsg: responseMsg, errorMessages: errorMessages, error: error }));
      return false;
    });
};

export const fetchContactPosts = (dispatch) => {
  const requestOptions = {
    method: "get",
    url: "/api/contactPosts",
  };

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

export const handleContactPostDelete = (dispatch, postId, createdPosts = []) => {
  const requestOptions = {
    method: "delete",
    url: "/api/contactPosts/" + postId
  };
  
  dispatch(sendContactRequest());
  return axios(requestOptions) 
    .then((response) => {
      const { status, data } = response;
      const { responseMsg, deletedContactPost } = data;
      const updatedPosts = createdPosts.filter((post) => post._id != deletedContactPost._id );

      const stateData = {
        status: status,
        responseMsg: responseMsg,
        createdPosts: updatedPosts,
      }
      dispatch(deleteContactPost(stateData));
      dispatch(operationSuccessful(responseMsg));
    })
    .catch((error) => {
      dispatch(sendContactError(error));
    });
};

