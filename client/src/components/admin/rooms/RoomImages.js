import React from "react";
import { Image, Icon } from "semantic-ui-react";

const roomImageThumbStyle = {
  border: "1px solid grey",
  borderRadius: "5px",
  padding: "0.5em",
  position: "relative",
  display: "inline-block",
  marginTop: "0.5em",
  marginRight: "0.5em"
};
const deleteIconStyle = {
  fontSize: "35px",
  position: "absolute",
  top: "-15%",
  right: "-15%",
  cursor: "pointer",
  color: "red",
  zIndex: "999"
};

const RoomImageThumb = (props) => {
  const { roomImage, handleImageDelete } = props;

  // 
  const normalizePath = (uploadPath) => {
    const imgSourcePath = uploadPath.split("/");
    return  "/" + imgSourcePath[1] + "/" + imgSourcePath[2] + "/" + imgSourcePath[3];
  };
  //
  return (
    <div style={roomImageThumbStyle}>
      <Icon name="trash" style={deleteIconStyle} onClick={() => handleImageDelete(roomImage._id)}></Icon>
      <Image src={normalizePath(roomImage.path)} size="small"></Image>
    </div>
  )
};

export default RoomImageThumb;