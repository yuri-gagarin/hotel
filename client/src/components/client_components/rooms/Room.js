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
  roomDetails, roomOptionsHolder,
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
      <Row style={{ marginTop: "10px" }}>
        <Col xs="12" lg="6" style={{padding: 0}}>
          <div style={roomsDescription}>
            <p>{room.description}</p>
          </div>
        </Col>
        <Col xs="12" lg="6" style={{padding: 0}}>
          <div>
            <span style={roomDetails}><i className="fas fa-store-alt"></i> Area: {room.area} m<sup>2</sup></span>
            <span style={roomDetails}><i className="fas fa-users"></i> Sleeps: {room.sleeps}</span>
            <span style={roomDetails}><i className="fas fa-bed"></i> Beds: {room.beds}</span>
            <span style={roomDetails}><i className="fas fa-couch"></i> Couches: {room.couches}</span>
          </div>
          <div style={roomOptionsHolder}>
            { 
              options.privateBathroom 
              ? <span style={roomOptions}><i className="fas fa-toilet"></i> Private Bathroom</span> 
              : null
            }
            {
              options.suiteBathroom 
              ? <span style={roomOptions}><i className="fas fa-bath"></i> Suite Bathroom</span>
              : null
            }
            { 
              options.wifi
              ? <span style={roomOptions}><i className="fas fa-wifi"></i> Free WiFi</span> 
              : null
            }
            {
              options.balcony 
              ? <span style={roomOptions}><i className="fas fa-warehouse"></i> Balcony</span>
              : null
            }
            { 
              options.terrace
              ? <span style={roomOptions}><i className="fas fa-campground"></i> Terrace</span>
              : null
            }
            { 
              options.mountainView
              ? <span style={roomOptions}><i className="fas fa-mountain"></i> Mountain View</span>
              : null
            }
            { 
              options.streetView
              ? <span style={roomOptions}><i className="fas fa-road"></i> Street View</span>
              : null
            } 
            { 
              options.riverView
              ? <span style={roomOptions}><i className="fas fa-water"></i> River View</span>
              : null
            } 
            { 
              options.tv
              ? <span style={roomOptions}><i className="fas fa-tv"></i> TV</span>
              : null
            }
            {
              options.airConditioning
              ? <span style={roomOptions}><i className="fas fa-wind"></i> Air Conditioning</span>
              : null
            }
           
           
          </div>
          
        </Col>
      </Row>
      <Row>
        <Col>
          <Button style={bookButton}>Book Now</Button>
        </Col>
      </Row>
      <hr />
    </React.Fragment> 
  );
};
// PropTypes validation //
Room.propTypes = {

};

export default Room;
