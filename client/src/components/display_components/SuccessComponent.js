import React, { useRef, useEffect } from "react";
import {
  Button,
  Card
} from "semantic-ui-react";

const SuccessComponent = (props) => {
  const { appGeneralState, clearSuccessState } = props;
  const { status, responseMsg = "Ok", successComponentOpen } = appGeneralState;
  const handleClose = () => {
    clearSuccessState();
  };

  return ( 
    successComponentOpen ?
    <div id="successComponent" >
      <Card>
        <Card.Content textAlign="center">
          <Card.Description style={{fontWeight: "bold", color: "blue"}}>
            {responseMsg}
          </Card.Description>
        </Card.Content>
        <Card.Content extra textAlign="center">
          <Button basic color='green' onClick={handleClose}>
            Dismisss
          </Button>
        </Card.Content>
      </Card>
    </div>
    :
    <div></div>
  );
};

export default SuccessComponent;
