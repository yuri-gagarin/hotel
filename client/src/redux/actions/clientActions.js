import { clientConstants } from "../constants";
const { 
  SET_GUEST_USER,
  SET_ADMIN
} = clientConstants;

export const setGuestClient = ({ userId, name, email }) => {
  return {
    type: SET_GUEST_USER,
    payload: {
      _id: userId,
      name: name,
      email: email
    }
  };
};

export const setAdmin = ({ userId, name, email }) => {
  console.log("called set admin");
  return {
    type: SET_ADMIN,
    payload: {
      _id: userId,
      name: name,
      email: email
    }
  };
};

