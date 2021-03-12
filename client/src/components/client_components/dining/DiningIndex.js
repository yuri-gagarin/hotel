import React from "react";
import PropTypes from "prop-types";
// bootstrap react //
import { Row, Col } from "react-bootstrap";
// additional components //
import NavbarComponent from "../navbar/NavbarComponent";
import ClipText from "../../admin/shared/ClipText";
// redux //
import { connect } from "react-redux";
// styles and css //
import styles from "./css/diningIndex.module.css";

const DiningIndexContainer = (props) => {

  return (
    <div className={ styles.diningIndexContainer }>
      <NavbarComponent />
      <div className={ `${styles.parallaxGroup} ${styles.parallaxContainer}` }>
        <div className={ styles.headerRow }>
          <ClipText className={ styles.firstSvg } text="Dining" textId="dining" fontSize={"3em"} />
          <ClipText className={ styles.secondSvg } text="and" textId="and" fontSize={"4em"}/>
          <ClipText className={ styles.thirdSvg } text="Entertainment" textId="entainmnt" fontSize={"2em"} letterSpacing={"5px"} />
        </div>
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

