// @flow
import { generateEmptyDiningEntModel } from "../_helpers/emptyDataGenerators";
import type { DiningEntertainmentState, DiningEntModelAction } from "./flowTypes";
const initialState: DiningEntertainmentState = {
  status: 0,
  loading: false,
  responseMsg: "",
  diningEntModelData: generateEmptyDiningEntModel(),
  diningEntImages: [],
  menuImages: [],
  createdDiningEntModels: [],
  numberOfDiningEntModels: 0,
  error: null
}

const diningModelReducer = (state: DiningEntertainmentState = initialState, action: DiningEntModelAction): DiningEntertainmentState => {
  switch (action.type) {
    case "DiningEntModelAPIRequest": {
      return {
        ...state,
        status: action.payload.status,
        loading: action.payload.loading,
        error: null
      };
    };
    case "SetDiningEntModels": {
      return {
        ...state,
        status: action.payload.status,
        loading: action.payload.loading,
        responseMsg: action.payload.responseMsg,
        createdDiningEntModels: action.payload.createdDiningEntModels,
        numberOfDiningModels: action.payload.numberOfDiningEntModels,
        error: null
      };
    };
    case "SetDiningEntModelImages": {
      return {
        ...state,
        diningEntImages: action.payload.diningEntImages,
        error: null
      };
    };
    case "OpenDiningEntModel": {
      return {
        ...state,
        diningEntModelData: action.payload.diningEntModelData,
        diningEntImages: action.payload.diningEntImages,
        menuImages: action.payload.menuImages,
        error: null
      };
    };
    case "ClearDiningEntModelData": {
      return {
        ...state,
        diningEntModelData: action.payload.diningEntModelData,
        diningEntImages: action.payload.diningEntImages,
        error: null
      };
    };
    case "DiningEntModelCreated": {
      return {
        ...state,
        status: action.payload.status,
        loading: action.payload.loading,
        responseMsg: action.payload.responseMsg,
        diningEntModelData: action.payload.newDiningEntModelData,
        createdDiningEntModels: [ ...state.createdDiningEntModels, { ...action.payload.newDiningEntModelData } ],
        error: null
      };
    };
    case "DiningEntModelUpdated": {
      return {
        ...state,
        status: action.payload.status,
        loading: action.payload.loading,
        responseMsg: action.payload.responseMsg,
        diningEntImages: [ ...action.payload.updatedDiningEntModelData.images ],
        menuImages: [ ...action.payload.updatedDiningEntModelData.menuImages ],
        diningEntModelData: { ...action.payload.updatedDiningEntModelData },
        createdDiningEntModels: action.payload.updatedDiningEntModelsArr,
        error: null
      };
    };
    case "DiningEntModelDeleted": {
      return {
        ...state,
        status: action.payload.status,
        loading: action.payload.loading,
        responseMsg: action.payload.responseMsg,
        diningEntImages: [],
        menuImages: [],
        diningEntModelData: generateEmptyDiningEntModel(),
        createdDiningEntModels: action.payload.updatedDiningEntModelsArr,
        numberOfDiningEntModels: action.payload.numberOfDiningEntModels,
        error: null
      };
    };
    case "MenuImgUplSuccess": {
      return {
        ...state,
        status: action.payload.status,
        loading: action.payload.loading,
        responseMsg: action.payload.responseMsg,
        menuImages: action.payload.updatedMenuImages,
        dininingEntModelData: { ...action.payload.updatedDiningEntModel },
        createdDiningEntModels: action.payload.updatedDiningEntModelsArr,
        error: null
      };
    };
    case "MenuImgDelSuccess": {
      return {
        ...state,
        status: action.payload.status,
        loading: action.payload.loading,
        reponseMsg: action.payload.responseMsg,
        menuImages: action.payload.updatedMenuImages,
        diningEntModelData: { ...action.payload.updatedDiningEntModel },
        createdDiningEntModels: action.payload.updatedDiningEntModelsArr,
        error: null
      };
    };
    case "DiningEntModelImgUplSuccess": {
      return {
        ...state,
        status: action.payload.status,
        loading: action.payload.loading,
        responseMsg: action.payload.responseMsg,
        diningModelImages: action.payload.diningEntImages,
        diningEntModelData: { ...action.payload.updatedDiningEntModel },
        createdDiningEntModels: action.payload.updatedDiningEntModelsArr,
        error: null
      };
    };  
    case "DiningEntModelImgDelSuccess": {
      return {
        ...state,
        status: action.payload.status,
        loading: action.payload.loading,
        responseMsg: action.payload.responseMsg,
        diningModelImages: action.payload.diningEntImages,
        diningEntModelData: { ...action.payload.updatedDiningEntModel },
        createdDiningEntModels: action.payload.updatedDiningEntModelsArr,
        error: null
      };
    };
    case "DiningEntModelError": {
      return {
        ...state,
        status: action.payload.status,
        loading: action.payload.loading,
        responseMsg: action.payload.responseMsg,
        error: action.payload.error
      };
    };
    case "TakeDiningEntModelOnline": {
      return {
        ...state,
        status: action.payload.status,
        loading: action.payload.loading,
        responseMsg: action.payload.responseMsg,
        diningEntModelData: { ...action.payload.updatedDiningEntModel },
        createdDiningEntModels: action.payload.updatedDiningEntModelsArr,
        error: null
      };
    };
    case "TakeDiningEntModelOffline": {
      return {
        ...state,
        status: action.payload.status,
        loading: action.payload.loading,
        responseMsg: action.payload.responseMsg,
        diningEntModelData: { ...action.payload.updatedDiningEntModel },
        createdDiningEntModels: action.payload.updatedDiningEntModelsArr,
        error: null
      };
    };
    case "ToggleAllDiningEntModelsOnlineOffline": {
      return {
        ...state,
        status: action.payload.status,
        loading: action.payload.loading,
        responseMsg: action.payload.responseMsg,
        createdDiningEntModels: action.payload.updatedDiningEntModelsArr,
        error: null
      };
    };
    default: {
      return state;
    };
  };
};

export default diningModelReducer;