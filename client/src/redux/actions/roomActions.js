// @flow
import axios from "axios";
// FLOW types //
import type {
  RoomImgData, RoomData, RoomState,
  RoomImgUplSuccess, RoomImgDelSuccess, DeleteAllRoomImages,
  RoomAPIRequest, RoomCreated, RoomUpdated, RoomDeleted,
  OpenRoom, SetRooms, ClearRoomData, SetRoomImages, RoomError,
  ClientRoomFormData, ToggleRoomOnlineOffline, ToggleAllRoomsOnlineOffline,
  RoomAction
} from "../reducers/rooms/flowTypes";
import type { Dispatch } from "../reducers/_helpers/createReducer";
// helpers //
import { generateEmptyRoomModel } from "../reducers/_helpers/emptyDataGenerators";

/* API request actions and error */
const roomAPIRequest = (): RoomAPIRequest => {
  return {
    type: "RoomAPIRequest",
    payload: {
      status: 202,
      loading: true,
      error: null
    }
  };
};
const roomError = (data: { status: number, responseMsg: string, error: any }): RoomError => {
  return {
    type: "RoomError",
    payload: { ...data, loading: false }
  };
};

/* CRUD Room model API actions */
const roomCreated = (stateData: { status: number, responseMsg: string, newRoomData: RoomData }): RoomCreated => {
  return {
    type: "RoomCreated",
    payload: { ...stateData, loading: false }
  };
};
const roomUpdated = (stateData: { status: number, responseMsg: string, roomData: RoomData, createdRooms: Array<RoomData> }): RoomUpdated  => {
  return {
    type: "RoomUpdated",
    payload: { ...stateData, loading: false }
  };
};
const roomDeleted = (stateData: { status: number, responseMsg: string, roomData: RoomData, createdRooms: Array<RoomData>, numberOfRooms: number }): RoomDeleted => {
  return {
    type: "RoomDeleted",
    payload: { ...stateData, loading: false }
  };
};
/* */

/* image upload api actions */
const roomImgUploadSuccess = (stateData: { status: number, responseMsg: string, updatedRoom: RoomData, createdRooms: Array<RoomData>, roomImages: Array<RoomImgData> }): RoomImgUplSuccess => {
  return {
    type: "RoomImgUplSuccess",
    payload: { ...stateData, loading: false }
  };
};
const roomImgDeleteSuccess = (stateData: { status: number, responseMsg: string, updatedRoom: RoomData, createdRooms: Array<RoomData>, roomImages: Array<RoomImgData> }): RoomImgDelSuccess => {
  return {
    type: "RoomImgDelSuccess",
    payload: { ...stateData, loading: false }
  };
};
const deleteAllRoomImages = (data: { status: number, responseMsg: string, updatedRoomImages: Array<RoomImgData> }): DeleteAllRoomImages => {
  return {
    type: "DeleteAllRoomImages",
    payload: { ...data, loading: false }
  };
};
/* */

/* online offline actions */
const toggleRoomOnlineOffline = (data: { status: number, responseMsg: string, updatedRoom: RoomData, updatedRoomsArr: Array<RoomData> }): ToggleRoomOnlineOffline => {
  return {
    type: "ToggleRoomOnlineOffline",
    payload: { ...data, loading: false }
  };
};
 const toggleAllRoomsOnlineOfflineAction = (data: { status: number, responseMsg: string, updatedRooms: Array<RoomData> }): ToggleAllRoomsOnlineOffline => {
  return {
    type: "ToggleAllRoomsOnlineOffline",
    payload: { ...data, loading: false }
  };
};
/* */

