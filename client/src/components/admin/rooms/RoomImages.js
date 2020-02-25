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
  const { roomImage } = props;
  const handleImageDelete = () => {

  };

  return (
    <div style={roomImageThumbStyle}>
      <Icon name="trash" style={deleteIconStyle} onClick={handleImageDelete}></Icon>
      <Image src={`${roomImage.path}`} size="small"></Image>
    </div>
  )
};

export default RoomImageThumb;