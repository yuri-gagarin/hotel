// @flow 
import { generateEmptyNewsPostModel } from "../_helpers/emptyDataGenerators";
import type { NewsPostsState, NewsPostData, NewsPostAction } from "./flowTypes";
const initialState: NewsPostsState = {
  status: 202,
  loading: false,
  responseMsg: "",
  newsPostData: generateEmptyNewsPostModel(),
  createdNewsPosts: [],
  numberOfNewsPosts: 0,
  error: null
};

const newPostReducer = (state: NewsPostsState = initialState, action: NewsPostAction): NewsPostsState => {
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
        newsPostData: { ...action.payload.newsPostData },
        error: null
      };
    }
    case "NewsPostUpdated": {
      return {
        ...state,
        status: action.payload.status,
        loading: action.payload.loading,
        responseMsg: action.payload.responseMsg,
        newsPostData: action.payload.updatedNewsPost,
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
        newsPostData: action.payload.newsPostData,
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
        newsPostData: generateEmptyNewsPostModel(),
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