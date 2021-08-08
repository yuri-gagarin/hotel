// @flow 
import { generateEmptyNewsPostModel } from "../_helpers/emptyDataGenerators";
import type { NewsPostState, NewsPostData, NewsPostAction } from "./flowTypes";
const initialState: NewsPostState = {
  status: 202,
  loading: false,
  responseMsg: "",
  newsPostData: generateEmptyNewsPostModel(),
  createdNewsPosts: [],
  numberOfNewsPosts: 0,
  error: null
};

const newPostReducer = (state: NewsPostState = initialState, action: NewsPostAction): NewsPostState => {
  switch (action.type) {
    case "NewsPostAPIRequest": {
      return {
        ...state,
        status: action.payload.status,
        loading: action.payload.loading,
        error: null
      };
    }
    case "OpenNewsPost": {
      return {
        ...state,
        newsPostData: { ...action.payload.newsPostData },
        error: null
      };
    }
    case "ClearNewsPostData": {
      return {
        ...state,
        newPostData: { ...action.payload.newsPostData },
        error: null
      };
    }
    case "NewsPostUpdated": {
      return {
        ...state,
        status: action.payload.status,
        loading: action.payload.loading,
        responseMsg: action.payload.responseMsg,
        newPostData: action.payload.updatedNewsPost,
        createdNewsPosts: action.payload.updatedNewsPosts,
        error: null
      };
    }
    case "NewsPostDeleted": {
      return {
        ...state,
        status: action.payload.status,
        loading: action.payload.loading,
        responseMsg: action.payload.responseMsg,
        newPostData: action.payload.newPostData,
        createdNewsPosts: action.payload.createdNewsPosts,
        numberOfNewsPosts: action.payload.numberOfNewsPosts,
        error: null
      };
    }
    case "SetNewsPosts": {
      return {
        ...state,
        status: action.payload.status,
        loading: action.payload.loading,
        responseMsg: action.payload.responseMsg,
        createdNewsPosts: action.payload.createdNewsPosts,
        newPostData: generateEmptyNewsPost(),
        numberNewsPosts: action.payload.numberOfNewsPosts,
        error: null
      };
    }
    case "NewsPostError": {
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

export default newPostReducer;