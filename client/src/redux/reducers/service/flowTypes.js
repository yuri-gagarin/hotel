// @flow 
// expected data from client //
export type ClientServiceFormData = {
  _id?: string,
  serviceType: string,
  hours: string,
  price: string,
  createdAt?: string,
  editedAt?: string
}
// expected data from server //
export type ServiceImgData = {
  _id: string,
  path: string,
  hotelService?: string,
  createdAt: string,
};
export type ServiceData = {
  _id: string,
  serviceType: string,
  hours: string,
  price: string,
  description: string,
  images: Array<ServiceImgData>,
  createdAt: string,
  editedAt: string
};
export type ServiceState = {
  status: number,
  loading: boolean,
  responseMsg: string,
  serviceData: ServiceData,
  serviceImages: Array<ServiceImgData>,
  createdServices: Array<ServiceData>,
  numberOfServices: number,
  error: null | Error
};

// service action types //
export type ServiceAPIRequest = {
  +type: "ServiceAPIRequest",
  payload: {
    status: number,
    loading: boolean,
    error: null
  }
};
export type SetServices = {
  +type: "SetServices",
  payload: {
    status: number,
    loading: boolean,
    responseMsg: string,
    createdServices: Array<ServiceData>,
    numberOfServices: number
  }
}
export type ServiceError = {
  +type: "ServiceError",
  payload: {
    status: number,
    responseMsg: string,
    error: any
  }
};
export type ServiceCreated = {
  +type: "ServiceCreated",
  payload: {
    status: number,
    loading: boolean,
    responseMsg: string,
    newServiceData: ServiceData
  }
};
export type ServiceUpdated = {
  +type: "ServiceUpdated",
  payload: {
    status: number,
    loading: boolean,
    responseMsg: string,
    serviceData: ServiceData,
    createdServices: Array<ServiceData>
  }
}
export type ServiceDeleted = {
  +type: "ServiceDeleted",
  payload: {
    status: number,
    loading: boolean,
    responseMsg: string,
    serviceData: ServiceData,
    createdServices: Array<ServiceData>,
    numberOfServices: number
  }
};
export type ServiceImgUplSuccess = {
  +type: "ServiceImgUplSuccess",
  payload: {
    status: number,
    loading: boolean,
    responseMsg: string,
    serviceImages: Array<ServiceImgData>,
    updatedService: ServiceData,
    createdServices: Array<ServiceData>
  }
};
export type ServiceImgDelSuccess = {
  +type: "ServiceImgDelSuccess",
  payload: {
    status: number,
    loading: boolean,
    responseMsg: string,
    serviceImages: Array<ServiceImgData>,
    updatedService: ServiceData,
    createdServices: ServiceData[]
  }
};

export type OpenService = {
  +type: "OpenService",
  payload: {
    serviceData: ServiceData,
    serviceImages: Array<ServiceImgData>
  }
};
export type ClearServiceData = {
  +type: "ClearServiceData",
  payload: {
    serviceImages: Array<ServiceImgData>,
    serviceData: ServiceData,
  }
};
export type SetServiceImages = {
  +type: "SetServiceImages",
  payload: {
    serviceImages: Array<ServiceImgData>
  }
};
// union service action type //
export type ServiceAction = (
  ServiceAPIRequest | SetServices | ServiceError | ServiceCreated | ServiceUpdated | ServiceDeleted |
  ServiceImgUplSuccess | ServiceImgDelSuccess | OpenService | ClearServiceData | SetServiceImages
)