import React, { useState, useEffect } from "react";
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
// styles //
import { roomStyle as style } from "./style/styles";

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
 
  return (
    <div style={background}>
      <NavbarComponent/>
      <RoomImgModal 
        show={showModal} 
        closePictureModal={closePictureModal}
        paths={imagePaths} 
        imageIndex={imageIndex}
      />
      <Container style={containerStyle}>
        <Row>
          <Col style={headerStyle}>Our Rooms</Col>
        </Row>
        <hr />
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