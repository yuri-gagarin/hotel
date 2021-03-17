// @flow
import axios from "axios";
import { serviceConstants } from "./../constants";
import { operationSuccessful, setAppError } from "./appGeneralActions";
// flow types //
import type { 
  ServiceImgData, ServiceData, ServiceState,
  ServiceImgUplSuccess, ServiceImgDelSuccess,
  ServiceAPIRequest, ServiceCreated, ServiceUpdated, ServiceDeleted,
  OpenService, SetServices, ClearServiceData, SetServiceImages, ServiceError
} from "../reducers/service/flowTypes";
import type { Dispatch } from "../reducers/_helpers/createReducer";
// helpers //
import { normalizeErrorMessages, setAxiosError } from "./helpers/errorHelpers";
import { generateEmptyService } from "../reducers/_helpers/emptyDataGenerators";

export const serviceImgUploadSuccess = (data : { status: number, loading: boolean, responseMsg: string, serviceImages: Array<ServiceImgData>, updatedService: ServiceData | null, createdServices: Array<ServiceData> | null }): ServiceImgUplSuccess => {
  return {
    type: "ServiceImgUplSuccess",
    payload: data
  };
};

export const serviceImgDeleteSuccess = (data : { status: number, loading: boolean, responseMsg: string, serviceImages: Array<ServiceImgData>, updatedService: ServiceData, createdServices: Array<ServiceData> }): ServiceImgDelSuccess => {
  return {
    type: "ServiceImgDelSuccess",
    payload: data
  };
};


export const serviceRequest = (): ServiceAPIRequest => {
  return {
    type: "ServiceAPIRequest",
    payload: {
      status: 202,
      loading: true,
      error: null
    }
  };
};

export const serviceCreated = (data : { status: number, loading: boolean, responseMsg: string, serviceData: ServiceData, createdServices: Array<ServiceData>, serviceImages: Array<ServiceImgData> }): ServiceCreated => {
  return {
    type: "ServiceCreated",
    payload: data
  };
};
/*
export const addNewService = (data: { status: number, loading: boolean, responseMsg: string, }) => {
  console.log(newService);
  return {
    type: ADD_SERVICE_TO_STATE,
    payload: {
      newService: newService
    }
  };
};   
*/

export const setServices = (createdServices: Array<ServiceData>): SetServices => {
  return {
    type: "SetServices",
    payload: {
      createdServices: createdServices
    }
  };
};

export const serviceUpdated = (data : { status: number, loading: boolean, responseMsg: string, serviceData: ServiceData, createdServices: Array<ServiceData> }): ServiceUpdated => {
  return {
    type: "ServiceUpdated",
    payload: data
  };
};

export const serviceDeleted = (data : { status: number, loading: boolean, responseMsg: string, serviceData: ServiceData | null, createdServices: Array<ServiceData> }): ServiceDeleted => {
  return {
    type: "ServiceDeleted",
    payload: data
  };
};

export const serviceError = ({ status, responseMsg, error } : { status: number, responseMsg: string, error: Error }): ServiceError => {
  console.error(error);
  return {
    type: "ServiceError",
    payload: {
      status: status,
      responseMsg: responseMsg,
      error: error
    }
  };
};

export const openService = (services: Array<ServiceData>, serviceId: string): OpenService => {
  const serviceData = services.filter((service) => service._id == serviceId)[0];
  return {
    type: "OpenService",
    payload: {
      serviceData: serviceData,
      serviceImages: serviceData.images,
    }
  };
};

export const setServicesImages = (serviceImages: Array<ServiceImgData>): SetServiceImages => {
  return {
    type: "SetServiceImages",
    payload: {
      serviceImages: serviceImages,
    }
  };
};

export const clearServiceData = (): ClearServiceData => {
  return {
    type: "ClearServiceData",
    payload: {
      loading: false,
      serviceData: generateEmptyService(),
      serviceImages: [],
      error: null
    }
  };
};

export const uploadServiceImage = (dispatch: Dispatch, file: File, currentServiceState: ServiceState): Promise<boolean> => {
  const { serviceData, serviceImages, createdServices } : { serviceData: ServiceData, serviceImages: Array<ServiceImgData>, createdServices: Array<ServiceData> } = currentServiceState;
  const { _id : serviceId } = serviceData;
  const requestOptions = {
    method: "post",
    url: "/api/services/uploadServiceImage/" + serviceId,
    headers: {
      'content-type': 'multipart/form-data'
    },
    data: file
  }
  dispatch(serviceRequest());
  return axios(requestOptions)
    .then((response) => {
      const { status, data } = response;
      const { responseMsg, newImage, updatedService } : { responseMsg: string, newImage: ServiceImgData, updatedService: ServiceData } = data;
      let updatedServiceData;
      let updatedServices;
      let updatedServiceImages: Array<ServiceImgData> = [ ...serviceImages, newImage ];

      if (updatedService) {
        // image being uploaded on a created service //
        // update serviceData and createdServices array //
        updatedServices = createdServices.map((service) => {
          if (service._id === updatedService._id) {
            return updatedService;
          } else {
            return service;
          }
        });
        updatedServiceData = { ...updatedService };
      }
      // image being uploaded on a new service //
      const stateData = {
        status: status,
        loading: false,
        responseMsg: responseMsg,
        serviceImages: updatedServiceImages,
        updatedService: updatedServiceData ? updatedServiceData : null,
        createdServices: updatedServices ? updatedServices : null
      };
      dispatch(serviceImgUploadSuccess(stateData));
      return true;
    })
    .catch((err) => {
      const { status, responseMsg, error, errorMessages } : { status: number, responseMsg: string, error: Error, errorMessages: Array<any> } = setAxiosError(err);
      dispatch(serviceError({ status, responseMsg, error }));
      return false;
    });
};

