import { roomConstants } from "../constants";
const {
  ROOM_REQUEST,
  ROOM_CREATED,
  ROOM_UPDATED,
  ROOM_DELETED,
  ROOM_ERROR,
  ROOM_IMG_REQUEST,
  ROOM_IMG_UPLOADED,
  ROOM_IMG_DELETED,
  ROOM_IMG_ERROR
} = roomConstants;
const initialState = {
  status: status,
  loading: false,
  responseMsg: "",
  roomData: {},
  roomImages: [],
  error: null
}

const adminRoomReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ROOM_REQUEST: {
      return {
        ...state,
        status: payload.status,
        loading: payload.loading,
        error: payload.error
      };
    };
    case ROOM_CREATED: {
      return {
        ...state,
        status: payload.status,
        loading: payload.loading,
        responseMsg: payload.responseMsg,
        roomData: { ...payload.roomData },
        roomImages: [ ...payload.roomImages],
        error: payload.error
      };
    };
    case ROOM_ERROR: {
      return {
        ...state,
        status: payload.status,
        loading: payload.loading,
        error: payload.error
      }
    }
    case ROOM_IMG_REQUEST: {
      return {
        ...state,
        loading: payload.loading,
        error: payload.error
      };
    };
    case ROOM_IMG_UPLOADED: {
      return {
        ...state,
        status: payload.status,
        loading: payload.loading,
        responseMsg: payload.responseMsg,
        roomImages: [ ...state.roomImages, payload.newImage ],
        error: payload.error
      }
    };  
    case ROOM_IMG_DELETED: {
      return state;
    };
    case ROOM_IMG_ERROR: {
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

export default adminRoomReducer;