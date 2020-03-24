import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Form
} from "react-bootstrap";

// styles and images //
import { messageForm } from "./style/styles";
// additional dependencies //
import { sendMessage } from "./helpers/messageHelpers";

const MessageInitView = (props) => {
  const [validated, setValidated] = useState(false);
  const [messageData, setMessageData] = useState({
    name: "",
    typingName: false,
    content: "",
    typingContent: false
  });
  const [nameInputError, setNameInputError] = useState(false);
  const [contentInputError, setContentInputError] = useState(false);
  // redux state //
  const { sendInitialMessage, clientState } = props;

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleNameError = () => {
    const { name, typingName } = messageData;
    if (typingName && (name.length === 0)) {
      setNameInputError({
        content: "Name required",
        pointing: "below"
      })
    } else {
      setNameInputError(false);
    }
  };
  const handleContentError = () => {
    const { content, typingContent } = messageData;
    if (typingContent && (content.length === 0)) {
      setContentInputError({
        content: "Type something here",
        pointing: "below"
      })
    } else {
      setNameInputError(false);
    }
  };
  const handleInitSubmit = (e) => {
    if (e.currentTarget.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    setValidated(true);

    const { _id, firstName } = clientState;
    const messageData = {
      user: {
        _id: _id,
        firstName: name || firstName,
        email: email || ""
      },
      content: message
    };
    sendInitialMessage(messageData)
  }
  
  return (
    <Form noValidate validated={validated} onSubmit={handleInitSubmit}>
      <Form.Group controlId="formName">
        <Form.Control 
          required
          type="input" 
          placeholder="your name ..." 
          onChange={handleNameChange}
        />
      </Form.Group>
      <Form.Group controlId="formEmail">
        <Form.Control 
          type="input" 
          placeholder="email ... optional" 
          onChange={handleEmailChange}
          />
      </Form.Group>
      <Form.Group controlId="formMessageInput">
        <Form.Control 
          required
          type="input" 
          placeholder="message ..." 
          onChange={handleMessageChange}
        />
      </Form.Group>
      <Form.Group controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Send
      </Button>
    </Form>
  );
};
// PropTypes validation //
MessageInitView.propTypes = {
  //handleFormHide: PropTypes.func.isRequired

};

export default MessageInitView;