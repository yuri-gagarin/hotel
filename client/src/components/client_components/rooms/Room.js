// @flow //
import * as React from "react";
// semantic ui imports //
import { Button,  Carousel, Col, Image, Row, } from "react-bootstrap"
// styles //
import { roomStyle } from "./style/styles";
import styles from "./style/room.module.css";
// FLOW types //
import type { RoomData } from "../../../redux/reducers/rooms/flowTypes";
import { setImagePath} from "../../helpers/displayHelpers";
// translations //
import { useTranslation } from "react-i18next";


const {
  roomTitle, carouselStyle, carouselImgStyle,
  roomsDescription, roomOptions, bookButton,
  roomDetails, roomOptionsHolder,
  sideImgHolder, sideImg, descriptionHolder, strikeThrough
} = roomStyle;

type Props = {
  room: RoomData,
  openPictureModal: (imgPath: string, roomImagePaths: Array<string>, index: number) => void,
  picModalState: {
    showModal: boolean,
    imageIndex: number,
    direction: number
  }
};

const Room = ({ room, openPictureModal, picModalState } : Props): React.Node => {
  const { options } = room;
  const { showModal, imageIndex, direction } = picModalState;
  const [ t, i18n ]= useTranslation();
  // refs //
  const roomTitleRef = React.useRef(null);
  const roomPicturesRef = React.useRef(null);
  const roomDescRef = React.useRef(null);
  // 
  React.useEffect(() => {
    const animatedRows = document.querySelectorAll(".animatedRoomRow");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
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

  const handleOpenModal = (imagePath: string) => {
    const clickedImageURL = setImagePath(imagePath);
    const imgURLSArr = room.images.map((imageData) => setImagePath(imageData.path) );
    const index = room.images.indexOf(imagePath);
    openPictureModal(clickedImageURL, imgURLSArr, index);
  };

  return (
    <React.Fragment>
      <Row ref={roomTitleRef} className="animatedRoomRow">
        <Col style={{padding: 0}}>
          <div style={{ position: "relative", width: "100%", height: "50px", marginBottom: "1em" }} className={ styles.titleRow }>
            <div style={roomTitle}>{room.roomType}</div>
            <div style={strikeThrough}></div>
          </div>
        </Col>
      </Row>
      <Row ref={roomPicturesRef} className={ `animatedRoomRow ${styles.carouselRow}`}>
        <Col xs="12" lg="6" style={{padding: 0}}>
          <Carousel activeIndex={ imageIndex } direction={direction} onSelect={handleSelect} style={carouselStyle}>
            {
              roomImagePaths.map((imgPath, index) => {
                return (
                  <Carousel.Item key={ imgPath }>
                    <Image
                      fluid
                      className={ styles.roomCarouselImage }
                      src={ setImagePath(imgPath)}
                      alt="First slide"
                      onClick={ () => handleOpenModal(setImagePath(imgPath)) }
                      data-index={index}
                    />
                  </Carousel.Item>
                )
              })
            }
          </Carousel>
        </Col>
        <Col xs="12" lg="6" style={{padding: 0, borderTop: "4px solid rgb(252, 219, 3)", }}>
          <div className={ styles.sideImgContainerTop }>
            <Image
              className={ styles.sideImgTop }
              fluid
              style={sideImg} 
              src={ setImagePath(roomImagePaths[1])} 
              onClick={handleOpenModal}
              data-index={1}
            />
          </div>
          <div className={ styles.sideImgContainerBottom }>
            <Image
              style={sideImg}
              src={ setImagePath(roomImagePaths[2])} 
              onClick={handleOpenModal}
              data-index={2}
            />
          </div>
          <div className={ styles.sideImgContainerBottom }>
            <Image
              style={sideImg} 
              src={ setImagePath(roomImagePaths[3])} 
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

export default Room;
