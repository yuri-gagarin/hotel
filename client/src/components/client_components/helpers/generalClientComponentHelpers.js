// @flow 
import ObjectID from "bson-objectid";

export type ClientData = {
  _id: string;
  name?: string;
  email?: string;
};
type Callback = (data: ClientData) => void;

export const setClient = (setGuestClient: Callback): Promise<void> => {
  console.log(sessionStorage)
  let storedClientId = sessionStorage.getItem("hotelGuestClientId");
  let storedName = sessionStorage.getItem("hotelGuestClientName");

  if (!storedClientId) storedClientId = ObjectID().toHexString();
  if (!storedName) storedName = "Anonymous User";

  setGuestClient({ _id: storedClientId, name: storedName });
  return Promise.resolve();
};