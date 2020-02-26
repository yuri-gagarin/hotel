import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Button, Grid, Image, Item, Segment, Container
} from "semantic-ui-react";
// additional component imports //
import RoomForm from "./RoomForm";

const style = {
  metaStyle: {
    border: "2px solid grey",
    padding: "0.5em",
    marginRight: "0.5em",
    marginBottom: "0.5em",
    display: "inline-block"
  },
  roomDescription: {
    border: "2px solid grey",
    padding: "0.5em",
    marginTop: "0.5em",
    marginBottom: "1em",
    fontSize: "18px",
  },
  roomImage: {
    border: "1px solid grey",
    marginRight: "0.5em",
    marginBottom: "1em",
    display: "inline-block"
  },
  formButton: {
    marginTop: "1em",
    marginBottom: "1em"
  }
};
const {
  metaStyle, roomDescription, roomImage, formButton
} = style;

const normalizePath = (uploadPath) => {
  const imgSourcePath = uploadPath.split("/");
  return  "/" + imgSourcePath[1] + "/" + imgSourcePath[2] + "/" + imgSourcePath[3];
};

const RoomDisplay = (props) => {
  const [formOpen, setFormOpen] = useState(false);
  const { room } = props;
  const { options, images } = room;

  const openForm = () => {
    setFormOpen(!formOpen);
  };

  return (
    <Grid.Column width={12}>
      <div>
          <h1>{room.roomType}</h1>
          <h4>Room Details</h4>
          <div>
            <div style={metaStyle}>Area: {room.area}</div>
            <div style={metaStyle}>Sleeps: {room.sleeps}</div>
            <div style={metaStyle}>Price: {room.price}</div>
            <div style={metaStyle}>Beds: {room.beds}</div>
            <div style={metaStyle}>Couches: {room.couches}</div>

          </div>
          <h4>Description</h4>
          <div style={roomDescription}>{room.description}</div>
          <h4>Room Options</h4>
          <div>
            <div style={metaStyle}>Private Bathroom: {options.privateBathroom ? "Yes" : "No"}</div>
            <div style={metaStyle}>Suite Bathroom: {options.suiteBathoptions ? "Yes" : "No"}</div>
            <div style={metaStyle}>Balcony: {options.balcony ? "Yes" : "No"}</div>
            <div style={metaStyle}>Terrace: {options.terrace ? "Yes" : "No"}</div>
            <div style={metaStyle}>Street View: {options.streetView ? "Yes" : "No"}</div>
            <div style={metaStyle}>Mountain View: {options.mountainView ? "Yes" : "No"}</div>
            <div style={metaStyle}>River View: {options.riverView ? "Yes" : "No"}</div>
            <div style={metaStyle}>TV: {options.tv ? "Yes" : "No"}</div>
            <div style={metaStyle}>WiFi: {options.wifi ? "Yes" : "No"}</div>
            <div style={metaStyle}>Air Conditioning: {options.airConditioning ? "Yes" : "No"}</div>
          </div>
          <hr />
            <div>Room Images</div>
          <hr />
          {
            images.map((img) => <Image style={roomImage} size='medium' src={normalizePath(img.path)} />)
          }
      </div>
      {
        formOpen ? <Button style={formButton} onClick={openForm}>Cancel</Button> : <Button style={formButton} onClick={openForm}>Edit Room</Button>
      }
      { formOpen ? <RoomForm room={room} /> : null }
    </Grid.Column>
  );
};

export default RoomDisplay;