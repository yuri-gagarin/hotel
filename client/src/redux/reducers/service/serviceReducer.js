// @flow 
import { serviceConstants } from "../../constants";
import type { ServiceState, ServiceAction } from "./flowTypes";

const initialState: ServiceState = { 
  status: 200,
  loading: false,
  responseMsg: "",
  serviceData: {
    _id: "",
    live: false,
    serviceType: "",
    hours: "",
    price: "",
    description: "",
    images: [],
    createdAt: "",
    editedAt: ""
  },
  serviceImages: [],
  createdServices: [],
  numberOfServices: 0,
  error: null
};


const serviceReducer = (state: ServiceState = initialState, action: ServiceAction): ServiceState => {
  switch (action.type) {
    case "ServiceAPIRequest": {
      return {
        ...state,
        loading: action.payload.loading,
        status: action.payload.status,
        error: action.payload.error
      };
    };
    case "ServiceCreated": {
      return {
        ...state,
        status: action.payload.status,
        loading: action.payload.loading,
        responseMsg: action.payload.responseMsg,
        serviceData: action.payload.newServiceData,
        serviceImages: [ ...action.payload.newServiceData.images ],
        createdServices: [ ...state.createdServices, action.payload.newServiceData ],
        numberOfServices: state.createdServices.length + 1,
        error: null
      };
    };
    case "ServiceUpdated": {
      return {
        ...state,
        status: action.payload.status,
        loading: action.payload.loading,
        responseMsg: action.payload.responseMsg,
        serviceData: action.payload.serviceData,
        serviceImages: [ ...action.payload.serviceData.images ],
        createdServices: action.payload.createdServices,
        error: null
      };
    };
    case "ServiceDeleted": {
      return {
        ...state,
        status: action.payload.status,
        loading: action.payload.loading,
        responseMsg: action.payload.responseMsg,
        serviceData: action.payload.serviceData,
        createdServices: action.payload.createdServices,
        numberOfServices: action.payload.numberOfServices,
        error: null
      };
    };
    case "ServiceImgUplSuccess": {
      return {
        ...state,
        status: action.payload.status,
        loading: action.payload.loading,
        responseMsg: action.payload.responseMsg,
        serviceData: action.payload.updatedService,
        serviceImages: action.payload.serviceImages,
        createdServices: action.payload.createdServices,
        error: null
      };
    };
    case "ServiceImgDelSuccess": {
      return {
        ...state,
        status: action.payload.status,
        loading: action.payload.loading,
        responseMsg: action.payload.responseMsg,
        serviceData: action.payload.updatedService,
        serviceImages: action.payload.serviceImages,
        createdServices: action.payload.createdServices,
        error: null
      };
    };
    case "OpenService": {
      return {
        ...state,
        serviceData: action.payload.serviceData,
        serviceImages: action.payload.serviceImages,
        error: null
      };
    };
    case "ClearServiceData": {
      return {
        ...state,
        serviceData: action.payload.serviceData,
        serviceImages: action.payload.serviceImages,
        error: null
      };
    };
    case "SetServices": {
      return {
        ...state,
        status: action.payload.status,
        loading: action.payload.loading,
        responseMsg: action.payload.responseMsg,
        createdServices: action.payload.createdServices,
        numberOfServices: action.payload.numberOfServices,
        error: null
      };
    };
    case "SetServiceImages": {
      return {
        ...state,
        serviceImages: action.payload.serviceImages,
        error: null
      };
    };
    case "TakeServiceOnline": {
      return {
        ...state,
        status: action.payload.status,
        loading: action.payload.loading,
        responseMsg: action.payload.responseMsg,
        serviceData: action.payload.updatedService,
        createdServices: action.payload.createdServices,
        error: null
      };
    };
    case "TakeServiceOffline": {
      return {
        ...state,
        status: action.payload.status,
        loading: action.payload.loading,
        responseMsg: action.payload.responseMsg,
        serviceData: action.payload.updatedService,
        createdServices: action.payload.createdServices,
        error: null
      };
    };
    case "ToggleAllServicesOnlineOffline": {
      return {
        ...state,
        status: action.payload.status,
        loading: action.payload.loading,
        responseMsg: action.payload.responseMsg,
        createdServices: [ ...action.payload.updatedServices ],
        error: null
      };
    };
    case "ServiceError": {
      return {
        ...state,
        status: action.payload.status,
        responseMsg: action.payload.responseMsg,
        loading: false,
        error: action.payload.error
      };
    };
    default: {
      return state;
    };
  };

};

export default serviceReducer;