// @flow //
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
// translations //


type Props = {
  index: number,
  room: RoomData,
  openPictureModal: (imgPath: string, roomImagePaths: Array<string>, index: number) => void,
  picModalState: {
    showModal: boolean,
    imageIndex: number,
    direction: number
  }
};
type LocalState = {
  showMobileRoomPicsView: boolean
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

  const listenToWindowResize = () => {
    if (window.innerWidth < 992) {
      setLocalState({ ...localState, showMobileRoomPicsView: true });
    } else {
      setLocalState({ ...localState, showMobileRoomPicsView: false });
    }
  }
  // lifecycle hooks //
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
            <div className={ styles.roomType }>{ setStringTranslation(room.roomType, i18n.language)}</div>
          </div>
        </Col>
      </Row>
      {
        (index % 2 === 0)
        ?
        <React.Fragment>
          <RoomLeft showMobileRoomPicsView={ localState.showMobileRoomPicsView } roomPicturesRef={ roomPicturesRef } roomDescRef={ roomDescRef } roomData={ room } roomImagePaths={ roomImagePaths } handleOpenModal={ handleOpenModal } />
          <Row style={{ marginTop: "10px" }}>
            <Col className={ styles.bookColumn }>
              <Button variant="info">{t("buttons.bookNow")}</Button>
              <div className={ styles.bookPriceDiv }>{t("misc.from")}:<span>{ room.price }</span></div>
            </Col>
          </Row>
        </React.Fragment>
        : 
        <React.Fragment>
          <RoomRight showMobileRoomPicsView={ localState.showMobileRoomPicsView } roomPicturesRef={ roomPicturesRef } roomDescRef={ roomDescRef } roomData={ room } roomImagePaths={ roomImagePaths } handleOpenModal={ handleOpenModal } />
          <Row style={{ marginTop: "10px" }}>
            <Col className={ styles.bookColumn }>
              <Button variant="info">{t("buttons.bookNow")}</Button>
              <div className={ styles.bookPriceDiv }>{t("misc.from")}:<span>{ room.price }</span></div>
            </Col>
          </Row>
        </React.Fragment>
      }
    </React.Fragment> 
  );
};
// PropTypes validation //

export default Room;
