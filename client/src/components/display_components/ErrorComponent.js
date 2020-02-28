import React, { useRef, useEffect } from "react";
import {
  Button,
  Card
} from "semantic-ui-react";

const ErrorComponent = (props) => {
  let shouldOpen = true;
  const componentRef = useRef(null);

  useEffect(() => {
    //setTimeout(() => {
    // componentRef.current.style.display = "none";
    //}, 3000);
  }, []);

  const handleClose = () => {
    componentRef.current.style.display = "none";
  };

  return ( 
    shouldOpen ?
    <div ref={componentRef} id="errorComponent" >
      <Card style={{border: "2px solid red"}}>
        <Card.Content textAlign="center">
          <Card.Description style={{fontWeight: "bold", color: "red"}}>
            An Error Occured
          </Card.Description>
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

export default ErrorComponent;