import axios from "axios";

export const loginUser = (dispatch, userCredentials) => {
  const { email, password } = userCredentials;
  const requestOptions = {
    method: "post",
    url: "/api/login",
    data: {
      email: email,
      password: password
    }
  };
  dispatch(loginRequest());
  return axios(requestOptions)
    .then((response) => {
      const { status, data } = response;
      const { responseMsg, admin, user } = data;
      dispatch({
        type: SET_ADMIN,
        payload: {
          loggedIn: true,
          loading: false,
          admin: admin,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          phoneNumber: user.phoneNumber
        }
      })
    })
    .catch((error) => {

    })
}