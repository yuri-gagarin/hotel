// @flow
import * as React from "react";
import { useTranslation } from "react-i18next";
// semantic ui components //
import { Button, Col, Container, Carousel, Modal, Row } from "react-bootstrap";
// additional components //
import NavbarComponent from "../navbar/NavbarComponent";
import Room from "./Room";
import RoomImgModal from "./RoomImgModal";
import ClipText from "../../admin/shared/ClipText";
// redux imports //
import { connect } from "react-redux";
import { handleFetchRooms } from "../../../redux/actions/roomActions";
// FLOW types //
import type { RoomState, RoomAction } from "../../../redux/reducers/rooms/flowTypes";
import type { RootState, Dispatch } from "../../../redux/reducers/_helpers/createReducer";
// styles //
import styles from "./css/roomIndexContainer.module.css";
// helpers //
import { setImagePath } from "../../helpers/displayHelpers";

type Props = {
  roomState: RoomState,
  _handleFetchRooms: () => Promise<boolean>
};

type LocalComponentState = {
  showModal: boolean,
  imageIndex: number,
  clickedImage: string,
  imgURLS: Array<string>,
  headerFixed: boolean
}

const RoomsIndexContainer = ({ roomState, _handleFetchRooms }: Props) => {
  const { createdRooms } = roomState;

  const [ localComponentState, setLocalComponentState ] = React.useState<LocalComponentState>({
    showModal: false,
    imageIndex: 0,
    clickedImage: "",
    imgURLS: [],
    headerFixed: false
  });
  const [ t ] = useTranslation();
  
  const indexRowRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    if (indexRowRef.current) {
      const mainNav = document.getElementById("mainNav");
      if (mainNav && indexRowRef.current) {
        const navHeight = mainNav.getBoundingClientRect().height;
        window.onscroll = () => {
          const indexRowRefY = indexRowRef.current ? indexRowRef.current.getBoundingClientRect().top : 0;
          if (indexRowRefY <= navHeight) {
            if (!localComponentState.headerFixed) {
              setLocalComponentState({ ...localComponentState, headerFixed: true });
            }
          }
        }
      }
    }
    return () => {
      window.onscroll = null;
    }
  }, [ indexRowRef.current, localComponentState.headerFixed ]);

  React.useEffect(() => {
    // Navbar collapse implementation // 
    $("#mainNav").css("backgroundColor", "#2c3531");
    (function (){
      // Collapse Navbar
      var navbarCollapse = function() {
        if ($("#mainNav").offset().top > 100) {
          $("#mainNav").addClass("navbar-shrink");
        } else {
          $("#mainNav").removeClass("navbar-shrink");
        }
      };
      // Collapse now if page is not at top
      navbarCollapse();
      // Collapse the navbar when page is scrolled
      $(window).scroll(navbarCollapse);
    }());
    // END Navbar collapse implementation //
    // fetch the rooms from the server //
    _handleFetchRooms();
  }, []);
  // picture modal togglers //
  const openPictureModal = (imgPath: string, roomImageURLS: Array<string>, index: number): void => {
    setLocalComponentState({ ...localComponentState, showModal: true, imgURLS: roomImageURLS, imageIndex: index });
  };
  const closePictureModal = () => {
   setLocalComponentState({ ...localComponentState, showModal: false, imageIndex: 0, imgURLS: [] });
  };
  // 
  const bookButton = () => {

  };

 
  return (
    <div>
      <NavbarComponent/>
      <div className={ styles.parallax }></div>
      <Row className={ `${styles.roomsIndexHeaderRow} ${ localComponentState.headerFixed ? styles.headerFixed : ""}`} ref={ indexRowRef } >
        <div className={ `${styles.svgContainer}` }>
          <ClipText className={ `${styles.svgText} ${ localComponentState.headerFixed ? styles.svgTextFixed : ""}` } text={t("rooms.roomHeader")} textId="rooms" fontSize={"2em"} />
        </div>
      </Row>
      <RoomImgModal 
        show={ localComponentState.showModal } 
        closePictureModal={closePictureModal }
        imgURLS={ localComponentState.imgURLS } 
        imageIndex={ localComponentState.imageIndex }
      />
      {
        createdRooms.map((room) => {
          return (
            <Container className={ styles.roomsIndexContainer } key={room._id}>       
              <Room  
                room={room} 
                images={room.images} 
                openPictureModal={openPictureModal}
                picModalState={{ showModal: localComponentState.showModal, imageIndex: localComponentState.imageIndex, direction: 1 }}
              />
            </Container>
            );
        })
      } 
      <div className={ styles.parallax }></div>
    </div>
  );
};

// redux mapping functions //
const mapStateToProps = (state: RootState) => {
  return {
    roomState: state.roomState
  };
};
const mapDispatchToProps = (dispatch: Dispatch<RoomAction>) => {
  return {
    _handleFetchRooms: () => handleFetchRooms(dispatch)
  };
};

export default (connect(mapStateToProps, mapDispatchToProps)(RoomsIndexContainer): React.AbstractComponent<Props>);