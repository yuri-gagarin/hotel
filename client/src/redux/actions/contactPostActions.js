// @flow 
import axios from "axios";
import { normalizeErrorMessages } from "./helpers/errorHelpers";
import { generateEmptyContactPost } from "../reducers/_helpers/emptyDataGenerators";
// flow types 
import type { 
  ContactPostData, ContactPostState,
  ContactPostAPIRequest, SetContactPosts, ContactPostError,
  ContactPostCreated, ContactPostUpdated, ContactPostDeleted,
  OpenContactPost, ClearContactPostData, ContactPostAction, ClientContactPostFormData
} from "../reducers/contact_posts/flowTypes";
import type { Dispatch } from "../reducers/_helpers/createReducer";

export const sendContactPostRequest = (): ContactPostAPIRequest => {
  return {
    type: "ContactPostAPIRequest",
    payload: {
      status: 202,
      loading: true,
    }
  };
};

export const setContactPosts = (data : { status: number, responseMsg: string, createdContactPosts: Array<ContactPostData>, numberOfContactPosts: number }): SetContactPosts => {
  return {
    type: "SetContactPosts",
    payload: {
      status: data.status,
      loading: false,
      responseMsg: data.responseMsg,
      createdContactPosts: data.createdContactPosts,
      numberOfContactPosts: data.numberOfContactPosts
    }
  };
};

export const openContactPost = (data : { contactPostData: ContactPostData }): OpenContactPost => {
  return {
    type: "OpenContactPost",
    payload: {
      contactPostData: data.contactPostData,
    }
  };
};

export const clearContactPostData = (): ClearContactPostData => {
  return {
    type: "ClearContactPostData",
    payload: {
      contactPostData: generateEmptyContactPost()
    }
  };
};

export const deleteContactPost = (data : { status: number, responseMsg: string, createdContactPosts: Array<ContactPostData>, numberOfContactPosts: number } ): ContactPostDeleted => {
  return {
    type: "ContactPostDeleted",
    payload: { ...data, loading: false, contactPostData: generateEmptyContactPost() }
  };
};

export const setContactPostError = (error: any): ContactPostError => {
  return {
    type: "ContactPostError",
    payload: {
      status: 500,
      loading: false,
      responseMsg: "An error occured",
      error: error
    }
  };
};

export const handleOpenContactPost = (dispatch: Dispatch<ContactPostAction>, contactPostId: string, contactPostState: ContactPostState): void => {
  const contactPostData = contactPostState.createdContactPosts.filter((post) => post._id === contactPostId)[0];
  dispatch(openContactPost({ contactPostData: { ...contactPostData } } ));
};
export const handleCloseContactPost = (dispatch: Dispatch<ContactPostAction>): void => {
  dispatch(clearContactPostData());
};

export const handleCreateContactPost = (dispatch: Dispatch<ContactPostAction>, formData: ClientContactPostFormData): Promise<boolean> => {
  const requestOptions = {
    method: "post",
    url: "/api/contactPosts",
    data: {
      formData: formData
    }
  };
  dispatch(sendContactPostRequest());
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
      dispatch(setContactPostError(error)); 
      return false;
    });
};

export const handleFetchContactPosts = (dispatch: Dispatch<ContactPostAction>): Promise<boolean> => {
  const requestOptions = {
    method: "get",
    url: "/api/contactPosts",
  };

  dispatch(sendContactPostRequest());
  return axios(requestOptions) 
    .then((response) => {
      const { status, data } = response;
      const { responseMsg, contactPosts } : { responseMsg: string, contactPosts: Array<ContactPostData> } = data;
      const stateData = {
        status: status,
        responseMsg: responseMsg,
        createdContactPosts: contactPosts,
        numberOfContactPosts: contactPosts.length
      };
      dispatch(setContactPosts(stateData))
      return Promise.resolve(true);
    })
    .catch((error) => {
      dispatch(setContactPostError(error));
      return Promise.resolve(false);
    });
};

export const handleContactPostDelete = (dispatch: Dispatch<ContactPostAction>, postId: string, contactPostState: ContactPostState): Promise<boolean>  => {
  const { createdContactPosts } =  contactPostState;
  const requestOptions = {
    method: "delete",
    url: "/api/contactPosts/" + postId
  };
  
  dispatch(sendContactPostRequest());
  return axios(requestOptions) 
    .then((response) => {
      const { status, data } = response;
      const { responseMsg, deletedContactPost } : { responseMsg: string, deletedContactPost: ContactPostData } = data;
      const updatedPosts = createdContactPosts.filter((post) => post._id !== deletedContactPost._id );

      const stateData = {
        status: status,
        responseMsg: responseMsg,
        createdContactPosts: updatedPosts,
        numberOfContactPosts: updatedPosts.length
      }
      dispatch(deleteContactPost(stateData));
      return Promise.resolve(true);
    })
    .catch((error) => {
      dispatch(setContactPostError(error));
      return Promise.resolve(false);
    });
};

