import React from "react";
import PropTypes from "prop-types";
import RoomForm from "./RoomForm";

const EditRoomDisplay = (props) => {
  const { room } = props;
  return (
    <div>
      <hr />
      <h3>Editing {room.roomType ? room.roomType : "No Name"}</h3>
      <RoomForm/>
      <hr />
    </div>
  )
};

export default EditRoomDisplay;