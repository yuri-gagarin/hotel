import axios from "axios";
import { clientConstants } from "../constants";
const {
  LOGIN_REQUEST,
  LOGIN_ERROR,
  SET_ADMIN,
  LOG_OUT_ADMIN
} = clientConstants;

const loginRequest = () => {
  return {
    type: LOGIN_REQUEST,
    payload: {
      loggedIn: false,
      loading: true,
      admin: false,
      email: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      error: null
    }
  };
};

const loginError = (error) => {
  return {
    type: LOGIN_ERROR,
    payload: {
      loggedIn: false,
      loading: false,
      admin: false,
      email: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      error: error
    }
  };
};

const logOutAdmin = () => {
  return {
    type: LOG_OUT_ADMIN,
    payload: {
      loggedIn: false,
      loading: false,
      admin: false,
      email: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      error: null
    }
  };
};

export const setAdmin = (adminData) => {
  const {
    loggedIn,
    loading,
    admin,
    email,
    firstName,
    lastName,
    phoneNumber,
    error
  } = adminData
  return {
    type: SET_ADMIN,
    payload: {
      loggedIn: loggedIn,
      loading: loading,
      admin: admin,
      email: email,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      error: error
    }
  }
}

export const loginUser = (dispatch, userCredentials, history) => {
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
      const adminData = {
        loggedIn: true,
        loading: false,
        admin: admin,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.lastName
      }
      dispatch(setAdmin(adminData));
      // set admin data in local storage //
      localStorage.setItem("hotelAdminState", JSON.stringify(adminData));
      history.push("/admin/dashboard");
    })
    .catch((error) => {
      console.error(error.response);
      dispatch(loginError(error));
    });
};

export const logOutUser = (dispatch, history) => {
  const requestOptions = {
    method: "delete",
    url: "/api/logout"
  };
  dispatch(loginRequest());
  return axios(requestOptions)
    .then((response) => {
      const { status, data } = response;
      const { responseMsg, admin, user } = data;
      localStorage.removeItem("hotelAdminState");
      history.push("/login/admin")
      dispatch(logOutAdmin());
    })
    .catch((error) => {
      dispatch(loginError(error));
    })
};