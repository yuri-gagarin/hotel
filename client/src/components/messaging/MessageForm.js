import React, {useRef, useState} from "react";
import { 
  Form,
  Button
} from "react-bootstrap";

import { messageForm } from "./style/styles";

const MessageForm = (props) => {
  const messageFormRef = useRef(null);
  const userIsMessaging = useState(false);
  const formOpen = useState(false);

  const handleFormHide = (e) => {
    //console.log(e.target);
    console.log(messageFormRef.current.style.display = "none")
  }
  return (
    <div style={messageFormContainer} ref={messageFormRef}>
      <div>Messaging here</div>
      <div style={styles.closeMessageForm} onClick={handleFormHide}>
        <span>X</span>
      </div>
      <div style={styles.messagingDisplay}>
        <ul>
          <li>Messages here</li>
        </ul>
      </div>
      <Form>
        <Form.Group controlId="formName">
          <Form.Control type="input" placeholder="your name please" />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Control type="input" placeholder="email ... optional" />
        </Form.Group>
        <Form.Group controlId="formMessageInput">
          <Form.Control type="input" placeholder="message..." />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary">
          Send
        </Button>
      </Form>
    </div>
  );
};

export default MessageForm;