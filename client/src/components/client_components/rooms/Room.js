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
import { setImagePath} from "../../helpers/displayHelpers";
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
/* extract later */
/* TODO move to a helpers sections */

const setRoomDescTranslation = (roomDescription: string, i18nLanguage: string) => {
  let descriptionText: string;
  const translations = roomDescription.split(/(<en>|<ru>|<uk>)/g).filter((text) => text.length !== 0);
  console.log(translations)
  if (i18nLanguage === "en" && translations.indexOf("<en>") !== -1) {
    descriptionText = translations[translations.indexOf("<en>") + 1];
  } else if (i18nLanguage === "ru" && translations.indexOf("<ru>") !== -1) {
    descriptionText = translations[translations.indexOf("<ru>") + 1];
  } else if (i18nLanguage === "uk" && translations.indexOf("<uk>") !== -1) {
    descriptionText = translations[translations.indexOf("<uk>") + 1];
  } else {
    descriptionText = "Couldn't resolve translation";
  }
  return descriptionText;
}

const Room = ({ index, room, openPictureModal, picModalState } : Props): React.Node => {
  const { showModal, imageIndex, direction } = picModalState;
  const [ t, i18n ]= useTranslation();
  // refs //
  const roomTitleRef = React.useRef(null);
  const roomPicturesRef = React.useRef(null);
  const roomDescRef = React.useRef(null);
  // local state //
  const [ localState, setLocalState ] = React.useState<{ roomDescTranslated: string }>({ roomDescTranslated: "No description" });

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

  React.useEffect(() => {
    const { description } = room;
    const { language } = i18n;
    const roomDescTranslated= setRoomDescTranslation(description, language);
    setLocalState({ roomDescTranslated });
  }, [ room, i18n.language ]);

  
  const setRoomDescriptionTranslation = (roomDescription: string) => {
    setRoomDescTranslation(roomDescription, i18n);
    return "No description";
  }

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
      {
        (index % 2 === 0)
        ?
        <RoomLeft roomPicturesRef={ roomPicturesRef } roomDescRef={ roomDescRef } roomData={ room } roomImagePaths={ roomImagePaths } handleOpenModal={ handleOpenModal } />
        : 
        <RoomRight roomPicturesRef={ roomPicturesRef } roomDescRef={ roomDescRef } roomData={ room } roomImagePaths={ roomImagePaths } handleOpenModal={ handleOpenModal } />
      }
      
    </React.Fragment> 
  );
};
// PropTypes validation //

export default Room;
