// @flow
import { generateEmptyRoomModel } from "../_helpers/emptyDataGenerators";
import type { RoomState, RoomImgData, RoomAction } from "./flowTypes";

const initialState: RoomState = {
  status: 0,
  loading: false,
  responseMsg: "",
  roomData: generateEmptyRoomModel(),
  roomImages: [],
  createdRooms: [],
  numberOfRooms: 0,
  error: null
}

const roomReducer = (state: RoomState = initialState, action: RoomAction): RoomState => {
  switch (action.type) {
    case "RoomAPIRequest": {
      return {
        ...state,
        loading: action.payload.loading,
        status: action.payload.status,
        error: null
      };
    };
    case "SetRooms": {
      return {
        ...state,
        status: action.payload.status,
        loading: action.payload.loading,
        responseMsg: action.payload.responseMsg,
        createdRooms: action.payload.createdRooms,
        numberOfRooms: action.payload.numberOfRooms,
        error: null
      };
    };
    case "RoomError": {
      return {
        ...state,
        status: action.payload.status,
        loading: false,
        responseMsg: action.payload.responseMsg,
        error: action.payload.error
      };
    };
    case "ClearRoomData": {
      return {
        ...state,
        roomData: action.payload.roomData,
        roomImages: action.payload.roomImages,
        error: null
      };
    };
    case "OpenRoom": {
      return {
        ...state,
        roomData: action.payload.roomData,
        roomImages: action.payload.roomImages,
        error: null
      };
    };
    case "RoomCreated": {
      return {
        ...state,
        status: action.payload.status,
        loading: action.payload.loading,
        responseMsg: action.payload.responseMsg,
        roomData: action.payload.newRoomData,
        createdRooms: [ ...state.createdRooms, action.payload.newRoomData ],
        error: null
      };
    };
    case "RoomUpdated": {
      return {
        ...state,
        status: action.payload.status,
        loading: action.payload.loading,
        responseMsg: action.payload.responseMsg,
        roomData: action.payload.roomData,
        createdRooms: action.payload.createdRooms,
        error: null
      };
    };
    case "RoomDeleted": {
      return {
        ...state,
        status: action.payload.status,
        loading: action.payload.loading,
        responseMsg: action.payload.responseMsg,
        roomData: action.payload.roomData,
        createdRooms: action.payload.createdRooms,
        numberOfRooms: action.payload.numberOfRooms,
        error: null
      };
    };
    case "RoomImgUplSuccess": {
      return {
        ...state,
        status: action.payload.status,
        loading: action.payload.loading,
        responseMsg: action.payload.responseMsg,
        roomImages: action.payload.roomImages,
        roomData: action.payload.updatedRoom,
        createdRooms: action.payload.createdRooms,
        error: null
      };
    };  
    case "RoomImgDelSuccess": {
      return {
        ...state,
        status: action.payload.status,
        loading: action.payload.loading,
        responseMsg: action.payload.responseMsg,
        roomImages: action.payload.roomImages,
        roomData: action.payload.updatedRoom,
        createdRooms: action.payload.createdRooms,
        error: null
      };
    };
    case "ToggleRoomOnlineOffline": {
      return {
        ...state,
        status: action.payload.status,
        loading: action.payload.loading,
        responseMsg: action.payload.responseMsg,
        updatedRoom: action.payload.updatedRoom,
        updatedRoomsArr: action.payload.updatedRoomsArr,
        error: null
      };
    };
    case "DeleteAllRoomImages": {
      return {
        ...state,
        status: action.payload.status,
        loading: action.payload.loading,
        responseMsg: action.payload.responseMsg,
        roomImages: action.payload.updatedRoomImages,
        error: null
      }
    }
    default: {
      return state;
    };
  };
};

export default roomReducer;