import { clientConstants } from "../constants";
const { SET_GUEST_USER } = clientConstants;
const initialState = {
  _id: "",
  name: "",
  email: ""
};

export const clientReducer = (state = initialState, { type, payload = {} }) => {
  console.log("calling clinet reducer")
  switch (type) {
    case SET_GUEST_USER: {
      return {
        ...state,
        _id: payload._id,
        name: payload.name,
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