// @flow 
import { generateEmptyContactPost } from "../_helpers/emptyDataGenerators";
import type { ContactPostState, ContactPostData, ContactPostAction } from "./flowTypes";
const initialState: ContactPostState = {
  status: 202,
  loading: false,
  responseMsg: "",
  contactPostData: generateEmptyContactPost(),
  createdContactPosts: [],
  numberOfContactPosts: 0,
  error: null
};

const contactPostReducer = (state: ContactPostState = initialState, action: ContactPostAction): ContactPostState => {
  switch (action.type) {
    case "ContactPostAPIRequest": {
      return {
        ...state,
        status: action.payload.status,
        loading: action.payload.loading,
        error: null
      };
    }
    case "OpenContactPost": {
      return {
        ...state,
        contactPostData: { ...action.payload.contactPostData },
        error: null
      };
    }
    case "ClearContactPostData": {
      return {
        ...state,
        contactPostData: { ...action.payload.contactPostData },
        error: null
      };
    }
    case "ContactPostUpdated": {
      return {
        ...state,
        status: action.payload.status,
        loading: action.payload.loading,
        responseMsg: action.payload.responseMsg,
        contactPostData: action.payload.updatedContactPost,
        createdContactPosts: action.payload.updatedContactPosts,
        error: null
      };
    }
    case "ContactPostDeleted": {
      return {
        ...state,
        status: action.payload.status,
        loading: action.payload.loading,
        responseMsg: action.payload.responseMsg,
        contactPostData: action.payload.contactPostData,
        createdContactPosts: action.payload.createdContactPosts,
        numberOfContactPosts: action.payload.numberOfContactPosts,
        error: null
      };
    }
    case "SetContactPosts": {
      return {
        ...state,
        status: action.payload.status,
        loading: action.payload.loading,
        responseMsg: action.payload.responseMsg,
        createdContactPosts: action.payload.createdContactPosts,
        contactPostData: generateEmptyContactPost(),
        numberContactPosts: action.payload.numberOfContactPosts,
        error: null
      };
    }
    case "ContactPostError": {
      return {
        ...state,
        status: action.payload.status,
        loading: action.payload.loading,
        responseMsg: action.payload.responseMsg,
        error: action.payload.error
      };
    }
    default: {
      return state;
    }
  }
};

export default contactPostReducer;