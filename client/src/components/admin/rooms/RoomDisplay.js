import React, { useState, useEffect, useRef } from "react";
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
  
  const roomRef = useRef(room);

  useEffect(() => {
    // close the room form on state change //
    console.log(room)
    setFormOpen(false);
  }, [room]);

  useEffect(() => {
    if (room !== roomRef.current) {
      setFormOpen(true);
    }
  }, [ room, roomRef.current]);

  useEffect(() => {
    // will scroll down the document when edit room form is open //
    if (formOpen) {
      window.scrollTo(0,document.body.scrollHeight);
    } else {
      window.scrollTo(0, 0);
    }
  }, [formOpen]);

  /*
  useEffect(() => {
    if (prevImages.length !== images.length) {
      setFormOpen(true);
    }
  }, [ imagesRef.current, images ]);
  */
  const openForm = () => {
    setFormOpen(!formOpen);
  };

  return (
    <Grid.Column width={15}>
      <div>
          <h5>Room Type:</h5>
          <h1>{room.roomType}</h1>
          <div className={ styles.roomDetailsDiv }>
            <h5 className={ styles.roomDetailsHeader }>Room Details:</h5>
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
          <div className={ styles.roomDescriptionDiv }>
            <h5>Description:</h5>
            <p>{room.description}</p>
          </div>
          <div className={ styles.roomOptionDiv }>
            <h5 className={ styles.roomOptionHeader }>Room Options:</h5>
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
            <div className={`${styles.roomOption} ${options.phone ? styles.roomOptionAvailable : styles.roomOptionNotAvailable}`}>
              <i className="fas fa-phone-volume"></i>
              <span>Phone: {options.phone ? "Yes" : "No"}</span>
            </div>
            <div className={`${styles.roomOption} ${options.airConditioning ? styles.roomOptionAvailable : styles.roomOptionNotAvailable}`}>
              <i className="fas fa-wind"></i>
              <span>Air Conditioning: {options.airConditioning ? "Yes" : "No"}</span>
            </div>
            <div className={`${styles.roomOption} ${options.refrigerator ? styles.roomOptionAvailable : styles.roomOptionNotAvailable}`}>
              <i className="fas fa-snowflake"></i>
              <span>Refrigerator: {options.refrigerator ? "Yes" : "No"}</span>
            </div>
            <div className={`${styles.roomOption} ${options.coffeeMaker ? styles.roomOptionAvailable : styles.roomOptionNotAvailable}`}>
              <i className="fas fa-coffee"></i>
              <span>Coffee Maker: {options.coffeeMaker ? "Yes" : "No"}</span>
            </div>
          </div>
          <hr />
            <h4>Uploaded Room Images:</h4>
            <div className={ styles.roomImagesDiv }>
              {
                images 
                ? images.map((img) => <Image className={ styles.roomImage } key={img._id} src={setImagePath(img.path)} />)
                : null
              }
            </div>
      </div>
      <div className={ styles.buttonsDiv }>
      {
        formOpen ? <Button inverted color="green" onClick={openForm}>Close Edit Form</Button> : <Button inverted color="green" onClick={openForm}>Edit Room</Button>
      }
      </div>
     
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