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

export const uploadServiceImage = (dispatch, file) => {
  const requestOptions = {
    method: "post",
    url: "/api/uploadServiceImage",
    headers: {
      'content-type': 'multipart/form-data'
    },
    data: file
  }
  dispatch(uploadRequest());
  return axios(requestOptions)
    .then((response) => {
      const { status, data } = response;
      const { responseMsg, newImage } = data;
      const stateData = {
        status: status,
        loading: false,
        responseMsg: responseMsg,
        newImage: newImage,
        error: null
      };
      dispatch(serviceImgUploadSucess(stateData));
      return Promise.resolve(true);
    })
    .catch((error) => {
      console.error(error);
      dispatch(serviceImgUploadError(error));
      return Promise.resolve(false);
    });
};

export const deleteServiceImage = (dispatch, imageId, oldImageState = []) => {
  const requestOptions = {
    method: "delete",
    url: "/api/deleteServiceImage/" + imageId
  };
  dispatch(serviceRequest());
  return axios(requestOptions)
    .then((response) => {
      const { status, data } = response;
      const { responseMsg } = data;
      const newImageState = oldImageState.filter((image) => imageId != image._id)
      const stateData = {
        status: status,
        loading: false,
        responseMsg: responseMsg,
        serviceImages: newImageState,
        error: null
      };
      dispatch(serviceImgDeleteSuccess(stateData));
    })
    .catch((error) => {
      console.error(error);
      dispatch(serviceImgUploadError(error));
    });
};

export const handleNewService= (dispatch, hotelServiceData, history) => {
  const requestOptions = {
    method: "post",
    url: "/api/createRoom",
    data: {
      hotelServiceData: hotelServiceData,
    }
  };
  dispatch(serviceRequest());
  return axios(requestOptions)
    .then((response) => {
      const { status, data } = response;
      const { responseMsg, newService } = data;
      const stateData = {
        status: status,
        loading: false,
        responseMsg: responseMsg,
        serviceData: newService,
        serviceImages: newService.images,
        error: null
      };
      dispatch(serviceCreated(stateData));
      dispatch(addNewService(newService));
      history.push("/admin/rooms");
    })
    .catch((error) => {
      console.error(error);
      dispatch(serviceError(error));
    });
};

export const fetchServices = (dispatch) => {
  const requestOptions = {
    method: "get",
    url: "/api/hotelServices"
  };
  dispatch(roomRequest());
  return axios(requestOptions)
    .then((response) => {
      const { status, data } = response;
      const { responseMsg, services } = data;
      const stateData = {
        status: status,
        loading: false,
        responseMsg: responseMsg,
        createdServices: services,
        error: null
      };
      dispatch(setServices(stateData))
    })
    .catch((error) => {
      console.error(error);
      dispatch(serviceError(error));
    });
};
