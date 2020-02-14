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
import ObjectID from "bson-objectid";

const MessageInitView = (props) => {
  //const { handleFormHide } = props;
  const { sendInitialMessage } = props;
  const [validated, setValidated] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };
  /*
  useEffect(() => {
    if (name && message) {
      console.log("form validated");
      console.log("Should do an API call");
    }
  }, [name, message]);
  */
  const handleInitSubmit = (e) => {
    if (e.currentTarget.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    setValidated(true)
    const messageData = {
      user: {
        _id: ObjectID.generate(Date.now),
        firstName: name,
        email: email,
      },
      content: message
    };
    console.log(messageData);

    //sendInitialMessage({})
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
        <Form.Control type="input" placeholder="email ... optional" />
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