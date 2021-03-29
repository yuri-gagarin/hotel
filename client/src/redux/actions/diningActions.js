// @flow 
import axios from "axios";
import type { 
  DiningEntertainmentState, ClientDiningEntFormData,
  DiningEntModelAPIRequest, DiningEntModelError, SetDiningEntModels, DiningEntModelCreated, DiningEntModelUpdated, DiningEntModelDeleted, DiningEntModelData,
  OpenDiningEntModel, ClearDiningEntModelData, DiningImgData, MenuImageData, SetDiningEntModelImages, DiningEntModelImgUplSuccess, DiningEntModelImgDelSuccess, MenuImgUplSuccess, MenuImgDelSuccess, DiningEntModelAction
} from "../reducers/dining_entertainment/flowTypes";
import type { Dispatch } from "../reducers/_helpers/createReducer";
// helpers //
import { generateEmptyDiningEntModel } from "../reducers/_helpers/emptyDataGenerators";

/* API request actions and error handling */
const diningModelAPIRequest = (): DiningEntModelAPIRequest => {
  return {
    type: "DiningEntModelAPIRequest",
    payload: {
      status: 202,
      loading: true,
      error: null
    }
  };
};
const diningModelError = ({ responseMsg, error } : { responseMsg: string, error: any }): DiningEntModelError => {
  return {
    type: "DiningEntModelError",
    payload: {
      status: 500,
      responseMsg: responseMsg,
      loading: false,
      error: error
    }
  };
};
/* */

/* CRUD actions */
const diningModelCreated = (stateData: { status: number, responseMsg: string, newDiningEntModelData: DiningEntModelData }): DiningEntModelCreated => {
  return {
    type: "DiningEntModelCreated",
    payload: { ...stateData, loading: false }
  };
};

const diningModelUpdated = (stateData: { status: number, responseMsg: string, updatedDiningEntModelData: DiningEntModelData, updatedDiningEntModelsArr: Array<DiningEntModelData> }): DiningEntModelUpdated => {
  return {
    type: "DiningEntModelUpdated",
    payload: { ...stateData, loading: false }
  };
};

const diningModelDeleted = (stateData: { status: number, responseMsg: string, updatedDiningEntModelsArr: Array<DiningEntModelData> }): DiningEntModelDeleted => {
  return {
    type: "DiningEntModelDeleted",
    payload: { ...stateData, loading: false, numberOfDiningEntModels: stateData.updatedDiningEntModelsArr.length }
  };
};
/* */

/* image upload api actions */
const diningModelImgUploadSuccess = (stateData: { status: number, responseMsg: string, diningEntImages: Array<DiningImgData>, updatedDiningEntModel: DiningEntModelData, updatedDiningEntModelsArr: Array<DiningEntModelData> }): DiningEntModelImgUplSuccess => {
  return {
    type: "DiningEntModelImgUplSuccess",
    payload: { ...stateData, loading: false }
  };
};
const diningModelImgDeleteSuccess = (stateData: { status: number, responseMsg: string, diningEntImages: Array<DiningImgData>, updatedDiningEntModel: DiningEntModelData, updatedDiningEntModelsArr: Array<DiningEntModelData> }): DiningEntModelImgDelSuccess => {
  return {
    type: "DiningEntModelImgDelSuccess",
    payload: { ...stateData, loading: false }
  };
};

const menuImgUploadSuccess = (stateData: { status: number, responseMsg: string, updatedMenuImages: Array<MenuImageData>, updatedDiningEntModel: DiningEntModelData, updatedDiningEntModelsArr: Array<DiningEntModelData> }): MenuImgUplSuccess => {
  return {
    type: "MenuImgUplSuccess",
    payload: { ...stateData, loading: false }
  }
};
const menuImgDeleteSuccess = (stateData: { status: number, responseMsg: string, updatedMenuImages: Array<MenuImageData>, updatedDiningEntModel: DiningEntModelData, updatedDiningEntModelsArr: Array<DiningEntModelData> }): MenuImgDelSuccess => {
  return {
    type: "MenuImgDelSuccess",
    payload: { ...stateData, loading: false }
  }
}
/* */


