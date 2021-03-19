// @flow
import type { ServiceData } from "../service/flowTypes";

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
