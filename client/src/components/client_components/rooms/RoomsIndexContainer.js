// @flow
import * as React from "react";
// semantic ui components //
import { Button, Col, Container, Carousel, Modal, Row } from "react-bootstrap";
// additional components //
import NavbarComponent from "../navbar/NavbarComponent";
import Room from "./Room";
import RoomImgModal from "./RoomImgModal";
// redux imports //
import { connect } from "react-redux";
import { handleFetchRooms } from "../../../redux/actions/roomActions";
// FLOW types //
import type { RoomState, RoomAction } from "../../../redux/reducers/rooms/flowTypes";
import type { RootState, Dispatch } from "../../../redux/reducers/_helpers/createReducer";
// styles //
import { roomStyle as style } from "./style/styles";
import styles from "./style/roomIndexContainer.module.css";
// helpers //
import { setImagePath } from "../../helpers/displayHelpers";

const {
  background, carouselStyle,
  containerStyle, headerStyle,
  roomTitle, roomsDescription,
  roomOptions
} = style

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
  /*
  const [imageIndex, setImageIndex] = React.useState(0);
  const [showModal, setShowModal] = React.useState(false);
  const [clickedImg, setClickedImg] = React.useState("");
  const [imagePaths, setImagePaths] = React.useState([]);
  const [ headerFixed, setHeaderFixed ] = React.useState(false);
  */
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
  const openPictureModal = (imgPath: string, roomImagePaths: Array<string>, index: number): void => {
    console.log(roomImagePaths);
    setLocalComponentState({ ...localComponentState, showModal: true, imgURLS: roomImagePaths, imageIndex: index });
  };
  const closePictureModal = () => {
   setLocalComponentState({ ...localComponentState, showModal: false, imageIndex: 0, imgURLS: [] });
  };
  // 
  const bookButton = () => {

  };

 
  return (
    <div style={background}>
      <NavbarComponent/>
      <div className={ styles.parallax }></div>
      <Row className={ `${styles.roomsIndexHeaderRow} ${ localComponentState.headerFixed ? styles.headerFixed : ""}`} ref={ indexRowRef } >
        <div>Our Rooms</div>
      </Row>
      <RoomImgModal 
        show={ localComponentState.showModal } 
        closePictureModal={closePictureModal }
        imgURLS={ localComponentState.imgURLS } 
        imageIndex={ localComponentState.imageIndex }
      />
      <Container className={ styles.roomsIndexContainer }>
       
        {
          createdRooms.map((room) => {
            return (
              <Room 
                key={room._id} 
                room={room} 
                images={room.images} 
                openPictureModal={openPictureModal}
                picModalState={{ showModal: localComponentState.showModal, imageIndex: localComponentState.imageIndex, direction: 1 }}
              />
            );
          })
        } 
      </Container>
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