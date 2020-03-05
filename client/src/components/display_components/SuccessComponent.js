import React, { useRef, useEffect } from "react";
import {
  Button,
  Card
} from "semantic-ui-react";

const SuccessComponent = (props) => {
  const { appGeneralState, clearSuccessState } = props;
  const { status, responseMsg = "All Ok", successComponentOpen } = appGeneralState;
  const handleClose = () => {
    clearSuccessState();
  };

  return ( 
    successComponentOpen ?
    <div id="successComponent" >
      <Card style={{ border: "1px solid rgb(66, 132, 245)"}}>
        <Card.Content textAlign="center">
          <Card.Description style={{fontWeight: "bold", color: "rgb(66, 132, 245)"}}>
            {responseMsg}
          </Card.Description>
        </Card.Content>
        <Card.Content extra textAlign="center">
          <Button basic color="blue" onClick={handleClose}>
            Ok
          </Button>
        </Card.Content>
      </Card>
    </div>
    :
    <div></div>
  );
};

export default SuccessComponent;
