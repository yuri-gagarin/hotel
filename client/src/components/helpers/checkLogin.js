import axios from "axios";

const checkLogin = () => {
  // checks for user login //
  const requestParams = {
    method: "get",
    url: "/api/logged_in"
  }
  return axios(requestParams)
    .then((response) => {
      const { status } = response;
      if (status === 200) {
        // user is logged in still //
        return true;
      } else {
        // not a status code 200 //
        return false
      }
    })
    .catch((error) => {
      return false;
    });
};

export default checkLogin;