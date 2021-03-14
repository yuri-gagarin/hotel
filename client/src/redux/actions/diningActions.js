import axios from "axios";
import { diningConstants } from "../constants";
const {
  UPDATE_STATE,
  CLEAR_DINING_MODEL_DATA,
  DINING_MODEL_REQUEST,
  DINING_MODEL_CREATED,
  DINING_MODEL_UPDATED,
  DINING_MODEL_DELETED,
  DINING_MODEL_ERROR,
  DINING_MODEL_IMG_REQUEST,
  DINING_MODEL_IMG_UPLOADED,
  DINING_MODEL_IMG_DELETED,
  DINING_MODEL_IMG_ERROR,
  ADD_DINING_MODEL_TO_STATE,
  SET_DINING_MODELS,
  SET_PREVIEW_IMAGES,
  OPEN_DINING_MODEL,
  CLOSE_DINING_MODEL
} = diningModelConstants;
//import history from "../history";

export const uploadRequest = () => {
  return {
    type: DINING_MODEL_IMG_REQUEST,
    payload: {
      loading: true,
      error: null
    }
  };
};

export const diningModelImgUploadSucess = (stateData) => {
  return {
    type: DINING_MODEL_IMG_UPLOADED,
    payload: stateData
  };
};

export const diningModelImgDeleteSuccess = (stateData) => {
  return {
    type: DINING_MODEL_IMG_DELETED,
    payload: stateData
  };
};

export const diningModelImgUploadError = (error) => {
  return {
    type: DINING_MODEL_IMG_ERROR,
    payload: {
      status: 500,
      responseMsg: "An error occured",
      error: error
    }
  };
};

export const diningModelRequest = () => {
  return {
    type: DINING_MODEL_REQUEST,
    payload: {
      status: null,
      loading: true,
      error: null
    }
  };
};

export const diningModelCreated = (stateData) => {
  return {
    type: DINING_MODEL_CREATED,
    payload: stateData
  };
};

export const addNewDiningModel = (diningModelState) => {
  return {
    type: ADD_DINING_MODEL_TO_STATE,
    payload: {
      newDiningModel: diningModelState
    }
  };
};   

export const setDiningModels = (stateData) => {
  return {
    type: SET_DINING_MODELS,
    payload: stateData
  };
};

export const diningModelUpdated = (stateData) => {
  return {
    type: DINING_MODEL_UPDATED,
    payload: stateData
  };
};

export const diningModelDeleted = (stateData) => {
  return {
    type: DINING_MODEL_DELETED,
    payload: stateData
  };
};

export const diningModelError = (error) => {
  console.error(error);
  return {
    type: DINING_MODEL_ERROR,
    payload: {
      status: 500,
      error: error
    }
  };
};

export const openDiningModel = (diningModels, diningModelId) => {
  const diningModelData = diningModels.filter((diningModel) => diningModel._id == diningModelId)[0];
  return {
    type: OPEN_DINING_MODEL,
    payload: {
      loading: false,
      diningModelData: diningModelData,
      error: null
    }
  };
};

export const setPreviewImages = (diningModelImages = []) => {
  return {
    type: SET_PREVIEW_IMAGES,
    payload: {
      loading: false,
      diningModelImages: diningModelImages,
      error: null
    }
  };
};

export const clearDiningModelData = () => {
  return {
    type: CLEAR_DINING_MODEL_DATA,
    payload: {
      loading: false,
      diningModelData: {},
      diningModelImages: [],
      error: null
    }
  };
};

export const uploadDiningModelImage = (dispatch, file) => {
  const requestOptions = {
    method: "post",
    url: "/api/uploadDiningModelImage",
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
      dispatch(diningModelImgUploadSucess(stateData));
      return Promise.resolve(true);
    })
    .catch((error) => {
      console.error(error);
      dispatch(diningModelImgUploadError(error));
      return Promise.resolve(false);
    });
};

