// @flow //
import * as React from "react";
import { useTranslation } from "react-i18next";
// bootstrap import //
import { Button, Col, Image, Row } from "react-bootstrap";
// aditional components //
import { MobileRoomPicsView } from "./MobileRoomPicsView";
// styles and css //
import styles from "./css/roomLeft.module.css";
// types //
import type { RoomData } from "../../../../redux/reducers/rooms/flowTypes";
import { setImagePath, setStringTranslation } from "../../../helpers/displayHelpers";

type Props = {
  showMobileRoomPicsView: boolean,
  roomPicturesRef: any,
  roomDescRef: any,
  roomData: RoomData,
  roomImagePaths: Array<string>,
  handleOpenModal: (imgPath: string) => void,
}
export const RoomLeft = ({ showMobileRoomPicsView, roomPicturesRef, roomDescRef, roomData, roomImagePaths, handleOpenModal } : Props): React.Node => {
  const { area, sleeps, twinBeds, queenBeds, kingBeds, couches, price, description, options } = roomData;
  // react i18n //
  const [ t, i18n ] = useTranslation();

  return (
    <React.Fragment>
      <Row ref={roomPicturesRef} className={ `animatedRoomRow ${ styles.carouselRow }`}>
        {
        showMobileRoomPicsView 
        ?
          <MobileRoomPicsView roomImgPaths={ roomImagePaths } handleOpenImgModal={ handleOpenModal } />
        :
        <React.Fragment>
          <Col xs="12" lg="6" className={ styles.leftImgsColumn }>
            <div className={ `${styles.leftImgContainer}`} onClick={() => handleOpenModal(roomImagePaths[0]) }>
              <img
                className={ `${styles.roomImg} ${styles.sideImgLeft}` }
                src={ setImagePath(roomImagePaths[0]) }
                data-index={0}
              />
              <div className={ styles.imgOverlay}>
                <i className={ `fas fa-search-plus ${styles.magnifyImgIcon}`}></i>
              </div> 
            </div>
          </Col>
          <Col xs="12" lg="6"  className={ styles.rightImgsColumn }>
            <div className={ styles.sideImgContainerTop } onClick={() => handleOpenModal(roomImagePaths[1]) }>
              <img
                className={`${styles.roomImg} ${styles.sideImgRightTop}`}
                src={ setImagePath(roomImagePaths[1])} 
                data-index={1}
              />
              <div className={ styles.imgOverlay}>
                <i className={ `fas fa-search-plus ${styles.magnifyImgIcon}`}></i>
              </div> 
            </div>
            <div className={ styles.sideImgContainerBottom } onClick={() => handleOpenModal(roomImagePaths[2]) }>
              <img
                className={`${styles.roomImg} ${styles.sideImgRightBottom}`}
                src={ setImagePath(roomImagePaths[2])} 
                data-index={2}
              />
              <div className={ styles.imgOverlay}>
                <i className={ `fas fa-search-plus ${styles.magnifyImgIcon}`}></i>
              </div> 
            </div>
          </Col>
        </React.Fragment>
        }
      </Row>  
      <Row ref={roomDescRef} className={`animatedRoomRow ${styles.descriptionContainerRow}`}>
        <Col xs="12" lg="6" className={ styles.roomDescColumn }>
          <div className={ styles.roomDescDiv }>
            <p>{ description ?  setStringTranslation(description, i18n.language) : "No description to translate..." }</p>
          </div>
        </Col>
        <Col xs="12" lg="6" className={ styles.roomDetailsColumn }>
          <div className={ styles.roomDetailsContainer }>
            <div className={ styles.roomDetailsHeader }><span>{t("rooms.details")}:</span></div>
            <div className={ styles.roomDetails }><i className="fas fa-store-alt"></i> {t("rooms.area")}: { area }</div>
            <div className={ styles.roomDetails }><i className="fas fa-users"></i> {t("rooms.sleeps")}: { sleeps }</div>
            { parseInt(twinBeds) > 0 ? <div className={ styles.roomDetails }><i className="fas fa-bed"></i> {t("rooms.twinBeds")}: { twinBeds }</div> : null }
            { parseInt(queenBeds) > 0 ? <div className={ styles.roomDetails }><i className="fas fa-bed"></i> {t("rooms.queenBeds")}: { queenBeds }</div> : null }
            { parseInt(kingBeds) > 0 ? <div className={ styles.roomDetails }><i className="fas fa-bed"></i> {t("rooms.kingBeds")}: { kingBeds }</div> : null }
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
              options.fan
              ? <div className={`${styles.roomOption}`}>
                  <i className="fas fa-fan"></i> {t("rooms.fan")}
                </div>
              : null
            }
            {
              options.bathRobes
              ? <div className={`${styles.roomOption}`}>
                  <i className="fas fa-shoe-prints"></i> {t("rooms.bathrobes")}
                </div>
              : null
            }
            {
              options.freeToileteries
              ? <div className={`${styles.roomOption}`}> {t("rooms.toileteries")}
                  <i className="fas fa-pump-soap"></i>          
                </div>
              : null
            }
            {
              options.jacuzzi
              ? <div className={`${styles.roomOption}`}>
                <i className="fas fa-hot-tub"></i> {t("rooms.jacuzzi")}
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
              options.streetView
              ? <div className={`${styles.roomOption}`}>
                  <i className={`fas fa-road`}></i> {t("rooms.streetView")}
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
              options.wifi
              ? <div className={`${styles.roomOption}`}>
                  <i className={`fas fa-wifi`}></i> {t("rooms.wifi")}
                </div> 
              : null
            }
            { 
              options.phone
              ? <div className={`${styles.roomOption}`}>
                  <i className="fas fa-phone-volume"></i> {t("rooms.phone")}
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
            {
              options.refrigerator
              ? <div className={`${styles.roomOption}`}>
                  <i className={`fas fa-wind`}></i> {t("rooms.refrigerator")}
                </div>
              : null
            }
            {
              options.coffeeMaker
              ? <div className={`${styles.roomOption}`}>
                  <i className="fas fa-coffee"></i> {t("rooms.coffeeMaker")}
                </div>
              : null
            }
            {
              options.teaKettle
              ? <div className={`${styles.roomOption}`}>
                  <i className="fas fa-blender"></i> {t("rooms.teaKettle")}
                </div>
              : null
            }
            {
              options.freeParking
              ? <div className={`${styles.roomOption}`}>
                  <i className="fas fa-car-alt"></i> {t("rooms.freeParking")}
                </div>
              : null
            }
            {
              options.paidParking
              ? <div className={`${styles.roomOption}`}>
                  <i className="fas fa-money-bill"></i><i className="fas fa-car-alt"></i> {t("rooms.paidParking")}
                </div>
              : null
            }
          
          
          </div>
          
        </Col>
      </Row>
    </React.Fragment>
  );
};