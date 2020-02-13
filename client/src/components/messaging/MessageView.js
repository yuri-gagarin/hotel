import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Form,
  InputGroup
} from "react-bootstrap";

import { messageForm } from "./style/styles";

const MessageView = (props) => {
  const { handleFormHide } = props;

  return (
    <InputGroup>
      <Form.Control
        placeholder="message..."
        aria-label="Recipient's username"
      />
      <InputGroup.Append>
        <Button variant="outline-secondary">Send</Button>
      </InputGroup.Append>
    </InputGroup>
  );
};
// PropTypes validation //
MessageView.propTypes = {
  handleFormHide: PropTypes.func.isRequired
};

export default MessageView;