import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
// semantic ui imports //
import {
  Col, Row, Carousel, Button
} from "react-bootstrap"
// styles //
import { roomStyle } from "./style/styles";
// helper functions //
import { setUploadedImgPath } from "./../helpers/displayHelpers";
// translations //
import { useTranslation } from "react-i18next";


const {
  roomTitle, carouselStyle, carouselImgStyle,
  roomsDescription, roomOptions, bookButton,
  roomDetails, roomOptionsHolder,
  sideImgHolder, sideImg
} = roomStyle;

const Room = (props) => {
  const { room, openPictureModal } = props;
  const { options } = room;
  const [index, setIndex] = useState(0);
  const [isVisible, setVisible] = useState(false)
  const [direction, setDirection] = useState(null);
  const [t, i18n]= useTranslation();
  // refs //
  const roomTitleRef = useRef(null);
  const roomPicturesRef = useRef(null);
  const roomDescRef = useRef(null);
  // 
  useEffect(() => {
    const animatedRows = document.querySelectorAll(".animatedRoomRow");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          console.log("entered view");
          entry.target.classList.add("isVisible");
        }
      });
    });
    animatedRows.forEach((row) => {
      observer.observe(row);
    });
    return () => {
      animatedRows.forEach((row) => {
        observer.unobserve(row);
      });
    }
  }, []);


  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
    setDirection(e.direction);
  };
  const roomImagePaths = room.images.map((image) => image.path);

  const handleOpenModal = (e) => {
    const index = e.target.dataset;
    console.log(e.target.src)
    openPictureModal(e.target.src, roomImagePaths, index);
  };

  return (
    <React.Fragment>
      <Row ref={roomTitleRef} className="animatedRoomRow">
        <Col>
          <div style={roomTitle}>{t("rooms.type") + " - " + room.roomType}</div>
        </Col>
      </Row>
      <Row ref={roomPicturesRef} className="animatedRoomRow">
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
                      onClick={handleOpenModal}
                      data-index={index}
                    />
                  </Carousel.Item>
                )
              })
            }
          </Carousel>
        </Col>
        <Col xs="12" lg="6" style={{padding: 0}}>
          <div style={sideImgHolder}>
            <img 
              style={sideImg} 
              src={setUploadedImgPath(roomImagePaths[1])} 
              onClick={handleOpenModal}
              data-index={1}
            />
          </div>
          <div style={sideImgHolder}>
            <img 
              style={sideImg}
              src={setUploadedImgPath(roomImagePaths[2])} 
              onClick={handleOpenModal}
              data-index={2}
            />
          </div>
          <div style={sideImgHolder}>
            <img 
              style={sideImg} 
              src={setUploadedImgPath(roomImagePaths[3])} 
              onClick={handleOpenModal}
              data-index={3}
            />
          </div>
        </Col>
      </Row>  
      <Row style={{ marginTop: "10px" }} ref={roomDescRef} className="animatedRoomRow">`}>
        <Col xs="12" lg="6" style={{padding: 0}}>
          <div style={roomsDescription}>
            <p>{room.description}</p>
          </div>
        </Col>
        <Col xs="12" lg="6" style={{padding: 0}}>
          <div>
            <span style={roomDetails}><i className="fas fa-store-alt"></i> {t("rooms.area")}: {room.area} m<sup>2</sup></span>
            <span style={roomDetails}><i className="fas fa-users"></i> {t("rooms.sleeps")}: {room.sleeps}</span>
            <span style={roomDetails}><i className="fas fa-bed"></i> {t("rooms.beds")}: {room.beds}</span>
            <span style={roomDetails}><i className="fas fa-couch"></i> {t("rooms.couches")}: {room.couches}</span>
          </div>
          <div style={roomOptionsHolder}>
            { 
              options.privateBathroom 
              ? <span style={roomOptions}><i className="fas fa-toilet"></i> {t("rooms.bathRoom")}</span> 
              : null
            }
            {
              options.suiteBathroom 
              ? <span style={roomOptions}><i className="fas fa-bath"></i> {t("rooms.shower")}</span>
              : null
            }
            { 
              options.wifi
              ? <span style={roomOptions}><i className="fas fa-wifi"></i> {t("rooms.wifi")}</span> 
              : null
            }
            {
              options.balcony 
              ? <span style={roomOptions}><i className="fas fa-warehouse"></i> {t("rooms.balcony")}</span>
              : null
            }
            { 
              options.terrace
              ? <span style={roomOptions}><i className="fas fa-campground"></i> {t("rooms.terrace")}</span>
              : null
            }
            { 
              options.mountainView
              ? <span style={roomOptions}><i className="fas fa-mountain"></i> {t("rooms.mtnView")}</span>
              : null
            }
            { 
              options.streetView
              ? <span style={roomOptions}><i className="fas fa-road"></i> {t("rooms.streetView")}</span>
              : null
            } 
            { 
              options.riverView
              ? <span style={roomOptions}><i className="fas fa-water"></i> {t("rooms.riverView")}</span>
              : null
            } 
            { 
              options.tv
              ? <span style={roomOptions}><i className="fas fa-tv"></i> {t("rooms.tv")}</span>
              : null
            }
            {
              options.airConditioning
              ? <span style={roomOptions}><i className="fas fa-wind"></i> {t("rooms.ac")}</span>
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
  room: PropTypes.object.isRequired,
  openPictureModal: PropTypes.func.isRequired
};

export default Room;
