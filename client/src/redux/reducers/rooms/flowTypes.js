// @flow 
// room img model //
export type RoomImgData = {
  _id: string,
  path: string,
  room?: string,
  createdAt: string,
};
// expected data from client //
export type ClientRoomFormData = {
  _id?: string,
  roomType: string,
  area: string,
  sleeps: string,
  price?: string,
  twinBeds?: string,
  queenBeds?: string,
  kingBeds?: string,
  couches: string,
  description: string,
  images?: Array<RoomImgData>,
  options: {
    privateBathroom: boolean,
    suiteBathroom: boolean,
    bathRobes: boolean,
    freeToileteries: boolean,
    jacuzzi: boolean,
    balcony: boolean,
    terrace: boolean,
    mountainView: boolean,
    streetView: boolean,
    riverView: boolean,
    tv: boolean,
    wifi: boolean,
    phone: boolean,
    airConditioning: boolean,
    refrigerator: boolean,
    coffeeMaker: boolean,
    teaKettle: boolean,
    fan: boolean,
    paidParking: boolean,
    freeParking: boolean
  },
  createdAt?: string,
  editedAt?: string
}
// expected data from server //
export type RoomData = {
  _id: string,
  roomType: string,
  live: boolean,
  area: string,
  sleeps: string,
  price?: string,
  twinBeds?: string,
  queenBeds?: string,
  kingBeds?: string,
  couches: string,
  description: string,
  images: Array<RoomImgData>,
  options: {
    privateBathroom: boolean,
    suiteBathroom: boolean,
    bathRobes: boolean,
    freeToileteries: boolean,
    fan: boolean,
    jacuzzi: boolean,
    balcony: boolean,
    terrace: boolean,
    mountainView: boolean,
    streetView: boolean,
    riverView: boolean,
    tv: boolean,
    wifi: boolean,
    phone: boolean,
    airConditioning: boolean,
    refrigerator: boolean,
    coffeeMaker: boolean,
    teaKettle: boolean,
    paidParking: boolean,
    freeParking: boolean
  },
  createdAt: string,
  editedAt: string
};


export type RoomState = {
  status: number,
  loading: boolean,
  responseMsg: string,
  roomData: RoomData,
  roomImages: Array<RoomImgData>,
  createdRooms: Array<RoomData>,
  numberOfRooms: number,
  error: null | Error
};

export type RoomFetchOptions = {
  limit?: number;
  live?: boolean;
}
// room action types //
export type RoomAPIRequest = {
  +type: "RoomAPIRequest",
  payload: {
    status: number,
    loading: boolean,
    error: null
  }
};
export type SetRooms = {
  +type: "SetRooms",
  payload: {
    status: number,
    loading: boolean,
    responseMsg: string,
    createdRooms: Array<RoomData>,
    numberOfRooms: number
  }
}
export type RoomError = {
  +type: "RoomError",
  payload: {
    status: number,
    responseMsg: string,
    error: any
  }
};
export type RoomCreated = {
  +type: "RoomCreated",
  payload: {
    status: number,
    loading: boolean,
    responseMsg: string,
    newRoomData: RoomData
  }
};
export type RoomUpdated = {
  +type: "RoomUpdated",
  payload: {
    status: number,
    loading: boolean,
    responseMsg: string,
    roomData: RoomData,
    createdRooms: Array<RoomData>
  }
}
export type RoomDeleted = {
  +type: "RoomDeleted",
  payload: {
    status: number,
    loading: boolean,
    responseMsg: string,
    roomData: RoomData,
    createdRooms: Array<RoomData>,
    numberOfRooms: number
  }
};
export type RoomImgUplSuccess = {
  +type: "RoomImgUplSuccess",
  payload: {
    status: number,
    loading: boolean,
    responseMsg: string,
    roomImages: Array<RoomImgData>,
    updatedRoom: RoomData,
    createdRooms: Array<RoomData>
  }
};
export type RoomImgDelSuccess = {
  +type: "RoomImgDelSuccess",
  payload: {
    status: number,
    loading: boolean,
    responseMsg: string,
    roomImages: Array<RoomImgData>,
    updatedRoom: RoomData,
    createdRooms: RoomData[]
  }
};
export type DeleteAllRoomImages = {
  +type: "DeleteAllRoomImages",
  payload: {
    status: number,
    loading: boolean,
    responseMsg: string,
    updatedRoomImages: Array<RoomImgData>
  }
};

export type OpenRoom = {
  +type: "OpenRoom",
  payload: {
    roomData: RoomData,
    roomImages: Array<RoomImgData>
  }
};
export type ClearRoomData = {
  +type: "ClearRoomData",
  payload: {
    roomImages: Array<RoomImgData>,
    roomData: RoomData,
  }
};
export type SetRoomImages = {
  +type: "SetRoomImages",
  payload: {
    roomImages: Array<RoomImgData>
  }
};
export type ToggleRoomOnlineOffline = {
  +type: "ToggleRoomOnlineOffline",
  payload: {
    status: number,
    loading: boolean,
    responseMsg: string,
    updatedRoom: RoomData,
    updatedRoomsArr: Array<RoomData>
  }
};
export type ToggleAllRoomsOnlineOffline = {
  +type: "ToggleAllRoomsOnlineOffline",
  payload: {
    status: number,
    loading: boolean,
    responseMsg: string,
    updatedRooms: Array<RoomData>
  }
};
// union room action type //
export type RoomAction = (
  RoomAPIRequest | SetRooms | RoomError | RoomCreated | RoomUpdated | RoomDeleted |
  RoomImgUplSuccess | RoomImgDelSuccess | DeleteAllRoomImages | OpenRoom | ClearRoomData | SetRoomImages |
  ToggleRoomOnlineOffline | ToggleAllRoomsOnlineOffline
);