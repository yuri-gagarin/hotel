// @flow
import type { ServiceData } from "../service/flowTypes";
import type { ContactPostData } from "../contact_posts/flowTypes";
import type { DiningEntModelData } from "../dining_entertainment/flowTypes";

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
    replyContent: "",
    read: false,
    archived: false,
    sentAt: "",
    repliedAt: "",
    createdAt: "",
    editedAt: ""
  };
};

export const generateEmptyDiningEntModel = (): DiningEntModelData => {
  return {
    _id: "",
    live: false,
    title: "",
    hours: "",
    address: "",
    description: "",
    images: [],
    menuImages: [],
    optionType: "restaurant",
    createdAt: "",
    editedAt: ""
  };
};