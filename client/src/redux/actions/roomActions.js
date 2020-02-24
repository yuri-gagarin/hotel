import { roomConstants } from "../constants";
const {
  ROOM_IMG_REQUEST,
  ROOM_IMG_UPLOADED,
  ROOM_IMG_DELETED,
  ROOM_IMG_ERROR
} = roomConstants;

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