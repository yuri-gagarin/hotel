// @flow 
import * as React from "react";
import { useTranslation } from "react-i18next";
// bootstrap components //
import { Row, Carousel, Container, Col, Image } from "react-bootstrap";
// additional components //
// styles and css //
import styles from "./css/cafeComponent.module.css";
// types //
import type { DiningEntModelData } from "../../../../redux/reducers/dining_entertainment/flowTypes";
// helpers //
import { setComponentValues } from "../hepers/defaultValues";
import { setStringTranslation } from "../../../helpers/displayHelpers";

type Props = {
  diningOption: DiningEntModelData
}
export const CafeComponent = ({ diningOption } : Props): React.Node => {
  const { title, hours, description } = diningOption;
  //
  const [ t, i18n ] = useTranslation();
 
  return (
    <Container fluid>
      <div className={ styles.rowBorder }></div>
      <Row className={ styles.cafeComponentHeaderRow }>
       
        <Col md={6} sm={12} className={ styles.leftCol }>
          <div className={ styles.cafeTitle }>
            <div className={ styles.cafeTitleHeader }>Cafe:</div>
            <div className={ styles.cafeTitleInner }>
              { title  ? title : "Title Here" }
            </div>
          </div>
        </Col>
        <Col md={6} sm={12} className={ styles.rightCol }>
        </Col>
        <div className={ styles.cafeCompomentContactDiv }>
          <div>
            <i className="fas fa-utensils"></i>
          </div>
          <div>
            <i className="fas fa-phone"></i>
          </div>
          <div>
            <i className="far fa-envelope"></i>  
          </div>
          <div>
            <i className="fab fa-instagram"></i>
          </div>
          <div>
            <i className="fab fa-facebook"></i>
          </div>
        </div>
      </Row>
      <Row className={ styles.cafeCompomentDetailsRow }>
        <Col lg={12} className={ styles.cageComponentDetailsCol } >
          <div className={ styles.cafeHoursDiv }>
            <i className="far fa-clock"></i>
            <span>Open hours:</span>
            <span>{ "08:00 - 22:00" }</span>
          </div>
          <div className={ styles.cafeDescDiv }>
            <p>{ description ? setStringTranslation(description, i18n) : "No description provided. A acfe description will go here..." }</p>
          </div>
        </Col>
      </Row>
      <div className={ styles.rowBorder }></div>
    </Container>
  );
};
