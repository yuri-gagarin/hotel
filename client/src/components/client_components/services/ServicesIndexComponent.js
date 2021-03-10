import React, { useState, useCallback, useEffect, useRef } from "react";
// additonal components //
import NavbarComponent from "../navbar/NavbarComponent";
import ClipText from "../../admin/shared/ClipText";
import ServiceClientView from "./ServiceClientView";
// react bootstrap component imports //
import {
  Container, Row, Col
} from "react-bootstrap";
import styles from "./css/servicesIndexContainer.module.css";
// redux //
import { connect } from "react-redux";
import { fetchServices } from "../../../redux/actions/serviceActions";
// helpers //
import { navbarCollapseListener } from "../../helpers/componentHelpers";


const ServicesIndexComponent = ({ fetchServices, serviceState }) => {
  const [ headerFixed, setHeaderFixed ] = useState(false);

  const indexRowRef = useRef(null);

  useEffect(() => {
    if (indexRowRef.current) {
      const mainNav = document.getElementById("mainNav");
      if (mainNav) {
        const navHeight = mainNav.getBoundingClientRect().height;
        window.onscroll = () => {
          const indexRowRefY = indexRowRef.current.getBoundingClientRect().y;
          if (indexRowRefY <= navHeight) {
            if (!headerFixed) {
              console.log(91)
              setHeaderFixed(true);
            }
          }
  
        }
      }
     
    }
    return () => {
      window.onscroll = null;
    }
  }, [ indexRowRef.current, headerFixed ]);

  useEffect(() => {
    navbarCollapseListener();
    fetchServices()
  }, []);



  return (
    <div className={ styles.mainContainer }>
      <NavbarComponent />
      <Row>
        <div className={ styles.servicesHeader } >
          <div className={ `${styles.headerText} ${ headerFixed ? styles.fixed : ""}`} ref={ indexRowRef }>
            <ClipText text={"Services"} className={ `${styles.svgElem} ${ headerFixed ? styles.animateSVGElem : ""}` } />
          </div>
        </div>
      </Row>

      { serviceState.createdServices.map(( service ) => {
          return (
            <ServiceClientView key={ service._id } service={ service }  />
          )
        }) 
      }
      
      <div className={ styles.servicesBreakpoint }>
      </div>
    </div>
  )
};  

// redux mapping functions //
const mapStateToProps = (state) => {
  return {
    serviceState: state.serviceState
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchServices: () => fetchServices(dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ServicesIndexComponent);