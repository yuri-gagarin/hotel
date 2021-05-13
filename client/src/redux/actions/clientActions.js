// @flow
import type { ClientAction, ClientState, SetGuestUser, SetClientError, ClearClientError, ClientData } from "../reducers/client/flowTypes";
import type { Dispatch } from "../reducers/_helpers/createReducer";
// helpers //
import { setAxiosError } from "./helpers/errorHelpers";

const setGuestClient = ({ _id, name, email }: { _id: string, name: string, email: string}): SetGuestUser => {
  return {
    type: "SetGuestUser",
    payload: { _id, name, email }
  };
};
const setClientError = ({ status, responseMsg, error, errorMessages }: { status: number, responseMsg: string, error: any, errorMessages: Array<string> }): SetClientError => {
  return {
    type: "SetClientError",
    payload: { status, responseMsg, error, errorMessages }
  };
};
const clearClientError = ({ error, errorMessages }: { error: null, errorMessages: null }): ClearClientError => {
  return {
    type: "ClearClientError",
    payload: { error, errorMessages }
  };
};

// exported actions to components //
export const handleSetGuestClient = (dispatch: Dispatch<ClientAction>, clientData: ClientData): void => {
  dispatch(setGuestClient(clientData));
};

export const handleSetClientError = (dispatch: Dispatch<ClientAction>, err: any): void => {
  const { status, responseMsg, error, errorMessages } = setAxiosError(err);
  dispatch(setClientError({ status, responseMsg, error, errorMessages }));
};

export const handleClearClientError = (dispatch: Dispatch<ClientAction>): void => {
  dispatch(clearClientError({ error: null, errorMessages: null }));
};


