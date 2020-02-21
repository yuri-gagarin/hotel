const initialState = {
  status: "",
  responseMsg: "",
  loading: false,
  conversations: [],
  error: null
};

const adminConverstionsReducer = (state = initialState, { type, payload = {} }) => {
  switch (type) {
    case "SET_ADMIN_CONVERSATIONS": {
      return {
        status: payload.status,
        responseMsg: payload.responseMsg,
        loading: payload.loading,
        conversations: [...payload.conversations], 
        error: payload.error
      };
    }; 
    case "HANDLE_NEW_MESSAGE": {
      //console.log("hanling new messages");
      //console.log(payload.conversations);
      return {
        status: payload.status,
        responseMsg: payload.responseMsg,
        loading: payload.loading,
        conversations: [...payload.conversations],
        error: payload.error
      };
    };
    case "ADMIN_CONVERSATIONS_ERROR": {
      return {
        ...state,
        status: payload.status,
        responseMsg: payload.responseMsg,
        loading: payload.loading,
        error: payload.error
      };
    };

    default: {
      return state;
    };
  };
};

export default adminConverstionsReducer;