/* Non API actions */
const setRooms = (data : { status: number, responseMsg: string, createdRooms: Array<RoomData>, numberOfRooms: number }): SetRooms => {
  return {
    type: "SetRooms",
    payload: { ...data, loading: false }
  };
};
const openRoom = (data : { roomImages: Array<RoomImgData>, roomData: RoomData }): OpenRoom => {
  return {
    type: "OpenRoom",
    payload: { ...data }
  };
};
const setRoomsImages = (roomImages: Array<RoomImgData>): SetRoomImages => {
  return {
    type: "SetRoomImages",
    payload: { roomImages }
  };
};
const clearRoomData = (data: { roomImages: Array<RoomImgData>, roomData: RoomData }): ClearRoomData => {
  return {
    type: "ClearRoomData",
    payload: { ...data }
  };
};
/* */


/* action exports */
/* non API related requests */
export const handleOpenRoom = (dispatch: Dispatch<RoomAction>, roomIdToOpen: string, currentRoomState: RoomState): void => {
  const roomDataToOpen = currentRoomState.createdRooms.filter((room) => room._id === roomIdToOpen)[0];
  const stateUpdateData = {
    roomData: { ...roomDataToOpen, images: [ ...roomDataToOpen.images ]},
    roomImages: [ ...roomDataToOpen.images ]
  };
  dispatch(openRoom(stateUpdateData));
};
export const handleClearRoomData = (dispatch: Dispatch<RoomAction>): void => {
  dispatch(clearRoomData({ roomData: generateEmptyRoomModel(), roomImages: [] }));
};

/* API related requests */
/* Room API error processing */
export const handleRoomError = (err: any): RoomError => {
  // process error, extract relavant error data //
  if (typeof err === "object" && err.response) {
    const { status, data } : { status: number, data: any } = err.response;
    const { responseMsg, error } : { responseMsg: string, error: Error } = data;
    const errorResponse = error ? error : new Error("An error occured");
    return roomError({ status: status, responseMsg: responseMsg, error: errorResponse }); 
  } else {
    return roomError({ status: 500, responseMsg: "An error occured", error: err });
  }
}
/* Room CRUD related method requests */
export const handleCreateNewRoom = (dispatch: Dispatch<RoomAction>, clientRoomFormData: ClientRoomFormData): Promise<boolean> => {
  const requestOptions = {
    method: "post",
    url: "/api/create_room",
    data: {
      roomData: clientRoomFormData,
      roomImages: clientRoomFormData.images ? clientRoomFormData.images : []
    }
  };
  
  dispatch(roomAPIRequest());
  return axios(requestOptions)
    .then((response) => {
      const { status, data } = response;
      const { responseMsg, newRoom } : { responseMsg: string, newRoom: RoomData } = data;

      const stateData = { status, responseMsg, newRoomData: newRoom };
      dispatch(roomCreated(stateData));
      return Promise.resolve(true);
    })
    .catch((error) => {
      dispatch(handleRoomError(error));
      return Promise.resolve(false);
    });
};

export const handleUpdateRoom = (dispatch: Dispatch<RoomAction>, roomFormData: ClientRoomFormData, currentRoomState: RoomState): Promise<boolean> => {
  const { _id: roomId } = roomFormData;
  const { roomImages, createdRooms } = currentRoomState;
  const requestOptions = {
    method: "patch",
    url: "/api/rooms/" + (roomId ? roomId : ""),
    data: {
      roomData: roomFormData,
      roomImages: roomImages
    }
  };

  dispatch(roomAPIRequest());
  return axios(requestOptions)
    .then((response) => {
      const { status, data } = response;
      const { responseMsg, updatedRoom } : { responseMsg: string, updatedRoom: RoomData } = data;

      const updatedRooms = createdRooms.map((room) => {
        if (room._id == updatedRoom._id) {
          return {
            ...updatedRoom, images: [ ...updatedRoom.images ]
          };
        } else {
          return room;
        }
      })
      const roomStateData = {
        status,
        responseMsg,
        roomData: updatedRoom,
        createdRooms: updatedRooms,
        roomImages: [ ...updatedRoom.images ],
      };
      dispatch(roomUpdated(roomStateData));
      return Promise.resolve(true);
    })
    .catch((error) => {
      dispatch(handleRoomError(error));
      return Promise.resolve(false);
    });
};

