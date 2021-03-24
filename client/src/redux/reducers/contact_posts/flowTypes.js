// @flow 
// expected data from client //
export type ClientContactPostFormData = {
  _id?: string,
  name?: string,
  email: string,
  phoneNumber?: string,
  content?: string,
  read?: boolean,
  sentAt?: string,
  repliedAt?: string,
  createdAt?: string,
  editedAt?: string
}
export type FetchContactPostParams = {
  read?: boolean,
  archived?: boolean,
  date?: "asc" | "desc",
  limit?: number
};
// expected data from server //

export type ContactPostData = {
  _id: string,
  name: string,
  email: string,
  phoneNumber: string,
  content: string,
  read: boolean,
  archived: boolean,
  sentAt: string,
  repliedAt: string,
  createdAt: string,
  editedAt: string
};
export type ContactPostState = {
  status: number,
  loading: boolean,
  responseMsg: string,
  contactPostData: ContactPostData,
  createdContactPosts: Array<ContactPostData>,
  numberOfContactPosts: number,
  error: null | Error
};

// contactPost action types //
export type ContactPostAPIRequest = {
  +type: "ContactPostAPIRequest",
  payload: {
    status: number,
    loading: boolean,
  }
};
export type SetContactPosts = {
  +type: "SetContactPosts",
  payload: {
    status: number,
    loading: boolean,
    responseMsg: string,
    createdContactPosts: Array<ContactPostData>,
    numberOfContactPosts: number
  }
}
export type ContactPostError = {
  +type: "ContactPostError",
  payload: {
    status: number,
    loading: boolean,
    responseMsg: string,
    error: any
  }
};
export type ContactPostCreated = {
  +type: "ContactPostCreated",
  payload: {
    status: number,
    loading: boolean,
    responseMsg: string,
    newContactPostData: ContactPostData
  }
};

export type ContactPostUpdated = {
  +type: "ContactPostUpdated",
  payload: {
    status: number,
    loading: boolean,
    responseMsg: string,
    contactPostData: ContactPostData,
    createdContactPosts: Array<ContactPostData>
  }
}
export type ContactPostDeleted = {
  +type: "ContactPostDeleted",
  payload: {
    status: number,
    loading: boolean,
    responseMsg: string,
    contactPostData: ContactPostData,
    createdContactPosts: Array<ContactPostData>,
    numberOfContactPosts: number
  }
};
export type OpenContactPost = {
  +type: "OpenContactPost",
  payload: {
    contactPostData: ContactPostData,
  }
};
export type ClearContactPostData = {
  +type: "ClearContactPostData",
  payload: {
    contactPostData: ContactPostData,
  }
};
export type SendEmailResponse = {
  +type: "SendEmailResponse",
  payload: {
    contactPostData: ContactPostData
  }
};
// union contactPost action type //
export type ContactPostAction = (
  ContactPostAPIRequest | SetContactPosts | ContactPostError | ContactPostCreated | ContactPostUpdated | ContactPostDeleted |
  OpenContactPost | ClearContactPostData | SendEmailResponse
);