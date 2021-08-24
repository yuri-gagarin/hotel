// @flow
import axios from "axios";
// flow types //
import type { 
  ServiceImgData, ServiceData, ServiceState,
  ServiceImgUplSuccess, ServiceImgDelSuccess, DeleteAllServiceImages,
  ServiceAPIRequest, ServiceCreated, ServiceUpdated, ServiceDeleted,
  OpenService, SetServices, ClearServiceData, SetServiceImages, ServiceError,
  ClientServiceFormData, ToggleServiceOnlineOffline, ToggleAllServicesOnlineOffline,
  ServiceAction
} from "../reducers/service/flowTypes";
import type { Dispatch } from "../reducers/_helpers/createReducer";
// helpers //
import { normalizeErrorMessages, setAxiosError } from "./helpers/errorHelpers";
import { generateEmptyService } from "../reducers/_helpers/emptyDataGenerators";

/* API request actions and error */
const serviceAPIRequest = (): ServiceAPIRequest => {
  return {
    type: "ServiceAPIRequest",
    payload: {
      status: 202,
      loading: true,
      error: null
    }
  };
};
const serviceError = ({ status, responseMsg, error }: { status: number, responseMsg: string, error: Error }): ServiceError => {
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

/* CRUD API actions */
const serviceCreated = (data: { status: number, responseMsg: string, newServiceData: ServiceData }): ServiceCreated => {
  return {
    type: "ServiceCreated",
    payload: { ...data, loading: false }
  };
};
const serviceUpdated = (data: { status: number, responseMsg: string, serviceData: ServiceData, createdServices: Array<ServiceData> }): ServiceUpdated => {
  return {
    type: "ServiceUpdated",
    payload: { ...data, loading: false }
  };
};
const serviceDeleted = (data: { status: number, responseMsg: string, serviceData: ServiceData, createdServices: Array<ServiceData>, numberOfServices: number }): ServiceDeleted => {
  return {
    type: "ServiceDeleted",
    payload: { ...data, loading: false }
  };
};
/* */

/* image upload api actions */
const serviceImgUploadSuccess = (data: { status: number, responseMsg: string, serviceImages: Array<ServiceImgData>, updatedService: ServiceData, createdServices: Array<ServiceData> }): ServiceImgUplSuccess => {
  return {
    type: "ServiceImgUplSuccess",
    payload: { ...data, loading: false }
  };
};

const serviceImgDeleteSuccess = (data: { status: number, responseMsg: string, serviceImages: Array<ServiceImgData>, updatedService: ServiceData, createdServices: Array<ServiceData> }): ServiceImgDelSuccess => {
  return {
    type: "ServiceImgDelSuccess",
    payload: { ...data, loading: false }
  };
};

const deleteAllServiceImages = (data: { status: number, responseMsg: string, updatedServiceImages: Array<ServiceImgData> }): DeleteAllServiceImages => {
  return {
    type: "DeleteAllServiceImages",
    payload: { ...data, loading: false }
  };
};

/* online offline actions */
const toggleServiceOnlineOffline = (data: { status: number, responseMsg: string, updatedService: ServiceData, updatedServicesArr: Array<ServiceData> }): ToggleServiceOnlineOffline => {
  return {
    type: "ToggleServiceOnlineOffline",
    payload: { ...data, loading: false }
  };
};
 const toggleAllServicesOnlineOfflineAction = (data: { status: number, responseMsg: string, updatedServices: Array<ServiceData> }): ToggleAllServicesOnlineOffline => {
  return {
    type: "ToggleAllServicesOnlineOffline",
    payload: { ...data, loading: false }
  };
};

/* non API actions */
const setServices = (data: { status: number, responseMsg: string, createdServices: Array<ServiceData>, numberOfServices: number }): SetServices => {
  return {
    type: "SetServices",
    payload: { ...data, loading: false }
  };
};
const openService = (data: { serviceImages: Array<ServiceImgData>, serviceData: ServiceData }): OpenService => {
  return {
    type: "OpenService",
    payload: { ...data }
  };
};
const setServicesImages = (serviceImages: Array<ServiceImgData>): SetServiceImages => {
  return {
    type: "SetServiceImages",
    payload: { serviceImages }
  };
};
const clearServiceData = (data: { serviceImages: Array<ServiceImgData>, serviceData: ServiceData }): ClearServiceData => {
  return {
    type: "ClearServiceData",
    payload: { ...data }
  };
};
/* */

/* action exports */
/* non API related requests */
export const handleOpenService = (dispatch: Dispatch<ServiceAction>, serviceIdToOpen: string, currentServiceState: ServiceState): void => {
  const serviceDataToOpen = currentServiceState.createdServices.filter((service) => service._id === serviceIdToOpen)[0];
  const stateUpdateData = {
    serviceData: { ...serviceDataToOpen, images: [ ...serviceDataToOpen.images ]},
    serviceImages: [ ...serviceDataToOpen.images ]
  };
  dispatch(openService(stateUpdateData));
};
export const handleClearServiceData = (dispatch: Dispatch<ServiceAction>): void => {
  dispatch(clearServiceData({ serviceData: generateEmptyService(), serviceImages: [] }));
};

/* API related requests */
/* Service CRUD related method requests */
export const handleCreateNewService= (dispatch: Dispatch<ServiceAction>, clientServiceFormData: ClientServiceFormData): Promise<boolean> => {
  const requestOptions = {
    method: "post",
    url: "/api/services/create_new_service",
    data: {
      clientServiceData: clientServiceFormData,
      serviceImages: clientServiceFormData.images ? [ ...clientServiceFormData.images ] : null
    }
  };

  dispatch(serviceAPIRequest());
  return axios(requestOptions)
    .then((response) => {
      const { status, data } = response;
      const { responseMsg, newService }: { responseMsg: string, newService: ServiceData } = data;
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

export const handleUpdateService = (dispatch: Dispatch<ServiceAction>, serviceData: ClientServiceFormData, serviceState: ServiceState): Promise<boolean> => {
  const serviceId = serviceData._id; 
  const { createdServices, serviceImages } = serviceState;
  const requestOptions = {
    method: "patch",
    url: "/api/services/" + (serviceId || ""),
    data: {
      serviceData: serviceData,
      serviceImages: serviceImages
    }
  }
  dispatch(serviceAPIRequest());
  return axios(requestOptions)
    .then((response) => {
      const { status, data } = response;
      const { responseMsg, updatedService }: { responseMsg: string, updatedService: ServiceData } = data;
      const updatedServices = createdServices.map((service) => {
        if (service._id == updatedService._id) {
          return { ...updatedService, images: [ ...updatedService.images ] };
        } else {
          return service;
        }
      });
      const serviceStateData = { 
        status, 
        responseMsg, 
        serviceData: updatedService, 
        serviceImages: [ ...updatedService.images ], 
        createdServices: updatedServices,
      };
      dispatch(serviceUpdated(serviceStateData));
      return true;
    })
    .catch((error) => {
      dispatch(serviceError(error));
      return false;
    });
};

export const handleDeleteService = (dispatch: Dispatch<ServiceAction>, serviceId: string, serviceState: ServiceState): Promise<boolean> => {
  const currentServices = serviceState.createdServices;
  const requestOptions = {
    method: "delete",
    url: "/api/services/" + serviceId,
  };

  dispatch(serviceAPIRequest());
  return axios(requestOptions)
    .then((response) => {
      const { status, data } = response;
      const { responseMsg, deletedService }: { responseMsg: string, deletedService: ServiceData } = data;

      const updatedServices = currentServices.filter((service) => {
        return deletedService._id !== service._id;
      });

      const serviceStateData = {
        status,
        responseMsg,
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

/* non CRUD fetch API actions */
export const handleFetchServices = (dispatch: Dispatch<ServiceAction>): Promise<boolean> => {
  const requestOptions = {
    method: "get",
    url: "/api/services"
  };
  dispatch(serviceAPIRequest());

  return axios(requestOptions)
    .then((response) => {
      const { status, data } = response;
      const { responseMsg, services }: { responseMsg: string, services: Array<ServiceData>} = data;
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

/* Image upload, delete API actions */
export const handleUploadServiceImage = (dispatch: Dispatch<ServiceAction>, file: FormData, currentServiceState: ServiceState): Promise<boolean> => {
  const { serviceData, serviceImages, createdServices }: { serviceData: ServiceData, serviceImages: Array<ServiceImgData>, createdServices: Array<ServiceData> } = currentServiceState;
  const { _id : serviceId } = serviceData;
  const requestOptions = {
    method: "post",
    url: "/api/services/upload_service_image/" + (serviceId ? serviceId : ""),
    headers: {
      'content-type': 'multipart/form-data'
    },
    data: file
  }
  dispatch(serviceAPIRequest());
  return axios(requestOptions)
    .then((response) => {
      const { status, data } = response;
      const { responseMsg, newImage, updatedService }: { responseMsg: string, newImage: ServiceImgData, updatedService: ServiceData } = data;
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
      const { status, responseMsg, error, errorMessages }: { status: number, responseMsg: string, error: Error, errorMessages: Array<any> } = setAxiosError(err);
      dispatch(serviceError({ status, responseMsg, error }));
      return false;
    });
};

export const handleDeleteServiceImage = (dispatch: Dispatch<ServiceAction>, imageId: string, currentServiceState: ServiceState): Promise<boolean> => {
  const { serviceData, serviceImages, createdServices }: { serviceData: ServiceData, serviceImages: Array<ServiceImgData>, createdServices: Array<ServiceData> } = currentServiceState;

  const requestOptions = {
    method: "delete",
    url: "/api/services/delete_service_image/" + imageId
  };
  dispatch(serviceAPIRequest());

  return axios(requestOptions)
    .then((response) => {
      const { status, data } = response;
      const { responseMsg, deletedImage, updatedService }: { responseMsg: string, deletedImage: ServiceImgData, updatedService: ServiceData } = data;
      const { _id: deletedImgId, hotelService: serviceId } = deletedImage
      // filter new state //
      const newImageState = serviceImages.filter((image) => deletedImgId !== image._id);
      const newCreatedServicesState = createdServices.map((service) => service._id === serviceId ? updatedService : service);

      const stateData = {
        status: status,
        responseMsg: responseMsg,
        serviceImages: newImageState,
        updatedService: updatedService,
        createdServices: newCreatedServicesState
      };
      dispatch(serviceImgDeleteSuccess(stateData));
      return true;
    })
    .catch((err) => {
      const { status, responseMsg, error, errorMessages }: { status: number, responseMsg: string, error: Error, errorMessages: Array<any> } = setAxiosError(err);
      dispatch(serviceError({ status, responseMsg, error }));
      return false;
    });
};

export const handleDeleteAllServiceImages = (dispatch: Dispatch<ServiceAction>, currentServiceState: ServiceState): Promise<boolean> => {
  const { serviceImages } = currentServiceState;
  const axiosRequest = {
    method: "delete",
    url: "/api/services/remove_all_images",
    data: {
      serviceImages: serviceImages
    }
  };
  
  console.log(serviceImages);
  return axios(axiosRequest)
    .then((response) => {
      const { status, data } = response;
      const { responseMsg }: { responseMsg: string } = data;

      const updatedState = { status, responseMsg, updatedServiceImages: [] };
      dispatch(deleteAllServiceImages(updatedState));
      return Promise.resolve(true);
    })
    .catch((error) => {
      console.error(error);
      dispatch(serviceError(error));
      return Promise.resolve(true);
    })
}

// take online and offline API actions //
export const handleToggleServiceOnlineOffline = (dispatch: Dispatch<ServiceAction>, serviceToUpdate: ServiceData, serviceState: ServiceState): Promise<boolean> => {
  const { _id: serviceId, live } = serviceToUpdate;
  const { createdServices } = serviceState;
  const axiosRequest = {
    url: "/api/services/" + serviceId,
    method: "patch",
    data: {
      onlineStatus: { status: !live }
    }
  };
  dispatch(serviceAPIRequest());

  return axios(axiosRequest)
    .then((response) => {
      const { status, data } = response;
      const { responseMsg, updatedService }: { responseMsg: string, updatedService: ServiceData } = data;

      const updatedServiceData = { ...updatedService };
      const updatedServicesArr = createdServices.map((service) => {
        if (service._id === updatedServiceData._id) {
          return { ...updatedServiceData };
        } else {
          return service;
        }
      });

      const stateData = { status, responseMsg, updatedService, updatedServicesArr };
      dispatch(toggleServiceOnlineOffline(stateData))
      return Promise.resolve(true);
    })
    .catch((error) => {
      dispatch(serviceError(error));
      return Promise.resolve(false);
    });
};

export const handleToggleAllServicesOnlineStatus = (dispatch: Dispatch<ServiceAction> , newStatus: boolean): Promise<boolean> => {
  const axiosRequest = {
    url: "/api/services/",
    method: "patch",
    data: {
      changeAllOnlineStatus: {
        status: newStatus
      }
    }
  };

  dispatch(serviceAPIRequest());
  return axios(axiosRequest)
    .then((response) => {
      const { status, data } = response;
      const { responseMsg, updatedServices }: { responseMsg: string, updatedServices: Array<ServiceData> } = data;

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
