import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Form
} from "react-bootstrap";

// styles and images //
import { messageForm } from "./style/styles";

const MessageInitView = (props) => {
  //const { handleFormHide } = props;
  const { sendInitialMessage } = props;
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleInitSubmit = (e) => {
    //console.info(name);
    //console.info(message);
    sendInitialMessage({
      name: name,
      message: message
    });
    // send message to api and switch form to messageView //

  }
  return (
    <Form>
      <Form.Group controlId="formName">
        <Form.Control 
          type="input" 
          placeholder="your name please" 
          onChange={handleNameChange}
        />
      </Form.Group>
      <Form.Group controlId="formEmail">
        <Form.Control type="input" placeholder="email ... optional" />
      </Form.Group>
      <Form.Group controlId="formMessageInput">
        <Form.Control 
          type="input" 
          placeholder="message..." 
          onChange={handleMessageChange}
        />
      </Form.Group>
      <Form.Group controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" onClick={handleInitSubmit}>
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