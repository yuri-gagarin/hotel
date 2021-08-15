// @flow 
// expected data from client //
export type ClientNewsPostFormData = {
  _id?: string,
  createdBy?: string,
  title?: string,
  live?: boolean,
  content?: string,
  createdAt?: string,
  editedAt?: string
};
export type FetchNewsPostParams = {
  readSort?: "read" | "unread" | "view all",
  archived?: boolean,
  date?: "asc" | "desc",
  limit?: number
};
// expected data from server //

export type NewsPostData = {
  _id: string,
  createdBy: string,
  title: string,
  content: string,
  live: boolean,
  createdAt: string,
  editedAt: string
};

export type NewsPostsState = {
  status: number,
  loading: boolean,
  responseMsg: string,
  newsPostData: NewsPostData,
  createdNewsPosts: Array<NewsPostData>,
  numberOfNewsPosts: number,
  error: null | Error
};

// contactPost action types //
export type NewsPostAPIRequest = {
  +type: "NewsPostAPIRequest",
  payload: {
    status: number,
    loading: boolean,
  }
};
export type SetNewsPosts = {
  +type: "SetNewsPosts",
  payload: {
    status: number,
    loading: boolean,
    responseMsg: string,
    createdNewsPosts: Array<NewsPostData>,
    numberOfNewsPosts: number
  }
}
export type NewsPostError = {
  +type: "NewsPostError",
  payload: {
    status: number,
    loading: boolean,
    responseMsg: string,
    error: any
  }
};
export type NewsPostCreated = {
  +type: "NewsPostCreated",
  payload: {
    status: number,
    loading: boolean,
    responseMsg: string,
    newsPostData: NewsPostData
  }
};
export type NewsPostUpdated = {
  +type: "NewsPostUpdated",
  payload: {
    status: number,
    loading: boolean,
    responseMsg: string,
    updatedNewsPost: NewsPostData,
    updatedNewsPosts: Array<NewsPostData>
  }
};
export type NewsPostDeleted = {
  +type: "NewsPostDeleted",
  payload: {
    status: number,
    loading: boolean,
    responseMsg: string,
    newsPostData: NewsPostData,
    createdNewsPosts: Array<NewsPostData>,
    numberOfNewsPosts: number
  }
};
export type OpenNewsPost = {
  +type: "OpenNewsPost",
  payload: {
    newsPostData: NewsPostData,
  }
};
export type ClearNewsPostData = {
  +type: "ClearNewsPostData",
  payload: {
    newsPostData: NewsPostData,
  }
};

export type ToggleNewsPostOnlineStatus = {
  +type: "ToggleNewsPostOnlineStatus",
  payload: {
    status: number;
    loading: boolean;
    responseMsg: string;
    newsPostData: NewsPostData;
    createdNewsPosts: Array<NewsPostData>;
  }
};
// union contactPost action type //
export type NewsPostAction = (
  NewsPostAPIRequest | SetNewsPosts | NewsPostError | NewsPostCreated | NewsPostUpdated | NewsPostDeleted |
  OpenNewsPost | ClearNewsPostData | ToggleNewsPostOnlineStatus
);