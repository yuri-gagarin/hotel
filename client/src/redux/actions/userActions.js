// @flow
import axios from "axios";
// flow types //
import type { 
   UserData, UserState,
  UserAPIRequest, UserCreated, UserUpdated, UserDeleted,
  OpenUser, SetUsers, ClearUserData, UserError,
  UserFormData, UserAction
} from "../reducers/users/flowTypes";
import type { Dispatch } from "../reducers/_helpers/createReducer";
// helpers //
import { normalizeErrorMessages, setAxiosError } from "./helpers/errorHelpers";
import { generateEmptyUserModel } from "../reducers/_helpers/emptyDataGenerators";

/* API request actions and error */
const userAPIRequest = (): UserAPIRequest => {
  return {
    type: "UserAPIRequest",
    payload: {
      status: 202,
      loading: true,
      error: null
    }
  };
};
const userError = ({ status, responseMsg, error }: { status: number, responseMsg: string, error: Error }): UserError => {
  console.error(error);
  return {
    type: "UserError",
    payload: {
      status: status,
      responseMsg: responseMsg,
      error: error
    }
  };
};

/* CRUD API actions */
const userCreated = (data: { status: number, responseMsg: string, newUserData: UserData }): UserCreated => {
  return {
    type: "UserCreated",
    payload: { ...data, loading: false }
  };
};
const userUpdated = (data: { status: number, responseMsg: string, userData: UserData, createdUsers: Array<UserData> }): UserUpdated => {
  return {
    type: "UserUpdated",
    payload: { ...data, loading: false }
  };
};
const userDeleted = (data: { status: number, responseMsg: string, userData: UserData, createdUsers: Array<UserData>, numberOfUsers: number }): UserDeleted => {
  return {
    type: "UserDeleted",
    payload: { ...data, loading: false }
  };
};
/* */

/* image upload api actions */
// TODO this is to be implemented later for user avatar //
/*
const userImgUploadSuccess = (data: { status: number, responseMsg: string, userImages: Array<UserImgData>, updatedUser: UserData, createdUsers: Array<UserData> }): UserImgUplSuccess => {
  return {
    type: "UserImgUplSuccess",
    payload: { ...data, loading: false }
  };
};

const userImgDeleteSuccess = (data: { status: number, responseMsg: string, userImages: Array<UserImgData>, updatedUser: UserData, createdUsers: Array<UserData> }): UserImgDelSuccess => {
  return {
    type: "UserImgDelSuccess",
    payload: { ...data, loading: false }
  };
};

const deleteAllUserImages = (data: { status: number, responseMsg: string, updatedUserImages: Array<UserImgData> }): DeleteAllUserImages => {
  return {
    type: "DeleteAllUserImages",
    payload: { ...data, loading: false }
  };
};
*/


/* non API actions */
const setUsers = (data: { status: number, responseMsg: string, createdUsers: Array<UserData>, numberOfUsers: number }): SetUsers => {
  return {
    type: "SetUsers",
    payload: { ...data, loading: false }
  };
};
const openUser = (data: { userData: UserData }): OpenUser => {
  return {
    type: "OpenUser",
    payload: { ...data }
  };
};

const clearUserData = (data: { userData: UserData }): ClearUserData => {
  return {
    type: "ClearUserData",
    payload: { ...data }
  };
};
/* */
