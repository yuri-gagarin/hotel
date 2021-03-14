import React from "react";
import { Image, Icon } from "semantic-ui-react";
// helpers //
import { setImagePath } from "../../helpers/displayHelpers";

const diningModelImageThumbStyle = {
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

const DiningEntertainmentImageThumb = (props) => {
  const { diningModelImage, handleImageDelete } = props;

  //
  return (
    <div style={diningModelImageThumbStyle}>
      <Icon name="trash" style={deleteIconStyle} onClick={() => handleImageDelete(diningModelImage._id)}></Icon>
      <Image src={setImagePath(diningModelImage.path)} size="small"></Image>
    </div>
  )
};

export default DiningEntertainmentImageThumb;