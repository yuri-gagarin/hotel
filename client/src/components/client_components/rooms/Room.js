// @flow //
import * as React from "react";
import { useTranslation } from "react-i18next";
// semantic ui imports //
import { Button,  Carousel, Col, Image, Row, } from "react-bootstrap"
// styles //
import styles from "./css/room.module.css";
// FLOW types //
import type { RoomData } from "../../../redux/reducers/rooms/flowTypes";
import { setImagePath} from "../../helpers/displayHelpers";
// translations //


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

  const roomImagePaths = room.images.map((image) => image.path);
  const handleOpenModal = (imagePath: string) => {
    const clickedImageURL = setImagePath(imagePath);
    const imgURLSArr = roomImagePaths.map((imagePath) => setImagePath(imagePath) );
    const index = roomImagePaths.indexOf(imagePath);
    
    openPictureModal(clickedImageURL, imgURLSArr, index);
  };

  return (
    <React.Fragment>
      <Row ref={roomTitleRef}>
        <Col style={{padding: 0}}>
          <div style={{ position: "relative", width: "100%", height: "50px", marginBottom: "1em" }} className={ styles.titleRow }>
            <div className={ styles.strikeThroughDiv }></div>
            <div className={ styles.roomType }>{room.roomType}</div>
          </div>
        </Col>
      </Row>
      <Row ref={roomPicturesRef} className={ `animatedRoomRow ${styles.carouselRow}`}>
        <Col xs="12" lg="6" className={ styles.leftImgsColumn }>
          <div className={ `${styles.leftImgContainer}`} onClick={() => handleOpenModal(roomImagePaths[0]) }>
            <Image 
              fluid
              className={ `${styles.roomImg} ${styles.sideImgLeft}` }
              src={ setImagePath(roomImagePaths[0]) }
              data-index={0}
            />
          </div>
        </Col>
        <Col xs="12" lg="6"  className={ styles.rightImgsColumn }>
          <div className={ styles.sideImgContainerTop } onClick={() => handleOpenModal(roomImagePaths[1]) }>
            <Image 
              fluid
              className={`${styles.roomImg} ${styles.sideImgRightTop}`}
              src={ setImagePath(roomImagePaths[1])} 
              data-index={1}
            />
          </div>
          <div className={ styles.sideImgContainerBottom } onClick={() => handleOpenModal(roomImagePaths[2]) }>
            <img
              className={`${styles.roomImg} ${styles.sideImgRightBottom}`}
              src={ setImagePath(roomImagePaths[2])} 
              data-index={2}
            />
          </div>
          <div className={ styles.sideImgContainerBottom } onClick={() => handleOpenModal(roomImagePaths[3]) }>
            <img
              className={`${styles.roomImg} ${styles.sideImgRightBottom}`}
              src={ setImagePath(roomImagePaths[3])} 
              data-index={3}
            />
          </div>
        </Col>
      </Row>  
      <Row ref={roomDescRef} className={`animatedRoomRow ${styles.descriptionContainerRow}`}>
        <Col xs="12" lg="6" className={ styles.roomDescColumn }>
          <div className={ styles.roomDescDiv }>
            <p>{room.description}</p>
          </div>
        </Col>
        <Col xs="12" lg="6" className={ styles.roomDetailsColumn }>
          <div className={ styles.roomDetailsContainer }>
            <div className={ styles.roomDetailsHeader }><span>{t("rooms.details")}:</span></div>
            <div className={ styles.roomDetails }><i className="fas fa-store-alt"></i> {t("rooms.area")}: {room.area}</div>
            <div className={ styles.roomDetails }><i className="fas fa-users"></i> {t("rooms.sleeps")}: {room.sleeps}</div>
            <div className={ styles.roomDetails }><i className="fas fa-bed"></i> {t("rooms.beds")}: {room.beds}</div>
            <div className={ styles.roomDetails }><i className="fas fa-couch"></i> {t("rooms.couches")}: {room.couches}</div>
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
        <Col className={ styles.bookColumn }>
          <Button variant="info">{t("buttons.bookNow")}</Button>
          <div className={ styles.bookPriceDiv }>{t("misc.from")}:<span>{room.price}</span></div>
        </Col>
      </Row>
      <hr />
    </React.Fragment> 
  );
};
// PropTypes validation //

export default Room;
