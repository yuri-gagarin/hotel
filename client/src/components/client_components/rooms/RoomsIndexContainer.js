import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
// semantic ui components //
import {
  Button,
  Col,
  Container,
  Carousel,
  Modal,
  Row
} from "react-bootstrap";
// additional components //
import NavbarComponent from "../navbar/NavbarComponent";
import RoomImgModal from "./RoomImgModal";
// redux imports //
import { connect } from "react-redux";
import { fetchRooms } from "../../../redux/actions/roomActions";
import Room from "./Room";
// images //
//
// styles //
import { roomStyle as style } from "./style/styles";
import styles from "./style/roomIndexContainer.module.css";

const {
  background, carouselStyle,
  containerStyle, headerStyle,
  roomTitle, roomsDescription,
  roomOptions
} = style

const RoomsIndexContainer = (props) => {
  const { roomState , fetchRooms } = props;
  const { createdRooms } = roomState;

  const [imageIndex, setImageIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [clickedImg, setClickedImg] = useState("");
  const [imagePaths, setImagePaths] = useState([]);
  const [ headerFixed, setHeaderFixed ] = useState(false);

  const indexRowRef = useRef();

  useEffect(() => {
    if (indexRowRef.current) {
      const mainNav = document.getElementById("mainNav");
      if (mainNav) {
        const navHeight = mainNav.getBoundingClientRect().height;
        window.onscroll = () => {
          const indexRowRefY = indexRowRef.current.getBoundingClientRect().y;
          if (indexRowRefY <= navHeight) {
            if (!headerFixed) {
              setHeaderFixed(true);
            }
          }
  
        }
      }
     
    }
    return () => {
      window.onscroll = null;
    }
  }, [ indexRowRef.current, headerFixed ]);

  useEffect(() => {
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
    fetchRooms();
  }, []);
  // picture modal togglers //
  const openPictureModal = (imgPath, roomImagePaths = [], index) => {
    //setImgSource(imgPath);
    setClickedImg(imgPath);
    setImagePaths([...roomImagePaths]);
    setImageIndex(index);
    setShowModal(true);
  };
  const closePictureModal = () => {
    setShowModal(false);
  };
  // 
  const bookButton = () => {

  };

  const indexRowScroll = () =>{
    console.log("scroll detected")
  }
 
  return (
    <div style={background} onScroll={ indexRowScroll }>
      <NavbarComponent/>
      <div className={ styles.parallax }></div>
      <Row className={ `${styles.roomsIndexHeaderRow} ${ headerFixed ? styles.headerFixed : ""}`} ref={ indexRowRef } >
        <div>Our Rooms</div>
      </Row>
      <RoomImgModal 
        show={showModal} 
        closePictureModal={closePictureModal}
        paths={imagePaths} 
        imageIndex={imageIndex}
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
              />
            );
          })
        } 
      </Container>
    </div>
  );
};
// PropTypes validation //
RoomsIndexContainer.propTypes = {
  roomState: PropTypes.object.isRequired
};

// redux mapping functions //
const mapStateToProps = (state) => {
  return {
    roomState: state.roomState
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchRooms: () => fetchRooms(dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomsIndexContainer);