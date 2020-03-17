import { clientConstants } from "../constants";
const { 
  SET_GUEST_USER,
  SET_ADMIN
} = clientConstants;

export const setGuestClient = ({ _id, firstName, email }) => {
  return {
    type: SET_GUEST_USER,
    payload: {
      _id: _id,
      firstName: firstName,
      email: email
    }
  };
};

export const setAdmin = ({ _id, name, email }) => {
  return {
    type: SET_ADMIN,
    payload: {
      _id: _id,
      name: name,
      email: email
    }
  };
};


