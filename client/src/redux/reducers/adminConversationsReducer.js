const initialState = {
  status: "",
  responseMsg: "",
  loading: false,
  conversations: []
};

const adminConverstionsReducer = (state = initialState, { type, payload = {} }) => {
  switch (type) {
    case "SET_ADMIN_CONVERSATIONS": {
      console.log("called");
      return {
        status: payload.status,
        responseMsg: payload.responseMsg,
        loading: payload.loading,
        conversations: [...payload.conversations]
      };
    }; 
    case "HANLE_NEW_MESSAGE": {
      return {
        
      }
    }
    default: {
      return state;
    };
  };
};

export default adminConverstionsReducer;