export const deleteDiningModelImage = (dispatch, imageId, oldImageState = []) => {
  const requestOptions = {
    method: "delete",
    url: "/api/deleteDiningModelImage/" + imageId
  };
  dispatch(uploadRequest());
  return axios(requestOptions)
    .then((response) => {
      const { status, data } = response;
      const { responseMsg } = data;
      const newImageState = oldImageState.filter((image) => imageId != image._id)
      const stateData = {
        status: status,
        loading: false,
        responseMsg: responseMsg,
        diningModelImages: newImageState,
        error: null
      };
      dispatch(diningModelImgDeleteSuccess(stateData));
    })
    .catch((error) => {
      console.error(error);
      dispatch(diningModelImgUploadError(error));
    });
}

export const handleNewDiningModel = (dispatch, diningModelData, history) => {
  const requestOptions = {
    method: "post",
    url: "/api/createDiningModel",
    data: {
      diningModelData: diningModelData,
    }
  };
  dispatch(diningModelRequest());
  return axios(requestOptions)
    .then((response) => {
      const { status, data } = response;
      const { responseMsg, newDiningModel } = data;
      const stateData = {
        status: status,
        loading: false,
        responseMsg: responseMsg,
        diningModelData: newDiningModel,
        diningModelImages: newDiningModel.images,
        error: null
      };
      dispatch(diningModelCreated(stateData));
      dispatch(addNewDiningModel(newDiningModel));
      history.push("/admin/diningModels");
    })
    .catch((error) => {
      console.error(error);
      dispatch(diningModelError(error));
    });
};

export const fetchDiningModels = (dispatch) => {
  const requestOptions = {
    method: "get",
    url: "/api/diningModels"
  };
  dispatch(diningModelRequest());
  return axios(requestOptions)
    .then((response) => {
      const { status, data } = response;
      const { responseMsg, diningModels } = data;
      const stateData = {
        status: status,
        loading: false,
        responseMsg: responseMsg,
        createdDiningModels: diningModels,
        error: null
      };
      dispatch(setDiningModels(stateData))
    })
    .catch((error) => {
      console.error(error);
      dispatch(diningModelError(error));
    });
};

export const updateDiningModel = (dispatch, diningModelData, diningModelImages = {}, currentDiningModels = []) => {
  const diningModelId = diningModelData._id
  const requestOptions = {
    method: "patch",
    url: "/api/diningModels/" + diningModelId,
    data: {
      diningModelData: diningModelData,
      diningModelImages: diningModelImages
    }
  }
  dispatch(diningModelRequest());
  return axios(requestOptions)
    .then((response) => {
      const { status, data } = response;
      const { responseMsg, updatedDiningModel } = data;
      const updatedDiningModels = currentDiningModels.map((diningModel) => {
        if (diningModel._id == updatedDiningModel._id) {
          return {
            ...updatedDiningModel
          };
        } else {
          return diningModel;
        }
      })
      const diningModelStateData = {
        status: status,
        loading: false,
        responseMsg: responseMsg,
        diningModelData: updatedDiningModel,
        diningModelImages: updatedDiningModel.images,
        createdDiningModels: updatedDiningModels,
        error: null
      };
      dispatch(diningModelUpdated(diningModelStateData));
    })
    .catch((error) => {
      console.error(error);
      dispatch(diningModelError(error));
    })
};

export const deleteDiningModel = (dispatch, diningModelId, currentDiningModels = []) => {
  const diningModelImages = currentDiningModels.filter((diningModel) => diningModelId == diningModel._id)[0].images;
  const requestOptions = {
    method: "delete",
    url: "/api/diningModels/" + diningModelId,
    data: {
      diningModelImages: diningModelImages
    }
  };
  dispatch(diningModelRequest());
  return axios(requestOptions)
    .then((response) => {
      const { status, data } = response;
      const { responseMsg, deletedDiningModel } = data;
      const updatedDiningModels = currentDiningModels.filter((diningModel) => {
        return deletedDiningModel._id != diningModel._id;
      });
      const diningModelStateData = {
        status: status,
        loading: false,
        responseMsg: responseMsg,
        diningModelData: {},
        diningModelImages: [],
        createdDiningModels: updatedDiningModels,
        error: null
      };
      dispatch(diningModelDeleted(diningModelStateData));
    })
    .catch((error) => {
      dispatch(diningModelError(error));
    });
};

