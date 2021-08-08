// @flow
import type { ServiceData } from "../service/flowTypes";
import type { ContactPostData } from "../contact_posts/flowTypes";
import type { DiningEntModelData } from "../dining_entertainment/flowTypes";
import type { RoomData } from "../rooms/flowTypes";
import type { MessageData } from "../conversations/flowTypes";
import type { AdminConversationData } from "../admin_conversations/flowTypes";
import type { NewsPostData } from "../news_posts/flowTypes";

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
    instagramURL: "",
    facebookURL: "",
    phoneNumber: "",
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
    twinBeds: "",
    queenBeds: "",
    kingBeds: "",
    couches: "",
    description: "",
    images: [],
    options: {
      privateBathroom: false,
      suiteBathroom: false,
      bathRobes: false,
      freeToileteries: false,
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
      coffeeMaker: false,
      teaKettle: false,
      fan: false,
      paidParking: false,
      freeParking: false
    },
    createdAt: "",
    editedAt: ""
  };
  return emptyRoom;
};

export const generateEmptyAdminConversationModel = (): AdminConversationData => {
  const emptyAdminConversationData: AdminConversationData = {
    conversationId: "",
    archived: false,
    receiverSocketId: "",
    newMessages: [],
    messages: [],
    newConversation: false,
    createdAt: ""
  };
  return emptyAdminConversationData;
};

export const generateEmptyMessageModel = (): MessageData => {
  return {
    _id: "",
    conversationId: "",
    receiverSocketId: "",
    senderSocketId: "",
    sender: "admin",
    messageType: null,
    messageContent: "",
    sentAt: ""
  };
};

export const generateEmptyNewsPostModel = (): NewsPostData => {
  const emptyNewsPostData: NewsPostData = {
    _id: "",
    content: "",
    createdAt: "",
    createdBy: "",
    editedAt: "",
  };
  return emptyNewsPostData;
}
