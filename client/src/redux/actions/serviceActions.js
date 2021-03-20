// @flow
import axios from "axios";
import { serviceConstants } from "./../constants";
import { operationSuccessful, setAppError } from "./appGeneralActions";
// flow types //
import type { 
  ServiceImgData, ServiceData, ServiceState,
  ServiceImgUplSuccess, ServiceImgDelSuccess,
  ServiceAPIRequest, ServiceCreated, ServiceUpdated, ServiceDeleted,
  OpenService, SetServices, ClearServiceData, SetServiceImages, ServiceError,
  ClientServiceFormData, TakeServiceOnline, TakeServiceOffline, ToggleAllServicesOnlineOffline,
  ServiceAction
} from "../reducers/service/flowTypes";
import type { Dispatch } from "../reducers/_helpers/createReducer";
// helpers //
import { normalizeErrorMessages, setAxiosError } from "./helpers/errorHelpers";
import { generateEmptyService } from "../reducers/_helpers/emptyDataGenerators";

export const serviceImgUploadSuccess = (data : { status: number, loading: boolean, responseMsg: string, serviceImages: Array<ServiceImgData>, updatedService: ServiceData, createdServices: Array<ServiceData> }): ServiceImgUplSuccess => {
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

export const serviceCreated = (data : { status: number, loading: boolean, responseMsg: string, newServiceData: ServiceData }): ServiceCreated => {
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

export const setServices = (data : { status: number, loading: boolean, responseMsg: string, createdServices: Array<ServiceData>, numberOfServices: number }): SetServices => {
  return {
    type: "SetServices",
    payload: data
  };
};

export const serviceUpdated = (data : { status: number, loading: boolean, responseMsg: string, serviceData: ServiceData, createdServices: Array<ServiceData> }): ServiceUpdated => {
  return {
    type: "ServiceUpdated",
    payload: data
  };
};

export const serviceDeleted = (data : { status: number, loading: boolean, responseMsg: string, serviceData: ServiceData, createdServices: Array<ServiceData>, numberOfServices: number }): ServiceDeleted => {
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

export const takeServiceOnlineAction = (data : { status: number, loading: boolean, responseMsg: string, updatedService: ServiceData, createdServices: Array<ServiceData> }): TakeServiceOnline => {
  return {
    type: "TakeServiceOnline",
    payload: data
  };
};
export const takeServiceOfflineAction = (data: { status: number, loading: boolean, responseMsg: string, updatedService: ServiceData, createdServices: Array<ServiceData> }): TakeServiceOffline => {
  return {
    type: "TakeServiceOffline",
    payload: data
  };
};

export const toggleAllServicesOnlineOfflineAction = (data: { status: number, loading: boolean, responseMsg: string, updatedServices: Array<ServiceData> }): ToggleAllServicesOnlineOffline => {
  return {
    type: "ToggleAllServicesOnlineOffline",
    payload: data
  }
} 

export const uploadServiceImage = (dispatch: Dispatch<ServiceAction>, file: FormData, currentServiceState: ServiceState): Promise<boolean> => {
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
        updatedService: updatedServiceData ? updatedServiceData : serviceData,
        createdServices: updatedServices ? updatedServices : createdServices,
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

export const deleteServiceImage = (dispatch: Dispatch<ServiceAction>, imageId: string, currentServiceState: ServiceState): Promise<boolean> => {
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

export const handleNewService= (dispatch: Dispatch<ServiceAction>, hotelServiceData : { serviceType: string, price: string, description: string, images: Array<ServiceImgData> }): Promise<boolean> => {
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
        newServiceData: newService,
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

export const fetchServices = (dispatch: Dispatch<ServiceAction>): Promise<boolean> => {
  const requestOptions = {
    method: "get",
    url: "/api/services"
  };
  dispatch(serviceRequest());

  return axios(requestOptions)
    .then((response) => {
      const { status, data } = response;
      const { responseMsg, services } : { responseMsg: string, services: Array<ServiceData>} = data;
      const stateData = {
        status: status,
        loading: false,
        responseMsg: responseMsg,
        createdServices: services,
        numberOfServices: services.length
      };
      dispatch(setServices(stateData))
      return Promise.resolve(true);
    })
    .catch((error) => {
      dispatch(serviceError(error));
      return Promise.resolve(false);
    });
};

export const updateHotelService = (dispatch: Dispatch<ServiceAction>, serviceData: ClientServiceFormData, serviceState: ServiceState): Promise<boolean> => {
  const serviceId = serviceData._id; 
  const currentServices = serviceState.createdServices;
  const serviceImages = serviceState.serviceImages;
  const requestOptions = {
    method: "patch",
    url: "/api/services/" + (serviceId || ""),
    data: {
      serviceData: serviceData,
      serviceImages: serviceImages
    }
  }
  dispatch(serviceRequest());
  return axios(requestOptions)
    .then((response) => {
      const { status, data } = response;
      const { responseMsg, updatedService } : { responseMsg: string, updatedService: ServiceData } = data;
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
        serviceImages: [ ...updatedService.images ],
        createdServices: [ ...updatedServices ],
      };
      dispatch(serviceUpdated(serviceStateData));
      return true;
    })
    .catch((error) => {
      dispatch(serviceError(error));
      return false;
    });
};

export const deleteService = (dispatch: Dispatch<ServiceAction>, serviceId: string, serviceState: ServiceState): Promise<boolean> => {
  const currentServices = serviceState.createdServices;
  const requestOptions = {
    method: "delete",
    url: "/api/services/" + serviceId,
  };

  dispatch(serviceRequest());
  return axios(requestOptions)
    .then((response) => {
      const { status, data } = response;
      const { responseMsg, deletedService } : { responseMsg: string, deletedService: ServiceData } = data;

      const updatedServices = currentServices.filter((service) => {
        return deletedService._id !== service._id;
      });

      const serviceStateData = {
        status: status,
        loading: false,
        responseMsg: responseMsg,
        serviceData: generateEmptyService(),
        serviceImages: [],
        createdServices: updatedServices,
        numberOfServices: updatedServices.length
      };
      dispatch(serviceDeleted(serviceStateData));
      return true;
    })
    .catch((error) => {
      dispatch(serviceError(error));
      return false;
    });
};

// take online and offline //
// can probably be refactored into a single action eh?? //
// definitely will redo into one function //
export const takeServiceOnline = (dispatch: Dispatch<ServiceAction>, serviceToActivate: ServiceData, serviceState: ServiceState): Promise<boolean> => {
  const { _id: serviceId } = serviceToActivate;
  const { createdServices } = serviceState;
  const axiosRequest = {
    url: "/api/services/" + serviceId,
    method: "patch",
    data: {
      changeOnlineStatus: {
        status: true
      }
    }
  };
  dispatch(serviceRequest());

  return axios(axiosRequest)
    .then((response) => {
      const { status, data } = response;
      const { responseMsg, updatedService } : { responseMsg: string, updatedService: ServiceData } = data;

      const updatedServiceData = { ...updatedService, images: [ ...updatedService.images ]};
      const updatedServicesArray = createdServices.map((service) => {
        if (service._id === updatedServiceData._id) {
          return updatedServiceData;
        } else {
          return service;
        }
      });

      const stateData = {
        status: status,
        responseMsg: responseMsg,
        loading: false,
        updatedService: updatedServiceData,
        createdServices: updatedServicesArray
      };
      dispatch(takeServiceOnlineAction(stateData))
      return Promise.resolve(true);
    })
    .catch((error) => {
      dispatch(serviceError(error));
      return Promise.resolve(false);
    });
};

export const takeServiceOffline = (dispatch: Dispatch<ServiceAction>, serviceToDeactivate: ServiceData, serviceState: ServiceState): Promise<boolean> => {
  const { _id: serviceId } = serviceToDeactivate;
  const { createdServices } = serviceState;
  const axiosRequest = {
    url: "/api/services/" + serviceId,
    method: "patch",
    data: {
      changeOnlineStatus: {
        status: false
      }
    }
  };
  dispatch(serviceRequest());

  return axios(axiosRequest)
    .then((response) => {
      const { status, data } = response;
      const { responseMsg, updatedService } : { responseMsg: string, updatedService: ServiceData } = data;

      const updatedServiceData = { ...updatedService, images: [ ...updatedService.images ]};
      const updatedServicesArray = createdServices.map((service) => {
        if (service._id === updatedServiceData._id) {
          return updatedServiceData;
        } else {
          return service;
        }
      });

      const stateData = {
        status: status,
        responseMsg: responseMsg,
        loading: false,
        updatedService: updatedServiceData,
        createdServices: updatedServicesArray
      };
      dispatch(takeServiceOnlineAction(stateData))
      return Promise.resolve(true);
    })
    .catch((error) => {
      dispatch(serviceError(error));
      return Promise.resolve(false);
    });
};

export const toggleAllServicesOnlineStatus = (dispatch: Dispatch<ServiceAction> , newStatus: boolean): Promise<boolean> => {
  const axiosRequest = {
    url: "/api/services/",
    method: "patch",
    data: {
      changeAllOnlineStatus: {
        status: newStatus
      }
    }
  };

  dispatch(serviceRequest());
  return axios(axiosRequest)
    .then((response) => {
      const { status, data } = response;
      const { responseMsg, updatedServices } : { responseMsg: string, updatedServices: Array<ServiceData> } = data;

      const updatedState = { status: status, loading: false, responseMsg: responseMsg, updatedServices: updatedServices };
      dispatch(toggleAllServicesOnlineOfflineAction(updatedState));
      return Promise.resolve(true);
    })
    .catch((error) => {
      console.error(error)
      dispatch(serviceError(error));
      return Promise.resolve(false);
    });
};
