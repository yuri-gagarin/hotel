// @flow

// expected state //
export type ClientState = {
  _id: string;
  name: string;
  email: string;
};

// actions //
type SetGuestUser = {
  +type: "SetGuestUser";
  payload: {
    _id: string;
    name: string;
    email: string;
  }
};
type SetClientError = {
  +type: "SetClientError";
  payload: {
    error: Error | any;
  }
};
type ClearClientError = {
  +type: "ClearClientError";
  payload: {
    error: null;
  }
};

export type ClientAction = SetGuestUser | SetClientError | ClearClientError;

