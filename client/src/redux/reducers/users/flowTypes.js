// @flow
export type UserData = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: "admin" | "owner" | "user" | "";
  confirmed: boolean;
  editedAt: string;
  createdAt: string;
}
export type UserFormData  = {
  _id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  role?: "admin" | "owner" | "user";
  confirmed?: boolean;
}

export type UserState = {
  status: number;
  loading: boolean;
  responseMsg: string;
  userData: UserData;
  createdUsers: Array<UserData>;
  numberOfUsers: number;
  error: null | Error;
  errorMessages: null | Array<string>;
};

export type UserFetchOptions = {
  limit?: number;
  live?: boolean;
  confirmed?: boolean;
  role?: "admin" | "owner" | "user";
};

// user api actions //
export type UserAPIRequest = {
  +type: "UserAPIRequest";
  payload: {
    status: number;
    loading: boolean;
    error: null
  }
};
export type SetUsers = {
  +type: "SetUsers";
  payload: {
    status: number;
    loading: boolean;
    responseMsg: string;
    createdUsers: Array<UserData>;
    numberOfUsers: number
  }
};
// CRUD //
export type UserCreated = {
  +type: "UserCreated";
  payload: {
    status: number;
    loading: boolean;
    responseMsg: string;
    newUserData: UserData
  }
};
export type UserUpdated = {
  +type: "UserUpdated";
  payload: {
    status: number;
    loading: boolean;
    responseMsg: string;
    userData: UserData;
    createdUsers: Array<UserData>;
  }
};
export type UserDeleted = {
  +type: "UserDeleted";
  payload: {
    status: number;
    loading: boolean;
    responseMsg: string;
    userData: UserData;
    createdUsers: Array<UserData>;
    numberOfUsers: number;
  }
};
export type UserError = {
  +type: "UserError";
  payload: {
    status: number;
    responseMsg: string;
    error: any;
    errorMessages?: Array<string>;
  }
};

export type OpenUser= {
  +type: "OpenUser";
  payload: {
    userData: UserData;
  }
};
export type ClearUserData = {
  +type: "ClearUserData";
  payload: {
    userData: UserData;
  }
};

export type UserAction = (
  UserAPIRequest | SetUsers | UserCreated | UserUpdated | UserDeleted | OpenUser | ClearUserData | UserError
);

