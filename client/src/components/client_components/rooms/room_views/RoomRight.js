// @flow //
import * as React from "react";
import { useTranslation } from "react-i18next";
// bootstrap import //
import { Button, Col, Image, Row } from "react-bootstrap";
// styles and css //
import styles from "./css/roomRight.module.css";
// types //
import type { RoomData } from "../../../../redux/reducers/rooms/flowTypes";
import { setImagePath, setStringTranslation } from "../../../helpers/displayHelpers";

type Props = {
  roomPicturesRef: any,
  roomDescRef: any,
  roomData: RoomData,
  roomImagePaths: Array<string>,
  handleOpenModal: (imgPath: string) => void,
}
export const RoomRight = ({ roomPicturesRef, roomDescRef, roomData, roomImagePaths, handleOpenModal } : Props): React.Node => {
  const { area, sleeps, beds, couches, price, description, options } = roomData;
  // react i18n //
  const [ t, i18n ] = useTranslation();

  return (
    <React.Fragment>
      <Row ref={roomPicturesRef} className={ `animatedRoomRow ${ styles.carouselRow }`}>
        <Col xs="12" lg="6"  className={ styles.leftImgsColumn }>
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
              className={`${styles.roomImg} ${styles.sideImgLeftBottom}`}
              src={ setImagePath(roomImagePaths[2])} 
              data-index={2}
            />
          </div>
        </Col>
        <Col xs="12" lg="6" className={ styles.rightImgsColumn }>
          <div className={ `${styles.rightImgContainer}`} onClick={() => handleOpenModal(roomImagePaths[0]) }>
            <Image 
              fluid
              className={ `${styles.roomImg} ${styles.sideImgRight}` }
              src={ setImagePath(roomImagePaths[0]) }
              data-index={0}
            />
          </div>
        </Col>
      </Row>  
      <Row ref={roomDescRef} className={`animatedRoomRow ${styles.descriptionContainerRow}`}>
        <Col xs="12" lg="6" className={ styles.roomDetailsColumn }>
          <div className={ styles.roomDetailsContainer }>
            <div className={ styles.roomDetailsHeader }><span>{t("rooms.details")}:</span></div>
            <div className={ styles.roomDetails }><i className="fas fa-store-alt"></i> {t("rooms.area")}: { area }</div>
            <div className={ styles.roomDetails }><i className="fas fa-users"></i> {t("rooms.sleeps")}: { sleeps }</div>
            <div className={ styles.roomDetails }><i className="fas fa-bed"></i> {t("rooms.beds")}: { beds }</div>
            <div className={ styles.roomDetails }><i className="fas fa-couch"></i> {t("rooms.couches")}: { couches }</div>
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
        <Col xs="12" lg="6" className={ styles.roomDescColumn }>
          <div className={ styles.roomDescDiv }>
            <p>{ description ?  setStringTranslation(description, i18n) : "No description to translate..." }</p>
          </div>
        </Col>
      </Row>
      <Row style={{ marginTop: "10px" }}>
        <Col className={ styles.bookColumn }>
          <Button variant="info">{t("buttons.bookNow")}</Button>
          <div className={ styles.bookPriceDiv }>{t("misc.from")}:<span>{ price }</span></div>
        </Col>
      </Row>
    </React.Fragment>
  );
};