export const handleDeleteRoom = (dispatch: Dispatch<RoomAction>, roomIdToDelete: string, currentRoomState: RoomState): Promise<boolean> => {
  const { createdRooms } = currentRoomState; 
  const requestOptions = {
    method: "delete",
    url: "/api/rooms/" + roomIdToDelete
  };

  dispatch(roomAPIRequest());
  return axios(requestOptions)
    .then((response) => {
      const { status, data } = response;
      const { responseMsg, deletedRoom } : { responseMsg: string, deletedRoom: RoomData } = data;

      const updatedRooms = createdRooms.filter((room) => deletedRoom._id !== room._id);
      const roomStateData = {
        status,
        responseMsg,
        roomData: generateEmptyRoomModel(),
        createdRooms: updatedRooms,
        numberOfRooms: updatedRooms.length
      };
      dispatch(roomDeleted(roomStateData));
      return Promise.resolve(true);
    })
    .catch((error) => {
      dispatch(handleRoomError(error));
      return Promise.resolve(false);
    });
};
/* */

/* non CRUD fetch API actions */
export const handleFetchRooms = (dispatch: Dispatch<RoomAction>, options?: any): Promise<boolean> => {
  const requestOptions = {
    method: "get",
    url: "/api/rooms",
    params: {
      options: options ? options : null
    }
  };

  dispatch(roomAPIRequest());
  return axios(requestOptions)
    .then((response) => {
      const { status, data } = response;
      const { responseMsg, rooms } : { responseMsg: string, rooms: Array<RoomData> } = data;

      const stateData = { status, responseMsg, createdRooms: rooms, numberOfRooms: rooms.length };
      dispatch(setRooms(stateData));
      return Promise.resolve(true);
    })
    .catch((error) => {
      dispatch(handleRoomError(error));
      return Promise.resolve(false);
    });
};
/* */

/* Image upload, delete API actions */
export const handleUploadRoomImage = (dispatch: Dispatch<RoomAction>, file: FormData, currentRoomsState: RoomState): Promise<boolean> => {
  const { roomData, roomImages, createdRooms } = currentRoomsState;
  const { _id: roomId } = roomData

  const requestOptions = {
    method: "post",
    url: "/api/upload_room_image/" + (roomId ? roomId : ""),
    headers: {
      'content-type': 'multipart/form-data'
    },
    data: file
  };

  dispatch(roomAPIRequest());
  return axios(requestOptions)
    .then((response) => {
      const { status, data } = response;
      const { responseMsg, newImage, updatedRoom } : { responseMsg: string, newImage: RoomImgData, updatedRoom: RoomData } = data;
      let updatedRoomData: any; let updatedRooms: any; 
      let updatedRoomImages: Array<RoomImgData> = [ ...roomImages, newImage ];
      if (updatedRoom) {
        // image being uploaded on a created room //
        // update roomData and createdServices array //
        updatedRooms = createdRooms.map((room) => {
          if (room._id === updatedRoom._id) {
            return { ...updatedRoom, images: [ ...updatedRoom.images ] };
          } else {
            return room;
          }
        });
        updatedRoomData = { ...updatedRoom };
      }
      const stateData = {
        status,
        responseMsg,
        roomImages: updatedRoomImages,
        updatedRoom: updatedRoomData ? updatedRoomData : roomData,
        createdRooms: updatedRooms ? updatedRooms : createdRooms
      };
      dispatch(roomImgUploadSuccess(stateData));
      return Promise.resolve(true);
    })
    .catch((error) => {
      dispatch(handleRoomError(error));
      return Promise.resolve(false);
    });
};
/**
 * 
 * @param {function} dispatch redux dispatch function
 * @param {string} imageId Room model ObjectId
 * @param {object} roomsState current room model state
 */
 export const handleDeleteRoomImage = (dispatch: Dispatch<RoomAction>, imageToDeleteId: string, roomsState: RoomState): Promise<boolean> => {
  const { roomData, roomImages, createdRooms } = roomsState;
  const requestOptions = {
    method: "delete",
    url: "/api/delete_room_image/" + imageToDeleteId
  };

  dispatch(roomAPIRequest());
  return axios(requestOptions)
    .then((response) => {
      const { status, data } = response;
      const { responseMsg, deletedImage, updatedRoom } : { responseMsg: string, deletedImage: RoomImgData, updatedRoom: RoomData } = data;
      const { _id: deletedImgId } = deletedImage;

      const newImageState = roomImages.filter((image) => deletedImage._id !== image._id);
      let updatedRoomsArr; 
      if (updatedRoom) {
        updatedRoomsArr = createdRooms.map((room) => {
          if (room._id === updatedRoom._id) {
            return { ...updatedRoom, images: [ ...updatedRoom.images ] };
          } else {
            return room;
          }
        });
      }
      const stateData = {
        status,
        responseMsg,
        roomImages: newImageState,
        updatedRoom: updatedRoom ? updatedRoom : roomData,
        createdRooms: updatedRoomsArr ? updatedRoomsArr : createdRooms,
      };
      dispatch(roomImgDeleteSuccess(stateData));
      return Promise.resolve(true);
    })
    .catch((error) => {
      dispatch(handleRoomError(error));
      return Promise.resolve(false);
    });
};

