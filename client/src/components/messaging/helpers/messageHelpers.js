import axios from "axios";

export const sendMessage = ({ firstName, email, userId }, { messageData, conversationId }, cb) => {
  const requestOptions = {
    method: "post",
    url: "/api/messages/",
    data: {
      user: {
        firstName: firstName || "Guest",
        email: email || "none",
        userId: userId || null
      },
      messageData: messageData,
      conversationId: conversationId
    }
  };
  return axios(requestOptions)
    .then((response) => {
      cb(null, response);
    })
    .catch((error) => {
      cb(error, null);
    });
};
