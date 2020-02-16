import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Form,
  InputGroup
} from "react-bootstrap";

import { messageForm } from "./style/styles";

const MessageView = (props) => {
  const { sendMessage } = props;
  const [ message, setMessage ] = useState("");

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };
  const handleMessageSend = (e) => {
    sendMessage(message);
    e.target.value = "";
    setMessage("");
  };
  const handleKeyPress = (e) => {
    if (e.charCode === 13) {
      sendMessage(message);
      e.target.value = "";
      setMessage("");
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
  sendMessage: PropTypes.func.isRequired
};

export default MessageView;