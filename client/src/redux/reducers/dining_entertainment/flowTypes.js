// @flow 
// expected data from client //
export type ClientDiningEntFormData = {
  _id?: string,
  live: boolean,
  title: string,
  description: string,
  hours: string,
  address?: string,
  menuImages: Array<MenuImageData>,
  optionType: "restaurant" | "cafe" |"lounge",
  images: Array<DiningImgData>,
  createdAt?: string,
  editedAt?: string
}
// expected data from server //
export type MenuImageData = {
  _id: string,
  path: string,
  diningModel?: string,
  uploadedAt: string
};
export type DiningImgData = {
  _id: string,
  path: string,
  diningModel?: string,
  uploadedAt: string,
};

export type DiningEntModelData = {
  _id: string,
  live: boolean,
  title: string,
  hours: string,
  address: string,
  description: string,
  images: Array<DiningImgData>,
  menuImages: Array<MenuImageData>,
  optionType: "restaurant" | "cafe" | "lounge",
  createdAt: string,
  editedAt: string
};
export type DiningEntertainmentState = {
  status: number,
  loading: boolean,
  responseMsg: string,
  diningEntModelData: DiningEntModelData,
  diningEntImages: Array<DiningImgData>,
  menuImages: Array<MenuImageData>,
  createdDiningEntModels: Array<DiningEntModelData>,
  numberOfDiningEntModels: number,
  error: null | Error
};

// service action types //
export type DiningEntModelAPIRequest = {
  +type: "DiningEntModelAPIRequest",
  payload: {
    status: number,
    loading: boolean,
    error: null
  }
};
export type SetDiningEntModels = {
  +type: "SetDiningEntModels",
  payload: {
    status: number,
    loading: boolean,
    responseMsg: string,
    createdDiningEntModels: Array<DiningEntModelData>,
    numberOfDiningEntModels: number
  }
}
export type DiningEntModelError = {
  +type: "DiningEntModelError",
  payload: {
    status: number,
    loading: boolean,
    responseMsg: string,
    error: any
  }
};
export type DiningEntModelCreated = {
  +type: "DiningEntModelCreated",
  payload: {
    status: number,
    loading: boolean,
    responseMsg: string,
    newDiningEntModelData: DiningEntModelData
  }
};
export type DiningEntModelUpdated = {
  +type: "DiningEntModelUpdated",
  payload: {
    status: number,
    loading: boolean,
    responseMsg: string,
    updatedDiningEntModelData: DiningEntModelData,
    updatedDiningEntModelsArr: Array<DiningEntModelData>
  }
}
export type DiningEntModelDeleted = {
  +type: "DiningEntModelDeleted",
  payload: {
    status: number,
    loading: boolean,
    responseMsg: string,
    updatedDiningEntModelsArr: Array<DiningEntModelData>,
    numberOfDiningEntModels: number
  }
};

export type MenuImgUplSuccess = {
  +type: "MenuImgUplSuccess",
  payload: {
    status: number,
    loading: boolean,
    responseMsg: string,
    updatedMenuImages: Array<MenuImageData>,
    updatedDiningEntModel: DiningEntModelData,
    updatedDiningEntModelsArr: Array<DiningEntModelData>
  }
};

export type MenuImgDelSuccess = {
  +type: "MenuImgDelSuccess",
  payload: {
    status: number,
    loading: boolean,
    responseMsg: string,
    updatedMenuImages: Array<MenuImageData>,
    updatedDiningEntModel: DiningEntModelData,
    updatedDiningEntModelsArr: Array<DiningEntModelData>
  }
};

export type DiningEntModelImgUplSuccess = {
  +type: "DiningEntModelImgUplSuccess",
  payload: {
    status: number,
    loading: boolean,
    responseMsg: string,
    diningEntImages: Array<DiningImgData>,
    updatedDiningEntModel: DiningEntModelData,
    updatedDiningEntModelsArr: Array<DiningEntModelData>
  }
};
export type DiningEntModelImgDelSuccess = {
  +type: "DiningEntModelImgDelSuccess",
  payload: {
    status: number,
    loading: boolean,
    responseMsg: string,
    diningEntImages: Array<DiningImgData>,
    updatedDiningEntModel: DiningEntModelData,
    updatedDiningEntModelsArr: Array<DiningEntModelData>
  }
};

export type OpenDiningEntModel = {
  +type: "OpenDiningEntModel",
  payload: {
    diningEntModelData: DiningEntModelData,
    diningEntImages: Array<DiningImgData>,
    menuImages: Array<MenuImageData>
  }
};
export type ClearDiningEntModelData = {
  +type: "ClearDiningEntModelData",
  payload: {
    diningEntModelData: DiningEntModelData,
    diningEntImages: Array<DiningImgData>,
    menuImages: Array<MenuImageData>
  }
};
export type SetDiningEntModelImages = {
  +type: "SetDiningEntModelImages",
  payload: {
    diningEntImages: Array<DiningImgData>
  }
};
export type TakeDiningEntModelOnline = {
  +type: "TakeDiningEntModelOnline",
  payload: {
    status: number,
    loading: boolean,
    responseMsg: string,
    updatedDiningEntModel: DiningEntModelData,
    updatedDiningEntModelsArr: Array<DiningEntModelData>
  }
};
export type TakeDiningEntModelOffline = {
  +type: "TakeDiningEntModelOffline",
  payload: {
    status: number,
    loading: boolean,
    responseMsg: string,
    updatedDiningEntModel: DiningEntModelData,
    updatedDiningEntModelsArr: Array<DiningEntModelData>
  }
};
export type ToggleAllDiningEntModelsOnlineOffline = {
  +type: "ToggleAllDiningEntModelsOnlineOffline",
  payload: {
    status: number,
    loading: boolean,
    responseMsg: string,
    updatedDiningEntModelsArr: Array<DiningEntModelData>
  }
};
// union service action type //
export type DiningEntModelAction = (
  DiningEntModelAPIRequest | SetDiningEntModels | DiningEntModelError | DiningEntModelCreated | DiningEntModelUpdated | DiningEntModelDeleted |
  DiningEntModelImgUplSuccess | DiningEntModelImgDelSuccess | MenuImgUplSuccess | MenuImgDelSuccess | OpenDiningEntModel | ClearDiningEntModelData | SetDiningEntModelImages |
  TakeDiningEntModelOnline | TakeDiningEntModelOffline | ToggleAllDiningEntModelsOnlineOffline
);