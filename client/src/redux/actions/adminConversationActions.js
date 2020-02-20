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

export const handleNewClientMessage = (data) => {
  const { conversationId, clientSocketId } = data;
  return {
    type: "HANDLE_NEW_MESSAGE",
    payload: {
      responseMsg: "New Message",
    }
  }
};

