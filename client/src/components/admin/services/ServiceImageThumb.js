import React from "react";
import { Image, Icon } from "semantic-ui-react";

const serviceImageThumbStyle = {
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

const ServiceImageThumb = (props) => {
  const { serviceImage, handleImageDelete } = props;
  console.log(25)
  // 
  const normalizePath = (uploadPath) => {
    if (uploadPath) {
      const imgSourcePath = uploadPath.split("/");
      return  "/" + imgSourcePath[1] + "/" + imgSourcePath[2] + "/" + imgSourcePath[3];
    } else {
      return "";
    }
  };
  //
  return (
    <div style={serviceImageThumbStyle}>
      <Icon name="trash" style={deleteIconStyle} onClick={() => handleImageDelete(serviceImage._id)}></Icon>
      <Image src={normalizePath(serviceImage.path)} size="small"></Image>
    </div>
  )
};

export default ServiceImageThumb;