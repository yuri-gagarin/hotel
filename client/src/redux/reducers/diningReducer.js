import { diningConstants } from "../constants";
const {
  DINING_MODEL_REQUEST,
  DINING_MODEL_CREATED,
  DINING_MODEL_UPDATED,
  DINING_MODEL_DELETED,
  DINING_MODEL_ERROR,
  DINING_MODEL_IMG_REQUEST,
  DINING_MODEL_IMG_UPLOADED,
  DINING_MODEL_IMG_DELETED,
  DINING_MODEL_IMG_ERROR,
  SET_DINING_MODELS,
  SET_PREVIEW_IMAGES,
  CLEAR_DINING_MODEL_DATA,
  ADD_DINING_MODEL_TO_STATE,
  OPEN_DINING_MODEL
} = diningConstants;

const initialState = {
  status: status,
  loading: false,
  responseMsg: "",
  diningModelData: {},
  diningModelImages: [],
  diningModelMenuImages: [],
  createdDiningModels: [],
  numberOfDiningModels: 0,
  error: null
}

const diningModelReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_DINING_MODEL_TO_STATE: {
      return {
        ...state,
        createdDiningModels: [ ...state.createdDiningModelss, payload.newDiningModel ]
      };
    };
    case SET_DINING_MODELS: {
      return {
        ...state,
        status: payload.status,
        loading: payload.loading,
        responseMsg: payload.responseMsg,
        createdDiningModels: [ ...payload.createdDiningModels ],
        numberOfDiningModels: payload.createdDiningModels.length,
        error: payload.error
      };
    };
    case CLEAR_DINING_MODEL_DATA: {
      return {
        ...state,
        loading: payload.loading,
        diningModelData: { ...payload.diningModelData },
        diningModelImages: [ ...payload.diningModelImages ],
        error: payload.error
      };
    };
    case SET_PREVIEW_IMAGES: {
      return {
        ...state,
        loading: payload.loading,
        diningModelImages: [ ...payload.diningModelImages ],
        error: null
      };
    };
    case OPEN_DINING_MODEL: {
      return {
        ...state,
        loading: payload.loading,
        diningModelData: { ...payload.diningModelData },
        error: payload.error
      };
    };
    case DINING_MODEL_REQUEST: {
      return {
        ...state,
        status: payload.status,
        loading: payload.loading,
        error: payload.error
      };
    };
    case DINING_MODEL_CREATED: {
      return {
        ...state,
        status: payload.status,
        loading: payload.loading,
        responseMsg: payload.responseMsg,
        error: payload.error
      };
    };
    case DINING_MODEL_UPDATED: {
      return {
        ...state,
        status: payload.status,
        loading: payload.loading,
        responseMsg: payload.responseMsg,
        diningModelData: { ...payload.diningModelData },
        createdDiningModels: [ ...payload.createdDiningModels ],
        diningModelImages: [ ...payload.diningModelImages ],
        error: payload.error
      };
    };
    case DINING_MODEL_DELETED: {
      return {
        ...state,
        status: payload.status,
        loading: payload.loading,
        responseMsg: payload.responseMsg,
        diningModelData: { ...payload.diningModelData },
        diningModelImages: [ ...payload.diningModelImages ],
        createdDiningModels: [ ...payload.createdDiningModels ],
        error: payload.error
      };
    };
    case DINING_MODEL_ERROR: {
      return {
        ...state,
        status: payload.status,
        loading: payload.loading,
        error: payload.error
      }
    }
    case DINING_MODEL_IMG_REQUEST: {
      return {
        ...state,
        loading: payload.loading,
        error: payload.error
      };
    };
    case DINING_MODEL_IMG_UPLOADED: {
      return {
        ...state,
        status: payload.status,
        loading: payload.loading,
        responseMsg: payload.responseMsg,
        diningModelImages: [ ...state.diningModelImages, payload.newImage ],
        error: payload.error
      };
    };  
    case DINING_MODEL_IMG_DELETED: {
      return {
        ...state,
        status: payload.status,
        loading: payload.loading,
        responseMsg: payload.responseMsg,
        diningModelImages: [ ...payload.diningModelImages ],
        error: payload.error
      };
    };
    case DINING_MODEL_IMG_ERROR: {
      return {
        ...state,
        status: payload.status,
        loading: payload.loading,
        error: payload.error
      };
    };
    default: {
      return state;
    };
  };
};

export default diningModelReducer;