import axios from "axios";
import { roomConstants } from "../constants";
const {
  UPDATE_STATE,
  CLEAR_ROOM_DATA,
  ROOM_REQUEST,
  ROOM_CREATED,
  ROOM_UPDATED,
  ROOM_DELETED,
  ROOM_ERROR,
  CHANGE_ROOM_ONLINE_STATUS,
  ROOM_IMG_REQUEST,
  ROOM_IMG_UPLOADED,
  ROOM_IMG_DELETED,
  ROOM_IMG_ERROR,
  ADD_ROOM_TO_STATE,
  SET_ROOMS,
  SET_ROOM_PREVIEW_IMAGES,
  OPEN_ROOM,
  CLOSE_ROOM
} = roomConstants;
//import history from "../history";

export const uploadRequest = () => {
  return {
    type: ROOM_IMG_REQUEST,
    payload: {
      loading: true,
      error: null
    }
  };
};

export const roomImgUploadSucess = (stateData) => {
  return {
    type: ROOM_IMG_UPLOADED,
    payload: stateData
  };
};

export const roomImgDeleteSuccess = (stateData) => {
  return {
    type: ROOM_IMG_DELETED,
    payload: stateData
  };
};

export const roomImgUploadError = (error) => {
  return {
    type: ROOM_IMG_ERROR,
    payload: {
      status: 500,
      responseMsg: "An error occured",
      error: error
    }
  };
};

export const roomRequest = () => {
  return {
    type: ROOM_REQUEST,
    payload: {
      status: null,
      loading: true,
      error: null
    }
  };
};

export const changeRoomOnlineStatus = (stateData) => {
  return {
    type: CHANGE_ROOM_ONLINE_STATUS,
    payload: stateData
  };
};

export const roomCreated = (stateData) => {
  return {
    type: ROOM_CREATED,
    payload: stateData
  };
};

export const addNewRoom = (roomState) => {
  return {
    type: ADD_ROOM_TO_STATE,
    payload: {
      newRoom: roomState
    }
  };
};   

export const setRooms = (stateData) => {
  return {
    type: SET_ROOMS,
    payload: stateData
  };
};

export const roomUpdated = (stateData) => {
  return {
    type: ROOM_UPDATED,
    payload: stateData
  };
};

export const roomDeleted = (stateData) => {
  return {
    type: ROOM_DELETED,
    payload: stateData
  };
};

export const roomError = (axiosError) => {
  // remove and set into own function later //
  console.log(axiosError)
  const errResponse = axiosError.response;
  if (errResponse) {
    const { data, status } = errResponse;
    const { responseMsg, error } = data;
    return {
      type: ROOM_ERROR,
      payload: {
        responseMsg: responseMsg,
        status: status,
        error: error ? error : axiosError
      }
    };
  } else {
    return {
      type: ROOM_ERROR,
      payload: {
        responseMsg: "An error occured",
        status: status,
        error: axiosError
      }
    };
  }
  
};

export const openRoom = (rooms, roomId) => {
  const roomData = rooms.filter((room) => room._id == roomId)[0];
  return {
    type: OPEN_ROOM,
    payload: {
      loading: false,
      roomData: roomData,
      error: null
    }
  };
};

export const setPreviewImages = (roomImages = []) => {
  return {
    type: SET_ROOM_PREVIEW_IMAGES,
    payload: {
      loading: false,
      roomImages: roomImages,
      error: null
    }
  };
};

export const clearRoomData = () => {
  return {
    type: CLEAR_ROOM_DATA,
    payload: {
      loading: false,
      roomData: {},
      roomImages: [],
      error: null
    }
  };
};

/**
 * 
 * @param {function} dispatch redux dispatch function
 * @param {File} file form file of image 
 * @param {object} roomsState State of the Rooms
 */
export const uploadRoomImage = (dispatch, file, roomsState) => {
  const { roomData, roomImages, createdRooms } = roomsState;
  const { _id: roomId } = roomData ? roomData : "";
  
  const requestOptions = {
    method: "post",
    url: "/api/uploadRoomImage/" + (roomId ? roomId : ""),
    headers: {
      'content-type': 'multipart/form-data'
    },
    data: file
  }

  dispatch(uploadRequest());
  return axios(requestOptions)
    .then((response) => {
      const { status, data } = response;
      const { responseMsg, newImage, updatedRoom } = data;

      if (updatedRoom) {
        // request is done on existing room //
        const updatedRooms = createdRooms.map((room) => {
          if (room._id === updatedRoom._id) {
            return {
              ...updatedRoom,
              images: [ ...updatedRoom.images ]
            }
          } else {
            return room;
          }
        });
        const stateData = {
          status: status,
          loading: false,
          responseMsg: responseMsg,
          roomImages: [ ...roomImages, newImage ],
          roomData: { ...updatedRoom, images: [ ...updatedRoom.images ]},
          createdRooms: updatedRooms,
          error: null
        };
        dispatch(roomImgUploadSucess(stateData));
        return Promise.resolve(true);
      } else {
        const stateData = {
          status: status,
          loading: false,
          responseMsg: responseMsg,
          roomImages: [ ...roomImages, newImage ],
          roomData: {},
          error: null
        };
        dispatch(roomImgUploadSucess(stateData));
        return Promise.resolve(true);
      }
    })
    .catch((error) => {
      console.error(error);
      dispatch(roomImgUploadError(error));
      return Promise.resolve(false);
    });
};
/**
 * 
 * @param {function} dispatch redux dispatch function
 * @param {string} imageId Room model ObjectId
 * @param {object} roomsState current room model state
 */
