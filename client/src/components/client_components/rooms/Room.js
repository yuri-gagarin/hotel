import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
// semantic ui imports //
import {
  Col, Row, Carousel, Button
} from "react-bootstrap"
// styles //
import { roomStyle } from "./style/styles";
import styles from "./style/room.module.css";
// helper functions //
import { setUploadedImgPath } from "../../helpers/displayHelpers";
// translations //
import { useTranslation } from "react-i18next";


const {
  roomTitle, carouselStyle, carouselImgStyle,
  roomsDescription, roomOptions, bookButton,
  roomDetails, roomOptionsHolder,
  sideImgHolder, sideImg, descriptionHolder, strikeThrough
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
   // setIndex(selectedIndex);
   // setDirection(e.direction);
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
        <Col textAlign="center">
          <div style={{ position: "relative", width: "100%", height: "50px", marginBottom: "1em" }}>
            <div style={roomTitle}>{room.roomType}</div>
            <div style={strikeThrough}></div>
          </div>
        </Col>
      </Row>
      <Row ref={roomPicturesRef} className={ `animatedRoomRow ${styles.carouselRow}`}>
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
        <Col xs="12" lg="6" style={{padding: 0, borderTop: "4px solid rgb(252, 219, 3)", }}>
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
      <Row ref={roomDescRef} className={`animatedRoomRow ${styles.descriptionContainerRow}`}>
        <Col xs="12" lg="6" style={{padding: 0}}>
          <div style={roomsDescription}>
            <p>{room.description}</p>
          </div>
        </Col>
        <Col xs="12" lg="6" style={{padding: 0}}>
          <div className={ styles.roomDetailsContainer }>
            <span className={ styles.roomDetails }><i className="fas fa-store-alt"></i> {t("rooms.area")}: {room.area}</span>
            <span className={ styles.roomDetails }><i className="fas fa-users"></i> {t("rooms.sleeps")}: {room.sleeps}</span>
            <span className={ styles.roomDetails }><i className="fas fa-bed"></i> {t("rooms.beds")}: {room.beds}</span>
            <span className={ styles.roomDetails }><i className="fas fa-couch"></i> {t("rooms.couches")}: {room.couches}</span>
          </div>
          <div className={ styles.roomOptionsContainer }>
            { 
              options.privateBathroom 
              ? <div className={`${styles.roomOption}`}>
                  <i className={`fas fa-toilet`}></i> {t("rooms.bathRoom")}
                </div> 
              : null
            }
            {
              options.suiteBathroom 
              ? <div className={`${styles.roomOption}`}>
                  <i className={`fas fa-bath`}></i> {t("rooms.shower")}
                </div>
              : null
            }
            { 
              options.wifi
              ? <div className={`${styles.roomOption}`}>
                  <i className={`fas fa-wifi`}></i> {t("rooms.wifi")}
                </div> 
              : null
            }
            {
              options.balcony 
              ? <div className={`${styles.roomOption}`}>
                  <i className={`fas fa-warehouse`}></i> {t("rooms.balcony")}
                </div>
              : null
            }
            { 
              options.terrace
              ? <div className={`${styles.roomOption}`}>
                  <i className={`fas fa-campground`}></i> {t("rooms.terrace")}
                </div>
              : null
            }
            { 
              options.mountainView
              ? <div className={`${styles.roomOption}`}>
                  <i className={`fas fa-mountain`}></i> {t("rooms.mtnView")}
                </div>
              : null
            }
            { 
              options.streetView
              ? <div className={`${styles.roomOption}`}>
                  <i className={`fas fa-road`}></i> {t("rooms.streetView")}
                </div>
              : null
            } 
            { 
              options.riverView
              ? <div className={`${styles.roomOption}`}>
                  <i className={`fas fa-water`}></i> {t("rooms.riverView")}
                </div>
              : null
            } 
            { 
              options.tv
              ? <div className={`${styles.roomOption}`}>
                  <i className={`fas fa-tv`}></i> {t("rooms.tv")}
                </div>
              : null
            }
            {
              options.airConditioning
              ? <div className={`${styles.roomOption}`}>
                  <i className={`fas fa-wind`}></i> {t("rooms.ac")}
                </div>
              : null
            }
           
           
          </div>
          
        </Col>
      </Row>
      <Row style={{ marginTop: "10px" }}>
        <Col style={{ padding: 0 }}>
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
