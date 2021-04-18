import * as React from "react";
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
        <span>Hours:</span>
        <div className={ styles.iconDiv }>
          <i className="far fa-clock"></i>
        </div>
        <span>{ service.hours} </span>
      </div>
      <div className={ styles.servicePrice }>
        <span>Price:</span>
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

export default ServiceDetails;