/* non API actions */
const setDiningModels = (stateData: { status: number, responseMsg: string, createdDiningEntModels: Array<DiningEntModelData> }): SetDiningEntModels => {
  return {
    type: "SetDiningEntModels",
    payload: { ...stateData, loading: false, numberOfDiningEntModels: stateData.createdDiningEntModels.length }
  };
};
const openDiningModel = (stateData: { diningEntImages: Array<DiningImgData>, menuImages: Array<MenuImageData>, diningEntModelData: DiningEntModelData }): OpenDiningEntModel => {
  return {
    type: "OpenDiningEntModel",
    payload: { ...stateData }
  };
};
const setPreviewImages = (diningEntImages: Array<DiningImgData>): SetDiningEntModelImages => {
  return {
    type: "SetDiningEntModelImages",
    payload: { diningEntImages }
  };
};
const clearDiningModelData = (stateData : { diningEntImages: Array<DiningImgData>, menuImages: Array<MenuImageData>, diningEntModelData: DiningEntModelData }): ClearDiningEntModelData => {
  return {
    type: "ClearDiningEntModelData",
    payload: { ...stateData }
  };
};
/* */

/* action exports */
/* non API related requests */
export const handleOpenDiningModel = (dispatch: Dispatch<DiningEntModelAction>, modelIdToOpen: string, currentDiningEntState: DiningEntertainmentState): void => {
  const diningEntDataToOpen = currentDiningEntState.createdDiningEntModels.filter((model) => model._id === modelIdToOpen)[0];
  const stateUpdateData = { 
    diningEntModelData: { ...diningEntDataToOpen, images: [ ...diningEntDataToOpen.images ], menuImages: [ ...diningEntDataToOpen.menuImages ]},
    diningEntImages: [ ...diningEntDataToOpen.images ],
    menuImages: [ ...diningEntDataToOpen.menuImages ]
  };

  dispatch(openDiningModel(stateUpdateData));
};
export const handleClearDiningModelData = (dispatch: Dispatch<DiningEntModelAction>): void => {

  dispatch(clearDiningModelData({ diningEntModelData: generateEmptyDiningEntModel(), diningEntImages: [], menuImages: [] }));
}

/* API related requests */
// general image upload functions //
export const handleUploadDiningModelImage = (dispatch: Dispatch<DiningEntModelAction>, file: FormData, currentDiningEntState: DiningEntertainmentState): Promise<boolean> => {
  const { diningEntModelData, diningEntImages, createdDiningEntModels } = currentDiningEntState;
  const { _id: modelId } = diningEntModelData;

  const requestOptions = {
    method: "post",
    url: "/api/uploadDiningModelImage/" + (modelId ? modelId : ""),
    headers: {
      'content-type': 'multipart/form-data'
    },
    data: file
  };

  dispatch(diningModelAPIRequest());
  return axios(requestOptions)
    .then((response) => {
      const { status, data } = response;
      const { responseMsg, newImage, updatedDiningEntModel } : { responseMsg: string, newImage: DiningImgData, updatedDiningEntModel: DiningEntModelData } = data;
      
      // updated images for preview //
      let updatedDiningEntModelsArr;
      const updatedDiningEntImages = [ ...diningEntImages, newImage ];

      // check if image uploaded on an existing model, update as needed //
      if (updatedDiningEntModel) {
        updatedDiningEntModelsArr = createdDiningEntModels.map((model) => {
          if (model._id === updatedDiningEntModel._id) {
            return { ...updatedDiningEntModel, images: [ ...updatedDiningEntModel.images ], menuImages: [ ...updatedDiningEntModel.menuImages ] };
          } else {
            return model;
          }
        });
      }
      
      const stateData = { 
        status, 
        responseMsg, 
        updatedDiningEntModel: updatedDiningEntModel ? updatedDiningEntModel : generateEmptyDiningEntModel(), 
        updatedDiningEntModelsArr: updatedDiningEntModelsArr ? updatedDiningEntModelsArr : [ ...createdDiningEntModels ], 
        diningEntImages: updatedDiningEntImages 
      };
      dispatch(diningModelImgUploadSuccess(stateData));
      return Promise.resolve(true);
    })
    .catch((error) => {
      dispatch(diningModelError({ responseMsg: "An error occured", error: error }));
      return Promise.resolve(false);
    });
};

