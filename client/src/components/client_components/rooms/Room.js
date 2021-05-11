// @flow
import * as React from "react";
import { useTranslation } from "react-i18next";
// semantic ui imports //
import { Button,  Carousel, Col, Image, Row, } from "react-bootstrap";
// additional components //
import { RoomLeft } from "./room_views/RoomLeft";
import { RoomRight } from "./room_views/RoomRight";
// styles //
import styles from "./css/room.module.css";
// FLOW types //
import type { RoomData } from "../../../redux/reducers/rooms/flowTypes";
import { setImagePath, setStringTranslation } from "../../helpers/displayHelpers";
import { setDefaultValues } from "./helpers/setDefaultValues";
// translations //


type Props = {
  index: number;
  room: RoomData;
  openPictureModal: (imgPath: string, roomImagePaths: Array<string>, index: number) => void;
  picModalState: {
    showModal: boolean;
    imageIndex: number;
    direction: number;
  }
};
type LocalState = {
  showMobileRoomPicsView: boolean;
};

const Room = ({ index, room, openPictureModal, picModalState } : Props): React.Node => {
  const { showModal, imageIndex, direction } = picModalState;
  const [ t, i18n ]= useTranslation();
  // refs //
  const roomTitleRef = React.useRef(null);
  const roomPicturesRef = React.useRef(null);
  const roomDescRef = React.useRef(null);
  // local state //
  const [ localState, setLocalState ] = React.useState<LocalState>({ showMobileRoomPicsView: false });
  const [ imgURLSArr, setImgURLSArr ] = React.useState<Array<string>>([]);
  //
  const listenToWindowResize = () => {
    if (window.innerWidth < 992) {
      setLocalState({ ...localState, showMobileRoomPicsView: true });
    } else {
      setLocalState({ ...localState, showMobileRoomPicsView: false });
    }
  }
  // lifecycle hooks //
  React.useEffect(() => {
    const animatedRows = document.querySelectorAll(".animatedRoomPicsRow, .animatedRoomDetailsRow");
    console.log(animatedRows)
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.intersectionRatio > 0) {
          if (entry.target.classList.contains("animatedRoomPicsRow")) {
            entry.target.classList.add("scaleAnimate");
          } else {
            entry.target.classList.add("fadeInAnimate");
          }
        }
      });
    });
    animatedRows.forEach((row) => {
      observer.observe(row);
    });
    // event listener for screen size //
    window.addEventListener("resize", listenToWindowResize);
    // check initial screen size to decide on <MobileroomPicsView> render //
    if (window.innerWidth < 992) {
      setLocalState({ ...localState, showMobileRoomPicsView: true });
    }

    return () => {
      animatedRows.forEach((row) => {
        observer.unobserve(row);
      });
      window.removeEventListener("resize", listenToWindowResize);
    }
  }, []);

  React.useEffect(() => {
    const { imageURLS } = setDefaultValues(room);
    setImgURLSArr([ ...imageURLS ]);
  }, [ room ]);

  const handleOpenModal = (clickedImageURL: string) => {
    const index = imgURLSArr.indexOf(clickedImageURL);    
    openPictureModal(clickedImageURL, imgURLSArr, index);
  };

  return (
    <React.Fragment>
      <Row ref={roomTitleRef} className={ styles.roomTitleRow }>
        <Col style={{padding: 0}} sm="12" xl="10" lg="12">
          <div style={{ position: "relative", width: "100%", height: "50px", marginBottom: "1em" }} className={ styles.titleRow }>
            <div className={ styles.strikeThroughDiv }></div>
            <div className={ styles.roomType }>{ setStringTranslation(room.roomType, i18n.language)}</div>
          </div>
        </Col>
      </Row>
      {
        (index % 2 === 0)
        ?
        <React.Fragment>
          <RoomLeft showMobileRoomPicsView={ localState.showMobileRoomPicsView } roomPicturesRef={ roomPicturesRef } roomDescRef={ roomDescRef } roomData={ room } handleOpenModal={ handleOpenModal } imageURLS={ imgURLSArr } />
          <Row style={{ marginTop: "10px", display: "flex", justifyContent: "center" }}>
            <Col className={ styles.bookColumn } sm="12" xl="10" lg="12">
              <Button variant="info">{t("buttons.bookNow")}</Button>
              <div className={ styles.bookPriceDiv }>{t("misc.from")}:<span>{ room.price }</span></div>
            </Col>
          </Row>
        </React.Fragment>
        : 
        <React.Fragment>
          <RoomRight showMobileRoomPicsView={ localState.showMobileRoomPicsView } roomPicturesRef={ roomPicturesRef } roomDescRef={ roomDescRef } roomData={ room } handleOpenModal={ handleOpenModal } imageURLS={ imgURLSArr } />
          <Row style={{ marginTop: "10px", display: "flex", justifyContent: "center" }}>
            <Col className={ styles.bookColumn }  sm="12" xl="10" lg="12">
              <Button variant="info">{t("buttons.bookNow")}</Button>
              {
                room.price 
                ? <div className={ styles.bookPriceDiv }>{t("misc.from")}:<span>{ room.price }</span></div>
                : null
              }
            </Col>
          </Row>
        </React.Fragment>
      }
    </React.Fragment> 
  );
};
// PropTypes validation //

export default Room;
