import { contactPostActions } from "../constants";

const {
  CONTACT_POST_REQUEST,
  CONTACT_POST_SUCCESS,
  CONTACT_POST_ERROR
} = contactPostActions;
const initialState = {
  status: "",
  loading: false,
  responseMsg: "",
  contactPost: {},
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