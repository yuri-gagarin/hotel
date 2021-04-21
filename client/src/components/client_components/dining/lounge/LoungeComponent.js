// @flow 
import * as React from "react";
import PropTypes from "prop-types";
// bootstrap components //
import { Row, Carousel, Container, Col, Image } from "react-bootstrap";
// additional components //
// styles and css //
import styles from "./css/loungeComponent.module.css";
// types //
import type { DiningEntModelData } from "../../../../redux/reducers/dining_entertainment/flowTypes";
// helpers //
import { setComponentValues } from "../hepers/defaultValues";

type Props = {
  diningOption: DiningEntModelData
}
export const LoungeComponent = ({ diningOption } : Props): React.Node => {
  const { title, hours } = diningOption;
  //
  React.useEffect(() => {
    const { title, description, hours, imagePaths } = setComponentValues(diningOption);
  }, []);

  return (
    <Container fluid>
      <div className={ styles.rowBorder }></div>
      <Row className={ styles.loungeComponentHeaderRow }>
        <Carousel fade className={ styles.loungeComponentImgCarousel }>
          <Carousel.Item className={ styles.loungeComponentImgCarouselItem }>
            <img className={ styles.loungeComponentCarouselImage } src="/assets/images/dining/restaurant_stock3.jpeg"></img>
          </Carousel.Item>
          <Carousel.Item className={ styles.loungeComponentImgCarouselItem }>
            <img className={ styles.loungeComponentCarouselImage } src="/assets/images/dining/restaurant_stock4.jpeg"></img>
          </Carousel.Item>
          <Carousel.Item className={ styles.loungeComponentImgCarouselItem }>
            <img className={ styles.loungeComponentCarouselImage } src="/assets/images/dining/restaurant_stock5.jpeg"></img>
          </Carousel.Item>
        </Carousel>
        <div className={ styles.loungeTitle }>
          <div className={ styles.loungeTitleInner }>{ title  ? title : "Title here ..." }</div>
        </div>
      </Row>
      <Row className={ styles.loungeComponentDetailsRow }>
        <Col lg={3} md={12}>
          <div className={ styles.diningDescriptionDiv }>
            <p>{ "A description here A description here A description here A description here A description here A description here A description here" }</p>
          </div>
        </Col>
        <Col lg={6} md={12}>
          <div className={ styles.loungeCompomentContactDiv }>
            <span>
              <i className="fas fa-utensils"></i>
              <span>Menu</span>
            </span>
            <span>
              <i className="fas fa-phone"></i>
              <span>Call</span>
            </span>
            <span>
              <i className="far fa-envelope"></i>  
              <span>Email</span>            
            </span>
            <span>
              <i className="fab fa-instagram"></i>
              <span>Insta</span>            
            </span>
            <span>
              <i className="fab fa-facebook"></i>
              <span>Social</span>
            </span>
          </div>
        </Col>
        <Col lg={3} md={12}>
          <div className={ styles.loungeHoursDiv }>
            <i className="far fa-clock"></i>
            <span>Open hours:</span>
            <span>{ "08:00 - 22:00" }</span>
          </div>
        </Col>
      </Row>
      <div className={ styles.rowBorder }></div>
    </Container>
  );
};