export const handleDeleteDiningModelImage = (dispatch: Dispatch<DiningEntModelAction>, imageId: string, currentDiningEntState: DiningEntertainmentState): Promise<boolean> => {
  const { diningEntImages, createdDiningEntModels } = currentDiningEntState;
  const requestOptions = {
    method: "delete",
    url: "/api/deleteDiningModelImage/" + imageId
  };

  dispatch(diningModelAPIRequest());
  return axios(requestOptions)
    .then((response) => {
      const { status, data } = response;
      const { responseMsg, deletedImage, updatedDiningEntModel } : { responseMsg: string, deletedImage: DiningImgData, updatedDiningEntModel: DiningEntModelData } = data;

      const updatedDiningEntImages = diningEntImages.filter((imgData) => imgData._id !== deletedImage._id);
      const updatedDiningEntModelsArr = createdDiningEntModels.map((model) => {
        if (model._id === updatedDiningEntModel._id) {
          return { ...updatedDiningEntModel, images: [ ...updatedDiningEntModel.images ], menuImages: [ ...updatedDiningEntModel.menuImages ]};
        } else {
          return model;
        }
      });
      const stateData = { status, responseMsg, updatedDiningEntModel, updatedDiningEntModelsArr, diningEntImages: updatedDiningEntImages };
      dispatch(diningModelImgDeleteSuccess(stateData));
      return Promise.resolve(true);
    })
    .catch((error) => {
      console.error(error);
      dispatch(diningModelError({ responseMsg: "An error occured" , error: error }));
      return Promise.resolve(false);
    });
};

// menu image upload methods //
export const handleUploadMenuImage = (dispatch: Dispatch<DiningEntModelAction>, file: FormData, currentDiningEntState: DiningEntertainmentState): Promise<boolean> => {
  const { diningEntModelData, menuImages, createdDiningEntModels } = currentDiningEntState;
  const { _id: modelId } = diningEntModelData;

  const requestOptions = {
    method: "post",
    url: "/api/upload_menu_image/" + (modelId ? modelId : ""),
    headers: {
      'content-type': 'multipart/form-data'
    },
    data: file
  };

  dispatch(diningModelAPIRequest());
  return axios(requestOptions)
    .then((response) => {
      const { status, data } = response;
      const { responseMsg, newImage, updatedDiningEntModel } : { responseMsg: string, newImage: DiningImgData, updatedDiningEntModel: DiningEntModelData } = data;
      
      // updated images for preview //
      let updatedDiningEntModelsArr;
      const updatedMenuUmages = [ ...menuImages, newImage ];

      // check if image uploaded on an existing model, update as needed //
      if (updatedDiningEntModel) {
        updatedDiningEntModelsArr = createdDiningEntModels.map((model) => {
          if (model._id === updatedDiningEntModel._id) {
            return { ...updatedDiningEntModel, images: [ ...updatedDiningEntModel.images ], menuImages: [ ...updatedDiningEntModel.menuImages ] };
          } else {
            return model;
          }
        });
      }
      
      const stateData = { 
        status, 
        responseMsg, 
        updatedDiningEntModel: updatedDiningEntModel ? updatedDiningEntModel : generateEmptyDiningEntModel(), 
        updatedDiningEntModelsArr: updatedDiningEntModelsArr ? updatedDiningEntModelsArr : [ ...createdDiningEntModels ], 
        updatedMenuImages: menuImages 
      };
      dispatch(menuImgUploadSuccess(stateData));
      return Promise.resolve(true);
    })
    .catch((error) => {
      dispatch(diningModelError({ responseMsg: "An error occured", error: error }));
      return Promise.resolve(false);
    });
};

export const handleDeleteMenuImage = (dispatch: Dispatch<DiningEntModelAction>, imageId: string, currentDiningEntState: DiningEntertainmentState): Promise<boolean> => {
  const { menuImages, createdDiningEntModels } = currentDiningEntState;
  const requestOptions = {
    method: "delete",
    url: "/api/delete_menu_image/" + imageId
  };

  dispatch(diningModelAPIRequest());
  return axios(requestOptions)
    .then((response) => {
      const { status, data } = response;
      const { responseMsg, deletedImage, updatedDiningEntModel } : { responseMsg: string, deletedImage: DiningImgData, updatedDiningEntModel: DiningEntModelData } = data;

      const updatedMenuImages = menuImages.filter((imgData) => imgData._id !== deletedImage._id);
      const updatedDiningEntModelsArr = createdDiningEntModels.map((model) => {
        if (model._id === updatedDiningEntModel._id) {
          return { ...updatedDiningEntModel, images: [ ...updatedDiningEntModel.images ], menuImages: [ ...updatedDiningEntModel.menuImages ]};
        } else {
          return model;
        }
      });
      const stateData = { status, responseMsg, updatedDiningEntModel, updatedMenuImages, updatedDiningEntModelsArr };
      dispatch(menuImgDeleteSuccess(stateData));
      return Promise.resolve(true);
    })
    .catch((error) => {
      console.error(error);
      dispatch(diningModelError({ responseMsg: "An error occured" , error: error }));
      return Promise.resolve(false);
    });
};

