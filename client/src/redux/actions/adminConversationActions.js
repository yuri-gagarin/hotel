export const setAdminConversations = ({ status, responseMsg }, conversations = []) => {
  console.log("called");
  return {
    type: "SET_ADMIN_CONVERSATIONS",
    payload: {
      status: status,
      responseMsg: responseMsg,
      loading: false,
      conversations: [...conversations]
    }
  };
};

