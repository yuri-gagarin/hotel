import { clientConstants } from "../constants";
const { SET_GUEST_USER, SET_ADMIN } = clientConstants;
const initialState = {
  _id: "",
  firstName: "",
  email: ""
};

export const clientReducer = (state = initialState, { type, payload = {} }) => {
  switch (type) {
    case SET_GUEST_USER: {
      return {
        ...state,
        _id: payload._id,
        firstName: payload.firstName,
        email: payload.email
      };
    };
    default: {
      return {
        ...state
      };
    };
  }
};

export default clientReducer;