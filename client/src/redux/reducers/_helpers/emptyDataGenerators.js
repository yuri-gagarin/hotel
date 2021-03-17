// @flow
import type { ServiceData } from "../service/flowTypes";

export const generateEmptyService = (): ServiceData => {
  return {
    _id: "",
    serviceType: "",
    price: "",
    hours: "",
    images: [],
    description: "",
    createdAt: "",
    editedAt: ""
  }
};
