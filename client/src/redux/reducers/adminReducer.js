import { clientConstants } from "../constants";
const { 
  SET_ADMIN, 
  LOG_OUT_ADMIN, 
  LOGIN_REQUEST,
  LOGIN_ERROR
} = clientConstants;

const initialState = {
  loggedIn: false,
  loading: false,
  admin: false,
  email: "",
  firstName: "",
  lastName: "",
  phoneNumber: "",
  error: null
};

const adminReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_REQUEST: {
      return {
        ...state,
        loggedIn: payload.loggedIn,
        loading: payload.loading,
        admin: payload.admin,
        email: payload.email,
        firstName: payload.firstName,
        lastName: payload.lastName,
        phoneNumber: payload.phoneNumber,
        error: payload.error
      };
    };
    case SET_ADMIN: {
      return {
        ...state,
        loggedIn: payload.loggedIn,
        loading: payload.loading,
        admin: payload.admin,
        email: payload.email,
        firstName: payload.firstName,
        lastName: payload.lastName,
        phoneNumber: payload.phoneNumber
      };
    };
    case LOG_OUT_ADMIN: {
      return {
        ...state,
        loggedIn: payload.loggedIn,
        loading: payload.loading,
        admin: payload.admin,
        email: payload.email,
        firstName: payload.firstName,
        lastName: payload.lastName,
        phoneNumber: payload.phoneNumber
      };
    };
    case LOGIN_ERROR: {
      return {
        ...state,
        loggedIn: payload.loggedIn,
        loading: payload.loading,
        admin: payload.admin,
        email: payload.email,
        firstName: payload.firstName,
        lastName: payload.lastName,
        phoneNumber: payload.phoneNumber
      };
    };
    default: {
      return state;
    };
  };
};

export default adminReducer;