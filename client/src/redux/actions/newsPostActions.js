// @flow 
import axios from "axios";
import { normalizeErrorMessages } from "./helpers/errorHelpers";
import { generateEmptyNewsPostModel } from "../reducers/_helpers/emptyDataGenerators";
// flow types 
import type { 
  NewsPostData, NewsPostsState, NewsPostImgData,
  NewsPostAPIRequest, SetNewsPosts, NewsPostError,
  NewsPostCreated, NewsPostUpdated, NewsPostDeleted, ToggleNewsPostOnlineStatus,
  NewsPostImgUplSuccess, NewsPostImgDelSuccess, DeleteAllNewsPostImages,
  OpenNewsPost, ClearNewsPostData, NewsPostAction, 
  ClientNewsPostFormData, FetchNewsPostParams
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

export const createNewsPost = (data: { status: number, responseMsg: string, newsPostData: NewsPostData }): NewsPostCreated => {
  return {
    type: "NewsPostCreated",
    payload: { ...data, loading: false }
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

const toggleNewsPostLiveStatus = (data: { status: number, responseMsg: string, newsPostData: NewsPostData, createdNewsPosts: Array<NewsPostData> }): ToggleNewsPostOnlineStatus => {
  return {
    type: "ToggleNewsPostOnlineStatus",
    payload: { ...data, loading: false  }
  };
};

// news post image processing //
export const newsPostImgUploadSuccess = (data: { status: number, responseMsg: string, updatedNewsPost: NewsPostData, newsPostImages: Array<NewsPostImgData>, createdNewsPosts: Array<NewsPostData> }): NewsPostImgUplSuccess => {
  return {
    type: "NewsPostImgUplSuccess",
    payload: { ...data, loading: false }
  };
};

export const newsPostImgDeleteSuccess = (data: { status: number, responseMsg: string, updatedNewsPost: NewsPostData, newsPostImages: Array<NewsPostImgData>, createdNewsPosts: Array<NewsPostData> }): NewsPostImgDelSuccess => {
  return {
    type: "NewsPostImgDelSuccess",
    payload: { ...data, loading: false }
  };
};

export const deleteAllNewsPostImages = (data: { status: number, responseMsg: string, updatedNewsPostImages: Array<NewsPostImgData> }): DeleteAllNewsPostImages => {
  return {
    type: "DeleteAllNewsPostImages",
    payload: { ...data, loading: false }
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

export const handleCreateNewsPost = (dispatch: Dispatch<NewsPostAction>, formData: ClientNewsPostFormData, newsPostsState: NewsPostsState): Promise<boolean> => {
  const { newsPostImages = [] } = newsPostsState;
  const requestOptions = {
    method: "post",
    url: "/api/news_posts",
    data: { formData, newsPostImages }
  };
  dispatch(sendNewsPostRequest());
  return axios(requestOptions)
    .then((response) => {
      const { status, data } = response;
      const { responseMsg, createdNewsPost }: { responseMsg: string, createdNewsPost: NewsPostData } = data;
      const stateUpdateData = { status, responseMsg, newsPostData: createdNewsPost };
      dispatch(createNewsPost(stateUpdateData));
      return true;
    })
    .catch((err) => {
      const { status, data } = err.response;
      const { responseMsg, error } = data;
      const errorMessages = normalizeErrorMessages(data);
      dispatch(setNewsPostError(error)); 
      return false;
    });
};

export const handleUpdateNewsPost = (dispatch: Dispatch<NewsPostAction>, updateData: NewsPostData, newsPostState: NewsPostsState): Promise<boolean> => {
  const { _id, title, content } = updateData;
  const requestOptions = {
    method: "patch",
    url: "/api/news_posts/" + _id,
    data: {
      updateData: {
        title,
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

export const handleDeleteNewsPost = (dispatch: Dispatch<NewsPostAction>, postId: string, newsPostState: NewsPostsState): Promise<boolean>  => {
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

export const handleToggleNewsPostLiveStatus = (dispatch: Dispatch<NewsPostAction>, newsPostData: NewsPostData, newsPostState: NewsPostsState): Promise<boolean> => {
  const { _id: postId, live } = newsPostData;
  const requestOtions = {
    method: "patch",
    url: "/api/news_posts/" + postId,
    data: {
      liveStatus: { live: !live }
    }
  };

  dispatch(sendNewsPostRequest());
  return axios(requestOtions)
    .then((response) => {
      const { status, data } = response;
      const { responseMsg, updatedNewsPost }: { responseMsg: string, updatedNewsPost: NewsPostData } = data;
      const updatedNewsPosts = newsPostState.createdNewsPosts.map((newsPost) => {
        if (newsPost._id === updatedNewsPost._id) {
          return { ...updatedNewsPost };
        } else {
          return newsPost;
        }
      });
      dispatch(toggleNewsPostLiveStatus({ status, responseMsg, newsPostData: updatedNewsPost, createdNewsPosts: updatedNewsPosts } ));
      return Promise.resolve(true);
    })
    .catch((error) => {
      dispatch(setNewsPostError(error));
      return Promise.resolve(false);
    });
};

export const handleUploadNewsPostImage = (dispatch: Dispatch<NewsPostAction>, file: FormData, currentNewsPostsState: NewsPostsState): Promise<boolean> => {
  const { newsPostData, createdNewsPosts, newsPostImages } = currentNewsPostsState;
  const { _id: newsPostId } = newsPostData

  const requestOptions = {
    method: "post",
    url: "/api/upload_news_post_image/" + (newsPostId ? newsPostId : ""),
    headers: {
      'content-type': 'multipart/form-data'
    },
    data: file
  };

  dispatch(sendNewsPostRequest());
  return axios(requestOptions)
    .then((response) => {
      const { status, data } = response;
      const { responseMsg, newImage, updatedNewsPost }: { responseMsg: string, newImage: NewsPostImgData, updatedNewsPost: NewsPostData } = data;
      let updatedNewsPostData: any; let updatedNewsPosts: any; 
      let updatedNewsPostImages: Array<NewsPostImgData> = [ ...newsPostImages, newImage ];
      if (updatedNewsPost) {
        // image being uploaded on a created NewsPost //
        // update NewsPostData and createdNewsPosts array //
        updatedNewsPosts = createdNewsPosts.map((newsPost) => {
          if (newsPost._id === updatedNewsPost._id) {
            return { ...updatedNewsPost, images: [ ...updatedNewsPost.images ] };
          } else {
            return newsPost;
          }
        });
        updatedNewsPostData = { ...updatedNewsPost };
      }
      const stateData = {
        status,
        responseMsg,
        newsPostImages: updatedNewsPostImages,
        updatedNewsPost: updatedNewsPostData ? updatedNewsPostData : newsPostData,
        createdNewsPosts: updatedNewsPosts ? updatedNewsPosts : createdNewsPosts
      };
      dispatch(newsPostImgUploadSuccess(stateData));
      return Promise.resolve(true);
    })
    .catch((error) => {
      dispatch(setNewsPostError(error));
      return Promise.resolve(false);
    });
};

 export const handleDeleteNewsPostImage = (dispatch: Dispatch<NewsPostAction>, imageToDeleteId: string, newsPostsState: NewsPostsState): Promise<boolean> => {
  const { newsPostData, newsPostImages, createdNewsPosts } = newsPostsState;
  const requestOptions = {
    method: "delete",
    url: "/api/delete_news_post_image/" + imageToDeleteId
  };

  dispatch(sendNewsPostRequest());
  return axios(requestOptions)
    .then((response) => {
      const { status, data } = response;
      const { responseMsg, deletedImage, updatedNewsPost }: { responseMsg: string, deletedImage: NewsPostImgData, updatedNewsPost: NewsPostData } = data;
      const { _id: deletedImgId } = deletedImage;

      const newImageState = newsPostImages.filter((image) => deletedImage._id !== image._id);
      let updatedNewsPostsArr; 
      if (updatedNewsPost) {
        updatedNewsPostsArr = createdNewsPosts.map((room) => {
          if (room._id === updatedNewsPost._id) {
            return { ...updatedNewsPost, images: [ ...updatedNewsPost.images ] };
          } else {
            return room;
          }
        });
      }
      const stateData = {
        status,
        responseMsg,
        newsPostImages: newImageState,
        updatedNewsPost: updatedNewsPost ? updatedNewsPost : newsPostData,
        createdNewsPosts: updatedNewsPostsArr ? updatedNewsPostsArr : createdNewsPosts,
      };
      dispatch(newsPostImgDeleteSuccess(stateData));
      return Promise.resolve(true);
    })
    .catch((error) => {
      dispatch(setNewsPostError(error));
      return Promise.resolve(false);
    });
};

export const handleDeleteAllNewsPostImages = (dispatch: Dispatch<NewsPostAction>, currentNewsPostState: NewsPostsState): Promise<boolean> => {
  const { newsPostImages } = currentNewsPostState;
  const axiosRequest = {
    method: "delete",
    url: "/api/delete_all_news_post_images",
    data: {
      newsPostImages: newsPostImages
    }
  };
  
  return axios(axiosRequest)
    .then((response) => {
      const { status, data } = response;
      const { responseMsg }: { responseMsg: string } = data;

      const updatedState = { status, responseMsg, updatedNewsPostImages: [] };
      dispatch(deleteAllNewsPostImages(updatedState));
      return Promise.resolve(true);
    })
    .catch((error) => {
      dispatch(setNewsPostError(error));
      return Promise.resolve(true);
    })
};