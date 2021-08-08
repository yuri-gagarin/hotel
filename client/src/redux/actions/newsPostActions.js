// @flow 
import axios from "axios";
import { normalizeErrorMessages } from "./helpers/errorHelpers";
import { generateEmptyNewsPostModel } from "../reducers/_helpers/emptyDataGenerators";
// flow types 
import type { 
  NewsPostData, NewsPostsState,
  NewsPostAPIRequest, SetNewsPosts, NewsPostError,
  NewsPostCreated, NewsPostUpdated, NewsPostDeleted,
  OpenNewsPost, ClearNewsPostData, NewsPostAction, 
  ClientNewsPostFormData, FetchNewsPostParams, NewsPostUpdateData
} from "../reducers/news_posts/flowTypes";
import type { Dispatch } from "../reducers/_helpers/createReducer";
// helpers //
import { generateReplyEmailBody } from "./helpers/generateReplyEmailBody";

export const sendNewsPostRequest = (): NewsPostAPIRequest => {
  return {
    type: "NewsPostAPIRequest",
    payload: {
      status: 202,
      loading: true,
    }
  };
};

export const setNewsPosts = (data: { status: number, responseMsg: string, createdNewsPosts: Array<NewsPostData>, numberOfNewsPosts: number }): SetNewsPosts => {
  return {
    type: "SetNewsPosts",
    payload: {
      status: data.status,
      loading: false,
      responseMsg: data.responseMsg,
      createdNewsPosts: data.createdNewsPosts,
      numberOfNewsPosts: data.numberOfNewsPosts
    }
  };
};

export const openNewsPost = (data: { newsPostData: NewsPostData }): OpenNewsPost => {
  return {
    type: "OpenNewsPost",
    payload: {
      newsPostData: data.newsPostData,
    }
  };
};

export const clearNewsPostData = (): ClearNewsPostData => {
  return {
    type: "ClearNewsPostData",
    payload: {
      newsPostData: generateEmptyNewsPostModel()
    }
  };
};

export const updateNewsPost = (data: { status: number, responseMsg: string, updatedNewsPost: NewsPostData, updatedNewsPosts: Array<NewsPostData> }): NewsPostUpdated => {
  return {
    type: "NewsPostUpdated",
    payload: { ...data, loading: false }
  };
};

export const deleteNewsPost = (data: { status: number, responseMsg: string, createdNewsPosts: Array<NewsPostData>, numberOfNewsPosts: number } ): NewsPostDeleted => {
  return {
    type: "NewsPostDeleted",
    payload: { ...data, loading: false, newsPostData: generateEmptyNewsPostModel() }
  };
};

export const setNewsPostError = (error: any): NewsPostError => {
  return {
    type: "NewsPostError",
    payload: {
      status: 500,
      loading: false,
      responseMsg: "An error occured",
      error: error
    }
  };
};

export const handleOpenNewsPost = (dispatch: Dispatch<NewsPostAction>, newsPostId: string, newsPostState: NewsPostsState): void => {
  const newsPostData = newsPostState.createdNewsPosts.filter((post) => post._id === newsPostId)[0];
  dispatch(openNewsPost({ newsPostData: { ...newsPostData } } ));
};
export const handleCloseNewsPost = (dispatch: Dispatch<NewsPostAction>): void => {
  dispatch(clearNewsPostData());
};

export const handleCreateNewsPost = (dispatch: Dispatch<NewsPostAction>, formData: ClientNewsPostFormData): Promise<boolean> => {
  const requestOptions = {
    method: "post",
    url: "/api/news_posts",
    data: {
      formData: formData
    }
  };
  dispatch(sendNewsPostRequest());
  return axios(requestOptions)
    .then((response) => {
      const { status, data } = response;
      const { responseMsg } = data;
      return Promise.resolve(true);
    })
    .catch((err) => {
      const { status, data } = err.response;
      const { responseMsg, error } = data;
      const errorMessages = normalizeErrorMessages(data);
      dispatch(setNewsPostError(error)); 
      return false;
    });
};

export const handleUpdateNewsPost = (dispatch: Dispatch<NewsPostAction>, updateData: NewsPostUpdateData, newsPostState: NewsPostsState): Promise<boolean> => {
  const { _id, content } = updateData;
  const requestOptions = {
    method: "patch",
    url: "/api/news_posts/" + _id,
    data: {
      updateData: {
        content
      },
    }
  };
  dispatch(sendNewsPostRequest());
  return axios(requestOptions)
    .then((response) => {
      let updatedNewsPostsArr: Array<NewsPostData>; let updatedNewsPostData: NewsPostData;
      const { status, data } = response;
      const { responseMsg, updatedNewsPost }: { responseMsg: string, updatedNewsPost: NewsPostData } = data;
      // otherwise newsPostData and createdNewsPosts //
    
      updatedNewsPostsArr = newsPostState.createdNewsPosts.map((newsPost) => {
        if (newsPost._id === updatedNewsPost._id) {
          return updatedNewsPost;
        } else {
          return newsPost;
        }
      });
    
      const stateUpdate = { status, responseMsg, updatedNewsPost, updatedNewsPosts: updatedNewsPostsArr };
      dispatch(updateNewsPost(stateUpdate));
      return Promise.resolve(true);
    })
    .catch((error) => {
      dispatch(setNewsPostError(error));
      return Promise.resolve(false);
    })
};

export const handleFetchNewsPosts = (dispatch: Dispatch<NewsPostAction>, options?: FetchNewsPostParams ): Promise<boolean> => {
  const requestOptions = {
    method: "get",
    url: "/api/news_posts",
    params:  options ? { ...options } : {}
  };

  dispatch(sendNewsPostRequest());
  return axios(requestOptions) 
    .then((response) => {
      const { status, data } = response;
      const { responseMsg, newsPosts }: { responseMsg: string, newsPosts: Array<NewsPostData> } = data;
      const stateData = {
        status: status,
        responseMsg: responseMsg,
        createdNewsPosts: newsPosts,
        numberOfNewsPosts: newsPosts.length
      };
      dispatch(setNewsPosts(stateData))
      return Promise.resolve(true);
    })
    .catch((error) => {
      console.log(error)
      dispatch(setNewsPostError(error));
      return Promise.resolve(false);
    });
};

export const handleNewsPostDelete = (dispatch: Dispatch<NewsPostAction>, postId: string, newsPostState: NewsPostsState): Promise<boolean>  => {
  const { createdNewsPosts } =  newsPostState;
  const requestOptions = {
    method: "delete",
    url: "/api/news_posts/" + postId
  };
  
  dispatch(sendNewsPostRequest());
  return axios(requestOptions) 
    .then((response) => {
      const { status, data } = response;
      const { responseMsg, deletedNewsPost }: { responseMsg: string, deletedNewsPost: NewsPostData } = data;
      const updatedPosts = createdNewsPosts.filter((post) => post._id !== deletedNewsPost._id );

      const stateData = {
        status: status,
        responseMsg: responseMsg,
        createdNewsPosts: updatedPosts,
        numberOfNewsPosts: updatedPosts.length
      }
      dispatch(deleteNewsPost(stateData));
      return Promise.resolve(true);
    })
    .catch((error) => {
      dispatch(setNewsPostError(error));
      return Promise.resolve(false);
    });
};