// @flow
import type { ServiceData } from "../service/flowTypes";
import type { ContactPostData } from "../contact_posts/flowTypes";

export const generateEmptyService = (): ServiceData => {
  return {
    _id: "",
    live: false,
    serviceType: "",
    price: "",
    hours: "",
    images: [],
    description: "",
    createdAt: "",
    editedAt: ""
  }
};

export const generateEmptyContactPost = (): ContactPostData => {
  return {
    _id: "",
    name: "",
    email: "",
    phoneNumber: "",
    content: "",
    read: false,
    archived: false,
    sentAt: "",
    repliedAt: "",
    createdAt: "",
    editedAt: ""
  };
};