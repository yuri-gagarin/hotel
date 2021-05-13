// @flow 
import ObjectID from "bson-objectid";
import type { ClientData } from "../../../redux/reducers/client/flowTypes";

type Callback = (data: ClientData) => void;

export const setClient = (setGuestClient: Callback): Promise<void> => {
  let storedClientId = window.sessionStorage.getItem("hotelGuestClientId");
  let storedName = window.sessionStorage.getItem("hotelGuestClientName");

  if (!storedClientId) storedClientId = ObjectID().toHexString();
  if (!storedName) storedName = "Anonymous User";

  setGuestClient({ _id: storedClientId, name: storedName, email: "" });
  return Promise.resolve();
};