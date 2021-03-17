// @flow 
import { serviceConstants } from "../../constants";
const {
  SERVICE_REQUEST, SERVICE_CREATED, SERVICE_UPDATED,
  SERVICE_DELETED, SERVICE_ERROR, SERVICE_IMG_REQUEST,
  SERVICE_IMG_UPLOADED, SERVICE_IMG_DELETED,
  SERVICE_IMG_ERROR, ADD_SERVICE_TO_STATE,
  OPEN_SERVICE, CLOSE_SERVICE, SET_SERVICES,
  SET_SERVICES_IMAGES, CLEAR_SERVICES_DATA
} = serviceConstants;
import type { ServiceState, ServiceAction } from "./flowTypes";

const initialState: ServiceState = { 
  status: 200,
  loading: false,
  responseMsg: "",
  serviceData: {
    _id: "",
    serviceType: "",
    hours: "",
    price: "",
    images: [],
    createdAt: "",
    editedAt: ""
  },
  serviceImages: [],
  error: null
};


const serviceReducer = (state: ServiceState = initialState, action: ServiceAction): ServiceState => {
  const { type, payload } = action;
  switch (type) {
    case SERVICE_REQUEST: {
      return {
        ...state,
        status: payload.status,
        loading: payload.loading,
        error: payload.error
      };
    };
    case SERVICE_CREATED: {
      return {
        ...state,
        status: payload.status,
        loading: payload.loading,
        responseMsg: payload.responseMsg,
        error: payload.error
      };
    };
    case SERVICE_UPDATED: {
      return {
        ...state,
        status: payload.status,
        loading: payload.loading,
        responseMsg: payload.responseMsg,
        createdServices: [ ...payload.createdServices ],
        error: payload.error
      };
    };
    case SERVICE_DELETED: {
      return {
        ...state,
        status: payload.status,
        loading: payload.loading,
        responseMsg: payload.responseMsg,
        createdServices: [ ...payload.createdServices ],
        error: payload.error
      };
    };
    case SERVICE_ERROR: {
      return {
        ...state,
        status: payload.status,
        loading: payload.loading,
        error: payload.error
      };
    };
    case SERVICE_IMG_REQUEST: {
      return {
        ...state,
        loading: payload.loading,
        error: payload.error
      };
    };
    case "S": {
      return {
        ...state,
        status: payload.status,
        loading: payload.loading,
        responseMsg: payload.responseMsg,
        serviceImages: [ ...state.serviceImages, payload.newImage ],
        error: payload.error
      };
    };
    case SERVICE_IMG_DELETED: {
      return {
        ...state,
        status: payload.status,
        loading: payload.loading,
        responseMsg: payload.responseMsg,
        serviceImages: [ ...payload.serviceImages ],
        error: payload.error
      };
    };
    case SERVICE_IMG_ERROR: {
      return {
        ...state,
        status: payload.status,
        loading: payload.loading,
        error: payload.error
      };
    };
    case ADD_SERVICE_TO_STATE: {
      return {
        ...state,
        createdServices: [ ...state.createdServices, payload.newService ]
      };
    };
    case OPEN_SERVICE: {
      return {
        ...state,
        loading: payload.loading,
        serviceData: payload.serviceData,
        serviceImages: [ ...payload.serviceImages ]
      };
    };
    case CLOSE_SERVICE: {
      return state;
    };
    case SET_SERVICES: {
      return {
        ...state,
        status: payload.status,
        loading: payload.loading,
        responseMsg: payload.responseMsg,
        createdServices: [ ...payload.createdServices ],
        numberOfServices: payload.createdServices.length,
        error: payload.error
      };
    };
    case SET_SERVICES_IMAGES: {
      return {
        ...state,
        loading: payload.loading,
        serviceImages: [ ...payload.serviceImages ],
        error: payload.error
      };
    };
    case CLEAR_SERVICES_DATA: {
      return {
        ...state,
        loading: payload.loading,
        serviceData: { ...payload.serviceData },
        serviceImages: [ ...payload.serviceImages ],
        error: payload.error
      };
    };
    default: {
      return state;
    };
  };

};

export default serviceReducer;