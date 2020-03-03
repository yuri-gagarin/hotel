import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
// ui bootstrap imports //
import {
  Button, Modal, Image, Carousel
} from "react-bootstrap";
// helper functions //
import { setUploadedImgPath, simplifyPath } from "./../helpers/displayHelpers";

const pictureModal = {
  width: "auto",
  height: "auto",
  left: "50%",
  transform: "translateX(-50%)",
};

const RoomImgModal = (props) => {
  const { show, closePictureModal, paths, clickedImg } = props;

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(null);
  
  // set the initial image to one clicked on //
  useEffect(() => {
    console.log(paths);
    console.log(simplifyPath(clickedImg));
  }, [show]);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
    setDirection(e.direction);
  };


  return (
    <React.Fragment>
      <Modal style={pictureModal} show={show} onHide={closePictureModal} centered >
        <Modal.Body style={{padding: 0}}>
          <Carousel activeIndex={index} direction={direction} onSelect={handleSelect}>
            {
              paths.map((path, index) => {
                return (
                  <Carousel.Item key={index}>
                    <img
                      src={setUploadedImgPath(path)}
                      alt="First slide"
                    />
                  </Carousel.Item>
                )
              })
            }
          </Carousel>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
}
// PropTypes validations //
RoomImgModal.propTypes = {
  show: PropTypes.bool.isRequired,
  closePictureModal: PropTypes.func.isRequired
};

export default RoomImgModal;