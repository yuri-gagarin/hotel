import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
// bootstrap react //
import { Row, Col } from "react-bootstrap";
// additional components //
import NavbarComponent from "../navbar/NavbarComponent";
import DiningComponent from "./DiningComponent";
import ClipText from "../../admin/shared/ClipText";
// redux //
import { connect } from "react-redux";
// styles and css //
import styles from "./css/diningIndex.module.css";
// helpers //
import { navbarCollapseListener } from "../../helpers/componentHelpers";

const DiningIndexContainer = (props) => {
  const headerRowRef = useRef(null);
  const [ headerRowState, setHeaderRowState ] = useState({ headerFixed: false, top: "" });

  useEffect(() => {
    navbarCollapseListener();
  }, []);

  useEffect(() => {
    if (headerRowRef.current) {
      /*
      const mainNav = document.getElementById("mainNav");
      if (mainNav) {
        window.onscroll = () => {
          const headerRowRefY = headerRowRef.current.getBoundingClientRect().y;
          if (mainNav.classList.contains("navbar-shrink")) {
            const navHeight = mainNav.getBoundingClientRect().height;
            if (headerRowRefY <= navHeight) {
              if (!headerRowState.headerFixed) {
                setHeaderRowState({ headerFixed: true, top: navHeight });
              }
            }
          }
        }
      }
      */
      window.onscroll = () => {
        const headerRowRefY = headerRowRef.current.getBoundingClientRect().y;
        if (headerRowRefY <= 50) {
          if (!headerRowState.headerFixed) {
            setHeaderRowState({ headerFixed: true, top: 50 });
          }
        }
      }
    }
    return () => {
      window.onscroll = null;
    }
  }, [ headerRowRef.current ]);

  return (
    <div className={ styles.diningIndexContainer }>
      <NavbarComponent />
      <div className={ `${styles.parallaxGroup} ${styles.parallaxContainer}` }>
        <div className={ `${styles.headerRow} ${headerRowState.headerFixed ? styles.headerFixed : ""}` } style={ headerRowState.headerFixed ? { top: headerRowState.top } : {}} ref={ headerRowRef }>
          <div className={ styles.svgContainer }>
            <ClipText className={ styles.firstSvg } text="Dining" textId="dining" fontSize={"3em"} />
            <ClipText className={ styles.secondSvg } text="and" textId="and" fontSize={"1.5em"}/>
            <ClipText className={ styles.thirdSvg } text="Entertainment" textId="entainmnt" fontSize={"2em"} letterSpacing={"5px"} />
          </div>
          
        </div>
        
      </div>
      <DiningComponent />
      <div className={ styles.parallaxSpacer }></div>
      <DiningComponent />
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

