import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Form,
  InputGroup
} from "react-bootstrap";

import { messageForm } from "./style/styles";

const MessageView = (props) => {
  const [ message, setMessage ] = useState("");

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };
  const handleMessageSend = (e) => {
    console.log(e.charCode)
  };
  const handleKeyPress = (e) => {
    if (e.charCode === 13) {
      console.log("enter pressed")
      console.log(message);
    }
  };
  return (
    <InputGroup>
      <Form.Control
        placeholder="message..."
        aria-label="Recipient's username"
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <InputGroup.Append>
        <Button 
          variant="outline-secondary"
          onClick={handleMessageSend}
        >
          Send
        </Button>
      </InputGroup.Append>
    </InputGroup>
  );
};
// PropTypes validation //
MessageView.propTypes = {
  //handleFormHide: PropTypes.func.isRequired
};

export default MessageView;