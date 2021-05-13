// @flow
// data types //
export type ClientData = {
  _id: string;
  name: string;
  email: string;
};
// expected state //
export type ClientState = {
  status: number;
  responseMsg: string;
  _id: string;
  name: string;
  email: string;
  error: any | null;
  errorMessages: Array<string> | null;
};

// actions //
export type SetGuestUser = {
  +type: "SetGuestUser";
  payload: {
    _id: string;
    name: string;
    email: string;
  }
};
export type SetClientError = {
  +type: "SetClientError";
  payload: {
    status: number;
    responseMsg: string;
    error: Error | any;
    errorMessages: Array<string>;
  }
};
export type ClearClientError = {
  +type: "ClearClientError";
  payload: {
    error: null;
    errorMessages: null;
  }
};

export type ClientAction = SetGuestUser | SetClientError | ClearClientError;

