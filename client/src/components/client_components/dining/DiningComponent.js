import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
// bootstrap components //
import { Row, Col, Image } from "react-bootstrap";
//
import styles from "./css/diningComponent.module.css";
// helpers //
import { setImagePath } from "../../helpers/displayHelpers";

const DiningComponent = ({ diningOption }) => {
  const [ imgPaths, setImagePaths ] = useState([]);

  useEffect(() => {
    const imgPaths = [];

    if (diningOption && diningOption.images && Array.isArray(diningOption.images)) {
      const { images } = diningOption;

      for (const imgData of images) {
        imgPaths.push(setImagePath(imgData.path))
      }

    } else {
      imgPaths.push("/assets/images/dining/restaurant_stock3.jpeg");
      imgPaths.push("/assets/images/dining/restaurant_stock4.jpeg");
      imgPaths.push("/assets/images/dining/restaurant_stock5.jpeg");
    }
    setImagePaths(imgPaths)

  }, []);

  useEffect(() => {
    console.log(imgPaths)
  }, [ imgPaths ])

  return (
    <Row className={ styles.diningComponentRow }>
      <Col lg={6} md={12} className={ styles.diningComponentPictureCol } style={{ border: "5px solid red" }}>
        <Image src={imgPaths[0]} className={ `${styles.diningFirstImg} ${styles.diningImage}` } rounded></Image>
        <Image src={imgPaths[1]} className={ `${styles.diningSecondImg} ${styles.diningImage}` } rounded></Image>
        <Image src={imgPaths[2]} className={ `${styles.diningThirdImg} ${styles.diningImage}` } rounded></Image>
      </Col>
      <Col lg={6} md={12} className={ styles.diningComponentDescCol }  style={{ border: "5px solid red" }}>
      </Col>
    </Row>
  )
};

DiningComponent.propTypes = {
  diningOption: PropTypes.object
};

export default DiningComponent;