export const deleteServiceImage = (dispatch: Dispatch, imageId: string, currentServiceState: ServiceState): Promise<boolean> => {
  const { serviceData, serviceImages, createdServices } : { serviceData: ServiceData, serviceImages: Array<ServiceImgData>, createdServices: Array<ServiceData> } = currentServiceState;

  const requestOptions = {
    method: "delete",
    url: "/api/services/deleteServiceImage/" + imageId
  };
  dispatch(serviceRequest());

  return axios(requestOptions)
    .then((response) => {
      const { status, data } = response;
      const { responseMsg, deletedImage, updatedService } : { responseMsg: string, deletedImage: ServiceImgData, updatedService: ServiceData } = data;
      const { _id: deletedImgId, hotelService: serviceId } = deletedImage
      // filter new state //
      const newImageState = serviceImages.filter((image) => deletedImgId !== image._id);
      const newCreatedServicesState = createdServices.map((service) => service._id === serviceId ? updatedService : service);

      const stateData = {
        status: status,
        loading: false,
        responseMsg: responseMsg,
        serviceImages: newImageState,
        updatedService: updatedService,
        createdServices: newCreatedServicesState
      };
      dispatch(serviceImgDeleteSuccess(stateData));
      return true;
    })
    .catch((err) => {
      const { status, responseMsg, error, errorMessages } : { status: number, responseMsg: string, error: Error, errorMessages: Array<any> } = setAxiosError(err);
      dispatch(serviceError({ status, responseMsg, error }));
      return false;
    });
};

export const handleNewService= (dispatch: Dispatch, hotelServiceData : { serviceType: string, price: string, description: string, serviceImages: Array<ServiceImgData> }): Promise<boolean> => {
  const requestOptions = {
    method: "post",
    url: "/api/services/createHotelService",
    data: {
      hotelServiceData: hotelServiceData,
    }
  };
  dispatch(serviceRequest());
  return axios(requestOptions)
    .then((response) => {
      const { status, data } = response;
      const { responseMsg, newService } : { responseMsg: string, newService: ServiceData } = data;
      const stateData = {
        status: status,
        loading: false,
        responseMsg: responseMsg,
        serviceData: newService,
        serviceImages: [ ...newService.images ],
      };
      dispatch(serviceCreated(stateData));
      return true;
    })
    .catch((err) => {
      const { status, responseMsg, errorMessages, error } = setAxiosError(err);
      dispatch(serviceError({ status, responseMsg, error }));
      return false;
  });
   
};

export const fetchServices = (dispatch) => {
  console.log("calling feth")
  const requestOptions = {
    method: "get",
    url: "/api/services"
  };
  dispatch(serviceRequest());
  return axios(requestOptions)
    .then((response) => {
      const { status, data } = response;
      const { responseMsg, services } = data;
      const stateData = {
        status: status,
        loading: false,
        responseMsg: responseMsg,
        createdServices: services || [],
        error: null
      };
      dispatch(setServices(stateData))
    })
    .catch((error) => {
      console.error(error);
      dispatch(serviceError(error));
    });
};

export const updateHotelService = (dispatch, serviceData, serviceImages = [], currentServices = []) => {
  const serviceId = serviceData._id
  const requestOptions = {
    method: "patch",
    url: "/api/services/" + serviceId,
    data: {
      serviceData: serviceData,
      serviceImages: serviceImages
    }
  }
  dispatch(serviceRequest());
  return axios(requestOptions)
    .then((response) => {
      const { status, data } = response;
      const { responseMsg, updatedService } = data;
      const updatedServices = currentServices.map((service) => {
        if (service._id == updatedService._id) {
          return {
            ...updatedService
          };
        } else {
          return service;
        }
      });
      const serviceStateData = {
        status: status,
        loading: false,
        responseMsg: responseMsg,
        serviceData: updatedService,
        serviceImages: updatedService.images,
        createdServices: updatedServices,
        error: null
      };
      dispatch(serviceUpdated(serviceStateData));
      dispatch(operationSuccessful({ status: status, responseMsg: responseMsg }));
      return true;
    })
    .catch((error) => {
      console.error(error);
      dispatch(serviceError(error));
      dispatch(setAppError({ status: 500, responseMsg: "An error occured", error: error }));
      return false;
    });
};

export const deleteService = (dispatch, serviceId, currentServices = []) => {
  const serviceImages = currentServices.filter((service) => serviceId == service._id)[0].images;
  const requestOptions = {
    method: "delete",
    url: "/api/services/" + serviceId,
    data: {
      serviceImages: serviceImages
    }
  };
  dispatch(serviceRequest());
  return axios(requestOptions)
    .then((response) => {
      const { status, data } = response;
      const { responseMsg, deletedService } = data;
      const updatedServices = currentServices.filter((service) => {
        return deletedService._id != service._id;
      });
      const serviceStateData = {
        status: status,
        loading: false,
        responseMsg: responseMsg,
        serviceData: {},
        serviceImages: [],
        createdServices: updatedServices,
        error: null
      };
      dispatch(serviceDeleted(serviceStateData));
      dispatch(operationSuccessful({ status: status, responseMsg: responseMsg }));
      return true;
    })
    .catch((error) => {
      dispatch(serviceError(error));
      dispatch(setAppError(({ status: 500, responseMsg: error.message, error: error })));
      return false;
    });
};
