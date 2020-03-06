import React from "react";
// react bootstrap component imports //
import {
  Container, Col, Image, Row
} from "react-bootstrap";

const columnStyle = {
  width: "100%",
  height: "200px",
  border: "1px solid grey",
  backgroundColor: "blue",
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden"
}
const imgStyle = {
  flexShrink: "0",
  minHeight: "100%",
  minWidth: "100%",
  //display: "block"
}

const ServicesIndexComponent = (props) => {
  return (
    <Container>
      <Row>
        <Col xs={12} md={12} lg={12} style={{ textAlign: "center" }}>
          <h3>Services</h3>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={12} lg={12}>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={6} lg={6} style={{ padding: 0 }}>
          <div style={columnStyle}>
            <Image src={"/assets/images/roomStock1.jpeg"} style={imgStyle}></Image>
          </div>
        </Col>
        <Col xs={12} md={6} lg={2} style={{ padding: 0 }}>
          <div style={columnStyle}>
            <Image src={"/assets/images/roomStock1.jpeg"} style={imgStyle}></Image>
          </div>
          <div style={columnStyle}>
            <Image src={"/assets/images/roomStock1.jpeg"} style={imgStyle}></Image>
          </div>
        </Col>
        <Col xs={12} md={6} lg={2} style={{ padding: 0 }}>
          <div style={columnStyle}>
            <Image src={"/assets/images/roomStock1.jpeg"} style={imgStyle}></Image>
          </div>
          <div style={columnStyle}>
            <Image src={"/assets/images/roomStock1.jpeg"} style={imgStyle}></Image>
          </div>
        </Col>
        <Col xs={12} md={6} lg={2} style={{ padding: 0 }}>
          <div style={columnStyle}>
            <Image src={"/assets/images/roomStock1.jpeg"} style={imgStyle}></Image>
          </div>
          <div style={columnStyle}>
            <Image src={"/assets/images/roomStock1.jpeg"} style={imgStyle}></Image>
          </div>
        </Col>
      </Row>
    </Container>
  )
};  

export default ServicesIndexComponent;