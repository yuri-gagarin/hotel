// @flow 
import { useEffect, useState } from  "react";
import ObjectID from "bson-objectid";

export type ClientData = {
  _id: string;
  name?: string;
  email?: string;
};

export const setClient = (clientState: any): ClientData => {
  const [ clientData, setClientData ] = useState<ClientData>({ _id: "" });

  useEffect(() => {
    let storedClientId = localStorage.getItem("hotelGuestClientId");
    let storedName = localStorage.getItem("hotelGuestClientName");

    if (!storedClientId) storedClientId = ObjectID.toHexString();
    if (!storedName) storedName = "Anonymous User";
  
    setClientData({ ...clientData,  _id: storedClientId,  name: storedName });

  }, [ clientState ]);

  return clientData;
};