export const handleDeleteAllRoomImages = (dispatch: Dispatch<RoomAction>, currentRoomState: RoomState): Promise<boolean> => {
  const { roomImages } = currentRoomState;
  const axiosRequest = {
    method: "delete",
    url: "/api/rooms/delete_all_images",
    data: {
      roomImages: roomImages
    }
  };
  
  return axios(axiosRequest)
    .then((response) => {
      const { status, data } = response;
      const { responseMsg } : { responseMsg: string } = data;

      const updatedState = { status, responseMsg, updatedRoomImages: [] };
      dispatch(deleteAllRoomImages(updatedState));
      return Promise.resolve(true);
    })
    .catch((error) => {
      dispatch(handleRoomError(error));
      return Promise.resolve(true);
    })
};

// take online and offline API actions //
export const handleToggleRoomOnlineOffline = (dispatch: Dispatch<RoomAction>, roomToUpdate: RoomData, currentRoomState: RoomState): Promise<boolean> => {
  const { _id: roomId, live } = roomToUpdate;
  const { createdRooms } = currentRoomState;
  const requestOptions = {
    method: "patch",
    url: "/api/rooms/" + roomId,
    data: {
      onlineStatus: { status: !live },
    }
  };

  dispatch(roomAPIRequest());
  return axios.request(requestOptions)
    .then((response) => {
      const { status, data } = response;
      const { responseMsg, updatedRoom } : { responseMsg: string, updatedRoom: RoomData } = data;

      const updatedRoomsArr = createdRooms.map((room) => {
        if (room._id == updatedRoom._id) {
          return { ...updatedRoom };
        } else {
          return room;
        }
      });
      const stateData = { status, responseMsg, updatedRoom, updatedRoomsArr };
      dispatch(toggleRoomOnlineOffline(stateData));
      return Promise.resolve(true);
    })
    .catch((error) => {
      dispatch(handleRoomError(error));
      return Promise.resolve(false);
    });
};

export const handleToggleAllOnlineOffline = (dispatch: Dispatch<RoomAction>, { live } : { live: boolean }): Promise<boolean> => {
  const requestOptions = {
    method: "patch",
    url: "/api/rooms/",
    data: {
      allRoomsOnlineStatus: { live: live },
    }
  };

  dispatch(roomAPIRequest());
  return axios(requestOptions)
    .then((response) => {
      const { status, data } = response;
      const { responseMsg, updatedRooms } : { responseMsg: string, updatedRooms: Array<RoomData> } = data;

      const stateUpdateData = { status, responseMsg, updatedRooms };
      dispatch(toggleAllRoomsOnlineOfflineAction(stateUpdateData));
      return Promise.resolve(true);
    })
    .catch((error) => {
      dispatch(handleRoomError(error));
      return Promise.resolve(false);
    });
};


