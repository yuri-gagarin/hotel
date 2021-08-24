// @flow
import {  generateEmptyUserModel } from "../_helpers/emptyDataGenerators";
import type { UserState, UserAction } from "./flowTypes";

const initialState: UserState = {
  status: 200,
  loading: false,
  responseMsg: "",
  userData: generateEmptyUserModel(),
  createdUsers: [],
  numberOfUsers: 0,
  error: null,
  errorMessages: null
}

const roomReducer = (state: UserState = initialState, action: UserAction): UserState => {
  switch (action.type) {
    case "UserAPIRequest": {
      return {
        ...state,
        loading: action.payload.loading,
        status: action.payload.status,
        error: null
      };
    }
    case "SetUsers": {
      return {
        ...state,
        status: action.payload.status,
        loading: action.payload.loading,
        responseMsg: action.payload.responseMsg,
        createdUsers: action.payload.createdUsers,
        numberOfUsers: action.payload.numberOfUsers,
        error: null
      };
    }
    case "ClearUserData": {
      return {
        ...state,
        userData: action.payload.userData,
        error: null
      };
    }
    case "OpenUser": {
      return {
        ...state,
        userData: action.payload.userData,
        error: null
      };
    }
    case "UserCreated": {
      return {
        ...state,
        status: action.payload.status,
        loading: action.payload.loading,
        responseMsg: action.payload.responseMsg,
        userData: action.payload.newUserData,
        createdUsers: [ ...state.createdUsers, action.payload.newUserData ],
        error: null
      };
    }
    case "UserUpdated": {
      return {
        ...state,
        status: action.payload.status,
        loading: action.payload.loading,
        responseMsg: action.payload.responseMsg,
        userData: action.payload.userData,
        createdUsers: action.payload.createdUsers,
        error: null
      };
    }
    case "UserDeleted": {
      return {
        ...state,
        status: action.payload.status,
        loading: action.payload.loading,
        responseMsg: action.payload.responseMsg,
        userData: action.payload.userData,
        createdUsers: action.payload.createdUsers,
        numberOfUsers: action.payload.numberOfUsers,
        error: null
      };
    }
    case "UserError": {
      return {
        ...state,
        status: action.payload.status,
        loading: false,
        responseMsg: action.payload.responseMsg,
        error: action.payload.error,
        errorMessages: action.payload.errorMessages ? action.payload.errorMessages : null
      };
    }
    default: {
      return state;
    }
  }
};

export default roomReducer;