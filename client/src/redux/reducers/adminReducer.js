import { clientConstants } from "../constants";
const { 
  SET_ADMIN, 
  LOG_OUT_ADMIN, 
  LOGIN_REQUEST,
  LOGIN_ERROR
} = clientConstants;

const initialState = {
  loggedIn: true,
  loading: false,
  admin: false,
  _id: null,
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
        loggedIn: payload.loggedIn,
        loading: payload.loading,
        admin: payload.admin,
        _id: payload._id,
        email: payload.email,
        firstName: payload.firstName,
        lastName: payload.lastName,
        phoneNumber: payload.phoneNumber,
        error: payload.error
      };
    };
    case SET_ADMIN: {
      return {
        loggedIn: payload.loggedIn,
        loading: payload.loading,
        admin: payload.admin,
        _id: payload._id,
        email: payload.email,
        firstName: payload.firstName,
        lastName: payload.lastName,
        phoneNumber: payload.phoneNumber,
        error: payload.error
      };
    };
    case LOG_OUT_ADMIN: {
      return {
        loggedIn: payload.loggedIn,
        loading: payload.loading,
        admin: payload.admin,
        _id: payload._id,
        email: payload.email,
        firstName: payload.firstName,
        lastName: payload.lastName,
        phoneNumber: payload.phoneNumber,
        error: payload.error
      };
    };
    case LOGIN_ERROR: {
      return {
        loggedIn: payload.loggedIn,
        loading: payload.loading,
        _id: payload._id,
        admin: payload.admin,
        email: payload.email,
        firstName: payload.firstName,
        lastName: payload.lastName,
        phoneNumber: payload.phoneNumber,
        error: payload.error
      };
    };
    default: {
      return state;
    };
  };
};

export default adminReducer;