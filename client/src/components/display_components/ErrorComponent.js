import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Card
} from "semantic-ui-react";

const ErrorComponent = (props) => {
  const { appGeneralState, clearAppError } = props;
  const { status, responseMsg, error, errorMessages } = appGeneralState;
  const componentRef = useRef(null);

  const handleClose = () => {
    clearAppError();
  };

  return ( 
    error ?
    <div ref={componentRef} id="errorComponent" >
      <Card style={{border: "2px solid red"}}>
        <Card.Content textAlign="center">
          <Card.Description style={{fontWeight: "bold", color: "red"}}>
            {responseMsg}
          </Card.Description>
        </Card.Content>
        <Card.Content>
          <ul style={{ color: "orange", fontWeight: "bold" }}>  
          { 
            errorMessages.map((errorMessage, index) => <li key={index}>{errorMessage}</li>)
          }
          </ul>
        </Card.Content>
        <Card.Content extra textAlign="center">
          <Button basic color='red' onClick={handleClose}>
            Dismiss
          </Button>
        </Card.Content>
      </Card>
    </div>
    :
    <div></div>
  );
};
// PropTypes validations //
ErrorComponent.propTypes = {
  appGeneralState:  PropTypes.object.isRequired,
  clearAppError: PropTypes.func.isRequired
};

export default ErrorComponent;