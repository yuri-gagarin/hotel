import axios from "axios";
import { roomConstants } from "../constants";
const {
  UPDATE_STATE,
  ROOM_REQUEST,
  ROOM_CREATED,
  ROOM_UPDATED,
  ROOM_DELETED,
  ROOM_ERROR,
  ROOM_IMG_REQUEST,
  ROOM_IMG_UPLOADED,
  ROOM_IMG_DELETED,
  ROOM_IMG_ERROR,
  ADD_NEW_ROOM,
  SET_ROOMS,
  SET_PREVIEW_IMAGES,
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

export const roomCreated = (stateData) => {
  history.push("/admin/dash");
  return {
    type: ROOM_CREATED,
    payload: stateData
  };
};

export const addNewRoom = (roomState) => {
  return {
    type: ADD_NEW_ROOM,
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

};

export const roomDeleted = (stateData) => {

};

export const roomError = (error) => {
  return {
    type: ROOM_ERROR,
    payload: {
      status: 500,
      error: error
    }
  };
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
    type: SET_PREVIEW_IMAGES,
    payload: {
      loading: false,
      roomImages: roomImages,
      error: null
    }
  };
};

export const uploadRoomImage = (dispatch, file) => {
  const requestOptions = {
    method: "post",
    url: "/api/uploadRoomImage",
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
      dispatch(roomImgUploadSucess(stateData));
    })
    .catch((error) => {
      console.error(error);
      dispatch(roomImgUploadError(error));
    });
};

export const handleNewRoom = (dispatch, roomData) => {
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
      dispatch(addNewroom(newRoom));
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
      console.log(rooms);
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

