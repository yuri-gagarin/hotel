import { clientConstants } from "../constants";
const { SET_ADMIN, LOG_OUT_ADMIN } = clientConstants;
const initialState = {
  loggedIn: false,
  loading: false,
  admin: false,
  email: "",
  firstName: "",
  lastName: "",
  phoneNumber: ""
}

const adminReducer = (state = initialState, { type, payload }) => {
  switch (type) {
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
    default: {
      return state;
    };
  };
};

export default adminReducer;