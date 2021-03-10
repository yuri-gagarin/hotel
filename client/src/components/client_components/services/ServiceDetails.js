import React from "react";
import PropTypes from "prop-types";
//
import { Button } from "react-bootstrap";
// styles ..
import styles from "./css/serviceDetails.module.css";

const ServiceDetails = ({ service }) => {

  const handleServiceInfoClick = () => {
    console.log("clicked");
  };

  return (
    <div className={ styles.serviceDetailsContainer }>
      <div className={ styles.serviceHours }>
        <div className={ styles.iconDiv }>
          <i className="far fa-clock"></i>
        </div>
        <span>{ service.hours} </span>
      </div>
      <div className={ styles.servicePrice }>
        <div className={ styles.iconDiv }>
          <i className="far fa-money-bill-alt"></i>        
        </div>
        <span>{ service.price }</span>
      </div> 
      <div className={ styles.serviceDescription }> 
        <p>{ service.description }</p>
      </div>
     
    </div>
  );
};

ServiceDetails.propTypes = {
  service: PropTypes.object.isRequired
};

export default ServiceDetails;