import { clientConstants } from "../constants";
const { SET_GUEST_USER } = clientConstants;

export const setGuestClient = ({ userId, name, email }) => {
  console.log("calling");
  console.log(userId)
  return {
    type: SET_GUEST_USER,
    payload: {
      _id: userId,
      name: name,
      email: email
    }
  };
};

