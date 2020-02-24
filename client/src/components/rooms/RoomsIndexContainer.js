import React, { useState, useEffect } from "react";
import {
  Button,
  Col,
  Container,
  Carousel,
  Row
} from "react-bootstrap";
import NavbarComponent from "../navbar/NavbarComponent"
const style = {
  background: {
    //backgroundColor: "#2c3531"
  },
  containerStyle: {
    marginTop: "90px",
  },
  carouselStyle: {
    border: "4px solid #2c3531",
    borderRadius: "5px"
  },
  headerStyle: {
    marginTop: "2em",
    marginBottom: "0.5em",
    textAlign: "center",
    fontSize: "3.5em",
    fontFamily: "Playfair Display",
    fontWeight: "bold",
    //fontStyle: "italic"
  },
  roomTitle: {
    marginTop: "1em",
    marginBottom: "0.5em",
    textAlign: "center",
    fontSize: "2em",
    fontFamily: "Lobster",
    fontWeight:  "bold"
  },
  roomsDescription: {
    marginTop: "0.5em",
    marginBottom: "1em",
    padding: "1em",
    border: "1px solid #2c3531",
    borderRadius: "5px",
    fontSize: "15px",
    fontFamily: "Montserrat"
  },
  roomOptions: {
    margin: "0.5em",
    padding: "0.5em",
    border: "1px solid #2c3531",
  } 
}
const {
  background, carouselStyle,
  containerStyle, headerStyle,
  roomTitle, roomsDescription,
  roomOptions
} = style

const RoomsIndexContainer = (props) => {
  const { rooms } = props;
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(null);
  useEffect(() => {
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
  }, [])
  const bookButton = () => {

  };
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
    setDirection(e.direction);
  };

  return (
    <div style={background}>
      <NavbarComponent/>
      <Container style={containerStyle}>
        <Row>
          <Col style={headerStyle}>Our Rooms</Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <div style={roomTitle}>Standard Double Room</div>
            <Carousel activeIndex={index} direction={direction} onSelect={handleSelect} style={carouselStyle}>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="/assets/images/standard/premierStandard1.jpg"
                  alt="First slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="/assets/images/standard/premierStandard2.jpg"
                  alt="Second slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="/assets/images/standard/premierStandard3.jpg"
                  alt="Third slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="/assets/images/standard/premierStandard4.jpg"
                  alt="Third slide"
                />
              </Carousel.Item>
            </Carousel>
            <div style={roomsDescription}>
              <p>All the Room description here, All the Room description here,All the Room description here,All the Room description here,All the Room description here,All the Room description here,All the Room description here,All the Room description here,All the Room description here,</p>
              <span style={roomOptions}><i className="fas fa-chart-area"></i> 20 m<sup>2</sup></span>
              <span style={roomOptions}><i className="fas fa-mountain"></i> Inner Courtyard View</span>
              <span style={roomOptions}><i className="fas fa-umbrella-beach"></i> Patio</span>
              <span style={roomOptions}><i className="fas fa-bath"></i>  Private Bathroom</span>
              <span style={roomOptions}><i className="fas fa-wifi"></i> Free Wifi</span>


            </div>
            <Button onClick={bookButton}>Book Now</Button>
          </Col>
        </Row>  
        <hr />
        <Row>
          <Col>
            <div style={roomTitle}>Superior Double Room</div>
            <Carousel activeIndex={index} direction={direction} onSelect={handleSelect} style={carouselStyle}>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="/assets/images/superior/premierSuperior1.jpg"
                  alt="First slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="/assets/images/superior/premierSuperior2.jpg"
                  alt="Second slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="/assets/images/superior/premierSuperior3.jpg"
                  alt="Third slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="/assets/images/superior/premierSuperior4.jpg"
                  alt="Third slide"
                />
              </Carousel.Item>
            </Carousel>
            <div style={roomsDescription}>
              <p>All the Room description here, All the Room description here,All the Room description here,All the Room description here,All the Room description here,All the Room description here,All the Room description here,All the Room description here,All the Room description here,</p>
              <span style={roomOptions}><i className="fas fa-chart-area"></i> 25 m<sup>2</sup></span>
              <span style={roomOptions}><i className="fas fa-mountain"></i> Mountain View</span>
              <span style={roomOptions}><i className="fas fa-water"></i> River View</span>
              <span style={roomOptions}><i className="fas fa-umbrella-beach"></i> Patio</span>
              <span style={roomOptions}><i className="fas fa-bath"></i>  Private Bathroom</span>
              <span style={roomOptions}><i className="fas fa-wifi"></i> Free Wifi</span>


            </div>
            <Button onClick={bookButton}>Book Now</Button>
          </Col>
        </Row>  
        <hr />        
      </Container>
    </div>
  );
};

export default RoomsIndexContainer;