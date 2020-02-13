import React, {useRef, useState} from "react";
import { 
  Form,
  Button
} from "react-bootstrap";

import MessageForm from "./MessageForm";
import OpenMessageForm from "./OpenMessageForm";

import { messageFormContainer } from "./style/styles";

const MessageFormContainer = (props) => {
 
  const [formOpen, setFormOpen] = useState(false);

  const handleFormHide = (e) => {
    //console.log(e.target);
    console.log(messageFormRef.current.style.display = "none")
  }
  if (!formOpen) {
    return (
      <OpenMessageForm />
    );
  } else {
    return (
      <MessageForm />
    );
  }
};

export default MessageFormContainer;