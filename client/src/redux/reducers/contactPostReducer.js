import { contactPostActions } from "../constants";

const {
  CONTACT_POST_REQUEST,
  CONTACT_POST_SUCCESS,
  SET_CONTACT_POSTS,
  OPEN_CONTACT_POST,
  CLOSE_CONTACT_POST,
  DELETE_CONTACT_POST,
  CONTACT_POST_ERROR
} = contactPostActions;
const initialState = {
  status: "",
  loading: false,
  responseMsg: "",
  contactPost: {},
  createdPosts: [],
  numberOfPosts: 0,
  error: null
};

const contactPostReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CONTACT_POST_REQUEST: {
      return {
        ...state,
        loading: payload.loading,
        error: payload.error
      };
    };
    case CONTACT_POST_SUCCESS: {
      return {
        ...state,
        status: payload.status,
        loading: payload.loading,
        responseMsg: payload.responseMsg,
        error: payload.error
      };
    };
    case OPEN_CONTACT_POST: {
      return {
        ...state,
        loading: payload.loading,
        responseMsg: payload.responseMsg,
        contactPost: { ...payload.contactPost },
        error: payload.error
      };
    };
    case CLOSE_CONTACT_POST: {
      return {
        ...state,
        loading: payload.loading,
        responseMsg: payload.responseMsg,
        contactPost: { ...payload.contactPost },
        error: payload.error
      };
    };
    case DELETE_CONTACT_POST: {
      return {
        status: payload.status,
        loading: payload.loading,
        responseMsg: payload.responseMsg,
        contactPost: { ...payload.contactPost },
        createdPosts: [ ...payload.createdPosts ],
        numberOfPosts: payload.numberOfPosts,
        error: payload.error
      };
    };
    case SET_CONTACT_POSTS: {
      return {
        status: payload.status,
        loading: payload.loading,
        responseMsg: payload.responseMsg,
        contactPost: { ... payload.contactPost },
        createdPosts: [ ...payload.createdPosts ],
        numberOfPosts: payload.numberOfPosts,
        error: payload.error
      }
    }
    case CONTACT_POST_ERROR: {
      return {
        ...state,
        status: payload.status,
        loading: payload.loading,
        responseMsg: payload.responseMsg,
        error: payload.error
      };
    };
    default: {
      return state;
    }
  };  
};

export default contactPostReducer;