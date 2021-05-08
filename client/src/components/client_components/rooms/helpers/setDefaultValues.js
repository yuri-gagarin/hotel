// @flow
import type { RoomData } from "../../../../redux/reducers/rooms/flowTypes";
import { setImagePath } from "../../../helpers/displayHelpers";

type DefaultData = {
  roomType: string;
  description: string;
  imageURLS: Array<string>;
}
export const setDefaultValues = (roomData: RoomData): DefaultData => {
  let roomType, description, imageURLS = [];
  if (roomData && typeof roomData === "object") {
    roomType = roomData.roomType ? roomData.roomType : "Title here...";
    description = roomData.description ? roomData.description : "Write a short description here, be creative...";
    if (roomData.images && Array.isArray(roomData.images) && roomData.images.length <= 3) {
      for (let i = 0; i < 3; i++) {
        if (roomData.images[i] && typeof roomData.images[i].path === "string") {
          imageURLS.push(setImagePath(roomData.images[i].path));
        } else {
          imageURLS.push("/assets/images/standard/premierStandard" + (i+1).toString() + ".jpg");
        }
      }
    } else if (roomData.images && Array.isArray(roomData.images) && roomData.images.length > 3) {
      for (let i = 0; i < roomData.images.length; i++) {
        imageURLS.push(setImagePath(roomData.images[i].path));
      }
    } else {
      for (let i = 0; i < 3; i++) {
        imageURLS[i] = "/assets/images/standard/premierStandard" + (i+1).toString() + ".jpg";
      }
    }
  } else {
    // default values  //
    roomType = "Room Type";
    description = "Write a short description here, be creative...";
    for (let i = 0; i < 3; i++) {
      imageURLS.push( "/assets/images/standard/premierStandard" + (i+1).toString() + ".jpg");
    }
  }
  return { roomType, description, imageURLS };
};