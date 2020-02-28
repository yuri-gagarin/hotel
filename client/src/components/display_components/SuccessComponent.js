import React, { useRef, useEffect } from "react";
import {
  Button,
  Card
} from "semantic-ui-react";

const SuccessComponent = (props) => {
  let shouldOpen = false;
  const componentRef = useRef(null);

  useEffect(() => {
    //setTimeout(() => {
    //  componentRef.current.style.display = "none";
    //}, 3000);
  }, []);

  const handleClose = () => {
    componentRef.current.style.display = "none";
  };

  return ( 
    shouldOpen ?
    <div ref={componentRef} id="successComponent" >
      <Card>
        <Card.Content textAlign="center">
          <Card.Description style={{fontWeight: "bold", color: "blue"}}>
            All Ok
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
