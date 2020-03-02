import React, { useState } from "react";
import PropTypes from "prop-types";
// semantic ui imports //
import {
  Col, Image, Row, Carousel, Button
} from "react-bootstrap"
// styles //
import { roomStyle } from "./style/styles";
// helper functions //
import { setUploadedImgPath } from "./../helpers/displayHelpers";

const {
  roomTitle, carouselStyle, carouselImgStyle,
  roomsDescription, roomOptions, bookButton,
  sideImgHolder, sideImg
} = roomStyle;

const Room = (props) => {
  const { room = {}, images = [] } = props;
  const { options } = room;
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(null);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
    setDirection(e.direction);
  };
  const roomImagePaths = room.images.map((image) => image.path);
  return (
    <React.Fragment>
      <Row>
        <Col>
          <div style={roomTitle}>{room.roomType}</div>
        </Col>
      </Row>
      <Row>
        <Col xs="12" lg="6" style={{padding: 0}}>
          <Carousel activeIndex={index} direction={direction} onSelect={handleSelect} style={carouselStyle}>
            {
              roomImagePaths.map((imgPath, index) => {
                return (
                  <Carousel.Item key={index}>
                    <img
                      style={carouselImgStyle}
                      src={setUploadedImgPath(imgPath)}
                      alt="First slide"
                    />
                  </Carousel.Item>
                )
              })
            }
          </Carousel>
        </Col>
        <Col xs="12" lg="6" style={{padding: 0}}>
          <div style={sideImgHolder}>
            <img style={sideImg} src={setUploadedImgPath(roomImagePaths[1])}/>
          </div>
          <div style={sideImgHolder}>
            <img style={sideImg} src={setUploadedImgPath(roomImagePaths[2])}/>
          </div>
          <div style={sideImgHolder}>
            <img style={sideImg} src={setUploadedImgPath(roomImagePaths[3])}/>
          </div>
        </Col>
      </Row>  
      <hr />
      <Row>
        <Col xs="12" lg="6" style={{padding: 0}}>
          <div style={roomsDescription}>
            <p>{room.description}</p>
          </div>
        </Col>
        <Col xs="12" lg="6" style={{padding: 0}}>
          <span style={roomOptions}><i className="fas fa-mountain"></i> Inner Courtyard View</span>
          <span style={roomOptions}><i className="fas fa-umbrella-beach"></i> Patio</span>
          <span style={roomOptions}><i className="fas fa-bath"></i>  Private Bathroom</span>
          <span style={roomOptions}><i className="fas fa-wifi"></i> Free Wifi</span>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button style={bookButton}>Book Now</Button>
        </Col>
      </Row>
    </React.Fragment> 
  );
};
// PropTypes validation //
Room.propTypes = {

};

export default Room;
