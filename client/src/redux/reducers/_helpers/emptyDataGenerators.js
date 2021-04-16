// @flow
import type { ServiceData } from "../service/flowTypes";
import type { ContactPostData } from "../contact_posts/flowTypes";
import type { DiningEntModelData } from "../dining_entertainment/flowTypes";
import type { RoomData } from "../rooms/flowTypes";

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
    optionType: "",
    createdAt: "",
    editedAt: ""
  };
};

export const generateEmptyRoomModel = (): RoomData => {
  const emptyRoom: RoomData = {
    _id: "",
    roomType: "",
    live: false,
    area: "",
    sleeps: "",
    price: "",
    beds: "",
    couches: "",
    description: "",
    images: [],
    options: {
      privateBathroom: false,
      suiteBathroom: false,
      jacuzzi: false,
      balcony: false,
      terrace: false,
      mountainView: false,
      streetView: false,
      riverView: false,
      tv: false,
      wifi: false,
      phone: false,
      airConditioning: false,
      refrigerator: false,
      coffeeMaker: false
    },
    createdAt: "",
    editedAt: ""
  };
  return emptyRoom;
};