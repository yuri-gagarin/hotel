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
  ROOM_IMG_ERROR,
  SET_ROOMS,
  SET_PREVIEW_IMAGES,
  CLEAR_ROOM_DATA,
  ADD_ROOM_TO_STATE,
  OPEN_ROOM
} = roomConstants;
const initialState = {
  status: status,
  loading: false,
  responseMsg: "",
  roomData: {},
  roomImages: [],
  createdRooms: [],
  numberOfRooms: 0,
  error: null
}

const roomReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_ROOM_TO_STATE: {
      return {
        ...state,
        createdRooms: [ ...state.createdRooms, payload.newRoom ]
      };
    };
    case SET_ROOMS: {
      return {
        ...state,
        status: payload.status,
        loading: payload.loading,
        responseMsg: payload.responseMsg,
        createdRooms: [ ...payload.createdRooms ],
        numberOfRooms: payload.createdRooms.length,
        error: payload.error
      };
    };
    case CLEAR_ROOM_DATA: {
      return {
        ...state,
        loading: payload.loading,
        roomData: { ...payload.roomData },
        roomImages: [ ...payload.roomImages ],
        error: payload.error
      };
    };
    case SET_PREVIEW_IMAGES: {
      return {
        ...state,
        loading: payload.loading,
        roomImages: [ ...payload.roomImages ],
        error: null
      };
    };
    case OPEN_ROOM: {
      return {
        ...state,
        loading: payload.loading,
        roomData: { ...payload.roomData },
        error: payload.error
      };
    };
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
        //roomData: { ...payload.roomData },
        //roomImages: [ ...payload.roomImages],
        error: payload.error
      };
    };
    case ROOM_UPDATED: {
      return {
        ...state,
        status: payload.status,
        loading: payload.loading,
        responseMsg: payload.responseMsg,
        roomData: { ...payload.roomData },
        createdRooms: [ ...payload.createdRooms ],
        roomImages: [ ...payload.roomImages ],
        error: payload.error
      };
    };
    case ROOM_DELETED: {
      return {
        ...state,
        status: payload.status,
        loading: payload.loading,
        responseMsg: payload.responseMsg,
        roomData: { ...payload.roomData },
        roomImages: [ ...payload.roomImages ],
        createdRooms: [ ...payload.createdRooms ],
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
      };
    };  
    case ROOM_IMG_DELETED: {
      return {
        ...state,
        status: payload.status,
        loading: payload.loading,
        responseMsg: payload.responseMsg,
        roomImages: [ ...payload.roomImages ],
        error: payload.error
      };
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

export default roomReducer;