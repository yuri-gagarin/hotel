import React, { useState } from "react";
import {
  Col,
  Container,
  Carousel,
  Row
} from "react-bootstrap";
import NavbarComponent from "../navbar/NavbarComponent"
const style = {
  containerStyle: {
    marginTop: "100px"
  },
  headerStyle: {
    textAlign: "center"
  },
  roomTitle: {
    textAlign: "center"
  },
  roomsDescription: {
    fontSize: "25px",
    border: "2px solid red"
  }
}
const {
  containerStyle, headerStyle,
} = style

const RoomsIndexContainer = (props) => {
  const { rooms } = props;
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(null);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
    setDirection(e.direction);
  };

  return (
    <React.Fragment>
      <NavbarComponent style={{backgroundColor: "black" }} />
      <Container style={containerStyle}>
        <Row>
          <Col style={headerStyle}>Our Rooms</Col>
        </Row>
        <Row>
          <Col>
            <div style={roomTitle}>Type of Room</div>
            <Carousel activeIndex={index} direction={direction} onSelect={handleSelect}>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="/assets/images/roomStock1.jpeg"
                  alt="First slide"
                />
                <Carousel.Caption>
                  <h3>First slide label</h3>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="/assets/images/roomStock2.jpeg"
                  alt="Second slide"
                />

                <Carousel.Caption>
                  <h3>Second slide label</h3>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="/assets/images/roomStock3.jpeg"
                  alt="Third slide"
                />
                <Carousel.Caption>
                  <h3>Third slide label</h3>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
            <div style={roomsDescription}>All the Room description here</div>
          </Col>
        </Row>      
      </Container>
    </React.Fragment>
  );
};

export default RoomsIndexContainer;