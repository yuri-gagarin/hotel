import React from "react";
import PropTypes from "prop-types";
// bootstrap react //
import { Row, Col } from "react-bootstrap";
// additional components //
import NavbarComponent from "../navbar/NavbarComponent";
// redux //
import { connect } from "react-redux";
// styles and css //
import styles from "./css/diningIndex.module.css";

const DiningIndexContainer = (props) => {

  return (
    <div className={ styles.diningIndexContainer }>
      <NavbarComponent />
      <div className={ styles.parallaxBackground }>

      </div>
      <Row>
        <div className={ styles.headerRow }>

        </div>
      </Row>
      <Row className={ styles.contentRow}>
        <Col lg={6} xs={12} className={ styles.contentPics }></Col>
        <Col lg={6} xs={12} className={ styles.contentDescription }></Col>
      </Row>
    </div>
  );
};

DiningIndexContainer.propTypes = {

};

const mapStateToProps = (state) => {
  return {

  };
};
const mapDispatchToProps = (dispatch) => {
  return {

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DiningIndexContainer);

