import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
// bootstrap components //
import { Row, Col, Image } from "react-bootstrap";
//
import styles from "./css/restaurantComponent.module.css";
// helpers //
import { setComponentValues } from "../hepers/defaultValues";

const DiningComponent = ({ diningOption }) => {
  const [ diningCompLocalState, setDiningCompLocalState ] = useState({ title: "", description: "", hours: "", imagePaths: [] });
  //
  const { title, description, hours, imagePaths } = diningCompLocalState;
  useEffect(() => {
    const { title, description, hours, imagePaths } = setComponentValues(diningOption);
    setDiningCompLocalState({ ...diningCompLocalState, title, description, hours, imagePaths });
  }, []);

  return (
    <React.Fragment>
      <Row className={ styles.diningCompTitleRow}>
        <div className={ styles.diningTitleDiv}>
          <p className={ styles.diningTitleContent}>{ title }</p>
        </div>
        <div className={ styles.rowBorder }></div>
      </Row>
      <Row className={ styles.diningComponentRow }>
        <Col lg={7} md={12} className={ styles.diningComponentPictureCol } >
          <Image src={imagePaths[0]} className={ `${styles.diningFirstImg} ${styles.diningImage}` } rounded></Image>
          <Image src={imagePaths[2]} className={ `${styles.diningThirdImg} ${styles.diningImage} ${styles.lastImage}` } rounded></Image>
          <Image src={imagePaths[1]} className={ `${styles.diningSecondImg} ${styles.diningImage}` } rounded></Image>
        </Col>
        <Col lg={5} md={12} className={ styles.diningComponentDescCol }>
          <div className={ styles.diningDescWrapper }>
            <div className={ styles.diningDescWrapperLeft }>
              <div className={ styles.diningDescriptionDiv }>
                <p>{ description }</p>
              </div>
              <div className={ styles.diningHoursDiv}>
                <i className="far fa-clock"></i>
                <span>Open hours:</span>
                <span>{ hours }</span>
              </div>
            </div>
            <div className={ styles.diningDescWrapperRight }>
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
          </div>
         
        </Col>
      </Row>
    </React.Fragment>
  )
};

DiningComponent.propTypes = {
  diningOption: PropTypes.object
};

export default DiningComponent;