/* model CRUD actions */
export const handleCreateDiningModel = (dispatch: Dispatch<DiningEntModelAction>, clientFormData: ClientDiningEntFormData): Promise<boolean> => {
  const requestOptions = {
    method: "post",
    url: "/api/dining_models/create",
    data: {
      diningModelData: clientFormData,
    }
  };

  dispatch(diningModelAPIRequest());
  return axios(requestOptions)
    .then((response) => {
      const { status, data } = response;
      const { responseMsg, newDiningEntModel } : { responseMsg: string, newDiningEntModel: DiningEntModelData } = data;
      const stateData = { status, responseMsg, newDiningEntModelData: newDiningEntModel };

      dispatch(diningModelCreated(stateData));
      return Promise.resolve(true);
    })
    .catch((error) => {
      console.error(error);
      dispatch(diningModelError({ responseMsg: "An error occured", error: error }));
      return Promise.resolve(false);
    });
};

export const handleFetchDiningModels = (dispatch: Dispatch<DiningEntModelAction>): Promise<boolean> => {
  const requestOptions = {
    method: "get",
    url: "/api/dining_models"
  };

  dispatch(diningModelAPIRequest());
  return axios(requestOptions)
    .then((response) => {
      const { status, data } = response;
      const { responseMsg, diningEntModels } : { responseMsg: string, diningEntModels: Array<DiningEntModelData> } = data;
      const stateData = { status, responseMsg, createdDiningEntModels: diningEntModels };

      dispatch(setDiningModels(stateData));
      return Promise.resolve(true);
    })
    .catch((error) => {
      console.error(error);
      dispatch(diningModelError({ responseMsg: "An error occurred", error: error }));
      return Promise.resolve(false);
    });
};

export const handleUpdateDiningModel = (dispatch: Dispatch<DiningEntModelAction>, clientFormData: ClientDiningEntFormData, currentDiningEntState: DiningEntertainmentState): Promise<boolean> => {
  const { _id: diningModelId } = clientFormData;
  const { diningEntModelData, diningEntImages, menuImages, createdDiningEntModels } = currentDiningEntState;
  
  const requestOptions = {
    method: "patch",
    url: "/api/dining_models/" + (diningModelId ? diningModelId : ""),
    data: {
      diningModelData: clientFormData,
      diningModelImages: diningEntImages,
      menuImages: menuImages
    }
  };

  dispatch(diningModelAPIRequest());
  return axios(requestOptions)
    .then((response) => {
      const { status, data } = response;
      const { responseMsg, updatedDiningEntModel } : { responseMsg: string, updatedDiningEntModel: DiningEntModelData }= data;
      const updatedDiningEntModelsArr = createdDiningEntModels.map((model) => {
        if (model._id == updatedDiningEntModel._id) {
          return {
            ...updatedDiningEntModel, images: [ ...updatedDiningEntModel.images ], menuImages: [ ...updatedDiningEntModel.menuImages ]
          };
        } else {
          return model;
        }
      })
      const diningModelStateData = { status, responseMsg, updatedDiningEntModelsArr, updatedDiningEntModelData: updatedDiningEntModel };
       
      dispatch(diningModelUpdated(diningModelStateData));
      return Promise.resolve(true);
    })
    .catch((error) => {
      console.error(error);
      dispatch(diningModelError({ responseMsg: "An error occurred", error: error }));
      return Promise.resolve(false);
    })
};

export const handleDeleteDiningModel = (dispatch: Dispatch<DiningEntModelAction>, modelIdToDelete: string, currentDiningEntState: DiningEntertainmentState): Promise<boolean> => {
  const { createdDiningEntModels } = currentDiningEntState;
  const requestOptions = {
    method: "delete",
    url: "/api/dining_models/" + modelIdToDelete,
  };

  dispatch(diningModelAPIRequest());
  return axios(requestOptions)
    .then((response) => {
      const { status, data } = response;
      const { responseMsg, deletedDiningEntModel } : { responseMsg: string, deletedDiningEntModel: DiningEntModelData } = data;
      const updatedDiningEntModelsArr = createdDiningEntModels.filter((model) => model._id !== deletedDiningEntModel._id);
      const updatedStateData = { status, responseMsg, updatedDiningEntModelsArr };

      dispatch(diningModelDeleted(updatedStateData));
      return Promise.resolve(true);
    })
    .catch((error) => {
      console.error(error);
      dispatch(diningModelError({ responseMsg: "An error occured", error: error }));
      return Promise.resolve(false);
    });
};

