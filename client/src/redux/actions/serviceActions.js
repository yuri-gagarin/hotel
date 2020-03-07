import axios from "axios";
import { serviceConstants } from "./../constants";

const {
  SERVICE_REQUEST, SERVICE_CREATED, SERVICE_UPDATED,
  SERVICE_DELETED, SERVICE_ERROR, SERVICE_IMG_REQUEST,
  SERVICE_IMG_UPLOADED, SERVICE_IMG_DELETED,
  SERVICE_IMG_ERROR, ADD_SERVICE_TO_STATE,
  OPEN_SERVICE, CLOSE_SERVICE, SET_SERVICES,
  SET_SERVICES_IMAGES, CLEAR_SERVICES_DATA
} = serviceConstants;

export const serviceRequest = () => {
  return {
    type: SERVICE_REQUEST,
    payload: {
      loading: true,
      error: null
    }
  };
};

export const serviceImgUploadSucess = (stateData) => {
  return {
    type: SERVICE_IMG_UPLOADED,
    payload: stateData
  };
};

export const serviceImgDeleteSuccess = (stateData) => {
  return {
    type: SERVICE_IMG_DELETED,
    payload: stateData
  };
};

export const serviceImgUploaddError = (error) => {
  return {
    type: SERVICE_IMG_ERROR,
    payload: {
      status: 500,
      responseMsg: "An error occured",
      error: error
    }
  };
};

export const serviceRequest = () => {
  return {
    type: SERVICE_REQUEST,
    payload: {
      status: null,
      loading: true,
      error: null
    }
  };
};

export const serviceCreated = (stateData) => {
  return {
    type: SERVICE_CREATED,
    payload: stateData
  };
};

export const addNewService = (serviceState) => {
  return {
    type: ADD_SERVICE_TO_STATE,
    payload: {
      newService: serviceState
    }
  };
};   

export const setServices = (stateData) => {
  return {
    type: SET_SERVICES,
    payload: stateData
  };
};

export const serviceUpdated = (stateData) => {
  return {
    type: SERVICE_UPDATED,
    payload: stateData
  };
};

export const serviceDeleted = (stateData) => {
  return {
    type: SERVICE_DELETED,
    payload: stateData
  };
};

export const serviceError = (error) => {
  console.error(error);
  return {
    type: SERVICE_ERROR,
    payload: {
      status: 500,
      error: error
    }
  };
};

export const openService = (services, serviceId) => {
  const serviceData = services.filter((service) => service._id == serviceId)[0];
  return {
    type: OPEN_SERVICE,
    payload: {
      loading: false,
      serviceData: serviceData,
      error: null
    }
  };
};

export const setServicesImages = (serviceImages = []) => {
  return {
    type: SET_SERVICES_IMAGES,
    payload: {
      loading: false,
      serviceImages: serviceImages,
      error: null
    }
  };
};

export const clearServiceData = () => {
  return {
    type: CLEAR_SERVICES_DATA,
    payload: {
      loading: false,
      serviceData: {},
      serviceImages: [],
      error: null
    }
  };
};