export const deleteRoomImage = (dispatch, imageId, roomsState) => {
  const { roomData, roomImages, createdRooms } = roomsState;
  const requestOptions = {
    method: "delete",
    url: "/api/deleteRoomImage/" + imageId
  };
  dispatch(uploadRequest());
  return axios(requestOptions)
    .then((response) => {
      const { status, data } = response;
      const { responseMsg, deletedImage, updatedRoom } = data;
      const newImageState = roomImages.filter((image) => deletedImage._id !== image._id);

      if (updatedRoom) {
        const updatedRooms = createdRooms.map((room) => {
          if (room._id === updatedRoom._id) {
            return { ...updatedRoom };
          } else {
            return room;
          }
        });
        const stateData = {
          status: status,
          loading: false,
          responseMsg: responseMsg,
          roomImages: newImageState,
          roomData: updatedRoom,
          createdRooms: updatedRooms,
          error: null
        };
        dispatch(roomImgDeleteSuccess(stateData));
        return Promise.resolve(true);
      } else {
        const stateData = {
          status: status,
          loading: false,
          responseMsg: responseMsg,
          roomImages: newImageState,
          roomData: {},
          error: null
        };
        dispatch(roomImgDeleteSuccess(stateData));
        return Promise.resolve(true);
      }
    })
    .catch((error) => {
      console.error(error);
      dispatch(roomImgUploadError(error));
    });
}

export const handleNewRoom = (dispatch, roomData, history) => {
  const requestOptions = {
    method: "post",
    url: "/api/createRoom",
    data: {
      roomData: roomData,
    }
  };
  dispatch(roomRequest());
  return axios(requestOptions)
    .then((response) => {
      const { status, data } = response;
      const { responseMsg, newRoom } = data;
      const stateData = {
        status: status,
        loading: false,
        responseMsg: responseMsg,
        roomData: newRoom,
        roomImages: newRoom.images,
        error: null
      };
      dispatch(roomCreated(stateData));
      dispatch(addNewRoom(newRoom));
      history.push("/admin/rooms");
    })
    .catch((error) => {
      console.error(error);
      dispatch(roomError(error));
    });
};

export const fetchRooms = (dispatch) => {
  const requestOptions = {
    method: "get",
    url: "/api/rooms"
  };
  dispatch(roomRequest());
  return axios(requestOptions)
    .then((response) => {
      const { status, data } = response;
      const { responseMsg, rooms } = data;
      const stateData = {
        status: status,
        loading: false,
        responseMsg: responseMsg,
        createdRooms: rooms,
        error: null
      };
      dispatch(setRooms(stateData))
    })
    .catch((error) => {
      console.error(error);
      dispatch(roomError(error));
    });
};

export const updateRoom = (dispatch, roomData, roomImages = {}, currentRooms = []) => {
  const roomId = roomData._id
  const requestOptions = {
    method: "patch",
    url: "/api/rooms/" + roomId,
    data: {
      roomData: roomData,
      roomImages: roomImages
    }
  }
  dispatch(roomRequest());
  return axios(requestOptions)
    .then((response) => {
      const { status, data } = response;
      const { responseMsg, updatedRoom } = data;
      const updatedRooms = currentRooms.map((room) => {
        if (room._id == updatedRoom._id) {
          return {
            ...updatedRoom
          };
        } else {
          return room;
        }
      })
      const roomStateData = {
        status: status,
        loading: false,
        responseMsg: responseMsg,
        roomData: updatedRoom,
        roomImages: updatedRoom.images,
        createdRooms: updatedRooms,
        error: null
      };
      dispatch(roomUpdated(roomStateData));
    })
    .catch((error) => {
      console.error(error);
      dispatch(roomError(error));
    })
};

export const onlineRoomStatusAPIRequest = (dispatch, roomData, currentRooms=[]) => {
  console.log("fired change online status")
  const { _id: roomId, live } = roomData;
  const requestOptions = {
    method: "patch",
    url: "/api/rooms/" + roomId,
    data: {
      changeOnlineStatus: { status: !live },
    }
  };

  dispatch(roomRequest());

  return axios.request(requestOptions)
    .then((response) => {
      const { status, data } = response;
      const { responseMsg, updatedRoom } = data;
      console.log(data);

      const updatedRooms = currentRooms.map((room) => {
        if (room._id == updatedRoom._id) {
          return {
            ...updatedRoom
          };
        } else {
          return room;
        }
      });
      const roomStateData = {
        status: status,
        loading: false,
        responseMsg: responseMsg,
        roomData: updatedRoom,
        roomImages: updatedRoom.images,
        createdRooms: updatedRooms,
        error: null
      };
      dispatch(changeRoomOnlineStatus(roomStateData));
    })
    .catch((error) => {
      console.error(error);
      dispatch(roomError(error));
    });
};

export const deleteRoom = (dispatch, roomId, currentRooms = []) => {
  const roomImages = currentRooms.filter((room) => roomId == room._id)[0].images;
  const requestOptions = {
    method: "delete",
    url: "/api/rooms/" + roomId,
    data: {
      roomImages: roomImages
    }
  };
  dispatch(roomRequest());
  return axios(requestOptions)
    .then((response) => {
      const { status, data } = response;
      const { responseMsg, deletedRoom } = data;
      const updatedRooms = currentRooms.filter((room) => {
        return deletedRoom._id != room._id;
      });
      const roomStateData = {
        status: status,
        loading: false,
        responseMsg: responseMsg,
        roomData: {},
        roomImages: [],
        createdRooms: updatedRooms,
        error: null
      };
      dispatch(roomDeleted(roomStateData));
    })
    .catch((error) => {
      dispatch(roomError(error));
    });
};

