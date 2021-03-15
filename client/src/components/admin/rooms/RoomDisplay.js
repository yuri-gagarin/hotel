import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Button, Grid, Image, Item, Segment, Container
} from "semantic-ui-react";
// additional component imports //
import EditRoomDisplay from "./EditRoomDisplay";
// styles and css //
import styles from "./css/roomDisplay.module.css";
// helpers //
import { setImagePath } from "../../helpers/displayHelpers";

const RoomDisplay = (props) => {
  const { room, history } = props;
  const [formOpen, setFormOpen] = useState(false);
  const { options, images } = room;

  useEffect(() => {
    // close the room form on state change //
    setFormOpen(false);
  }, [room]);

  useEffect(() => {
    // will scroll down the document when edit room form is open //
    if (formOpen) {
      window.scrollTo(0,document.body.scrollHeight);
    } else {
      window.scrollTo(0, 0);
    }
  }, [formOpen]);

  const openForm = () => {
    setFormOpen(!formOpen);
  };

  return (
    <Grid.Column width={15}>
      <div>
          <h5>Room Type:</h5>
          <h1>{room.roomType}</h1>
          <h5>Room Details:</h5>
          <div className={ styles.roomDetailsDiv }>
            <div className={ styles.roomDetail }>
              Area: {room.area}
            </div>
            <div className={ styles.roomDetail }>
              Sleeps: {room.sleeps}
            </div>
            <div className={ styles.roomDetail }>
              Price: {room.price}
            </div>
            <div className={ styles.roomDetail }>
              Beds: {room.beds}
            </div>
            <div className={ styles.roomDetail }>
              Couches: {room.couches}
            </div>
          </div>
          <h5>Description:</h5>
          <div className={ styles.roomDescriptionDiv }>
            <p>{room.description}</p>
          </div>
          <h5>Room Options:</h5>
          <div className={ styles.roomOptionDiv }>
            <div className={`${styles.roomOption} ${options.privateBathroom ? styles.roomOptionAvailable : styles.roomOptionNotAvailable}`}>
              <i className="fas fa-toilet"></i>
              <span>Private Bathroom: {options.privateBathroom ? "Yes" : "No"}</span>
            </div>
            <div className={`${styles.roomOption} ${options.suiteBathroom ? styles.roomOptionAvailable : styles.roomOptionNotAvailable}`}>
              <i className="fas fa-bath"></i>
              <span>Bathtub: {options.suiteBathroom ? "Yes" : "No"}</span>
            </div>
            <div className={`${styles.roomOption} ${options.jacuzzi ? styles.roomOptionAvailable : styles.roomOptionNotAvailable}`}>
              <i className="fas fa-hot-tub"></i>
              <span>Jacuzzi: {options.jacuzzi ? "Yes" : "No"}</span>
            </div>
            <div className={`${styles.roomOption} ${options.balcony ? styles.roomOptionAvailable : styles.roomOptionNotAvailable}`}>
              <i className="fas fa-warehouse"></i>
              <span>Balcony: {options.balcony ? "Yes" : "No"}</span>
            </div>
            <div className={`${styles.roomOption} ${options.terrace ? styles.roomOptionAvailable : styles.roomOptionNotAvailable}`}>
              <i className="fas fa-store"></i>
              <span>Terrace: {options.terrace ? "Yes" : "No"}</span>
            </div>
            <div className={`${styles.roomOption} ${options.streetView ? styles.roomOptionAvailable : styles.roomOptionNotAvailable}`}>
              <i className="fas fa-road"></i>
              <span>Street View: {options.streetView ? "Yes" : "No"}</span>
            </div>
            <div className={`${styles.roomOption} ${options.mountainView ? styles.roomOptionAvailable : styles.roomOptionNotAvailable}`}>
              <i className="fas fa-mountain"></i>
              <span>Mountain View: {options.mountainView ? "Yes" : "No"}</span>
            </div>
            <div className={`${styles.roomOption} ${options.riverView ? styles.roomOptionAvailable : styles.roomOptionNotAvailable}`}>
              <i className="fas fa-water"></i>
              <span>River View: {options.riverView ? "Yes" : "No"}</span>
            </div>
            <div className={`${styles.roomOption} ${options.tv ? styles.roomOptionAvailable : styles.roomOptionNotAvailable}`}>
              <i className="fas fa-tv"></i>
              <span>TV: {options.tv ? "Yes" : "No"}</span>
            </div>
            <div className={`${styles.roomOption} ${options.wifi ? styles.roomOptionAvailable : styles.roomOptionNotAvailable}`}>
              <i className="fas fa-wifi"></i>
              <span>WiFi: {options.wifi ? "Yes" : "No"}</span>
            </div>
            <div className={`${styles.roomOption} ${options.airConditioning ? styles.roomOptionAvailable : styles.roomOptionNotAvailable}`}>
              <i className="fas fa-snowflake"></i>
              <span>Air Conditioning: {options.airConditioning ? "Yes" : "No"}</span>
            </div>
          </div>
          <hr />
            <h4>Uploaded Room Images:</h4>
            <div className={ styles.roomImagesDiv }>
              {
                images.map((img) => <Image className={ styles.roomImage } key={img._id} size='medium' src={setImagePath(img.path)} />)
              }
            </div>
      </div>
      {
        formOpen ? <Button inverted color="green" style={formButton} onClick={openForm}>Close</Button> : <Button inverted color="green" onClick={openForm}>Edit Room</Button>
      }
      { formOpen ? <EditRoomDisplay history={history} room={room} /> : null }
    </Grid.Column>
  );
};
// PropTypes validations //
RoomDisplay.propTypes = {
  room: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};


export default RoomDisplay;