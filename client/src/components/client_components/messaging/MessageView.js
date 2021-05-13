/*
import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Input
} from "semantic-ui-react";

import { messageForm } from "./style/styles";

const MessageView = (props) => {
  const { sendMessage } = props;
  const [ message, setMessage ] = useState("");

  const handleInputChange = (e) => {
    if (e.charCode === 13) {
      sendMessage(message);
      e.target.value = "";
      setMessage("");
    }
    setMessage(e.target.value);
  };
  const handleMessageSend = (e) => {
    sendMessage(message);
    e.target.value = "";
    setMessage("");
  };
  
  return (
    <Input type="text" placeholder="message..." action onChange={handleInputChange} style={{ border: "2px solid red", width: "100%"}}>
      <input />
      <Button onClick={handleMessageSend}>Send</Button>
    </Input>
  );
};
// PropTypes validation //
MessageView.propTypes = {
  sendMessage: PropTypes.func.isRequired
};

export default MessageView;
*/