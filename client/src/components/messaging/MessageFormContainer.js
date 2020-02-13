import React, { useState } from "react";
import { 
  Form,
  Button
} from "react-bootstrap";

import MessageForm from "./MessageForm";
import OpenMessageForm from "./OpenMessageForm";

import { messageFormContainer } from "./style/styles";

const MessageFormContainer = (props) => {
 
  const [formOpen, setFormOpen] = useState({open: false});
  const handleFormOpen = (e) => {
    // toggles between messaging form and back //
    setFormOpen((state) => {
      return {open: !state.open};
    });
  }
  // render conditionally //
  if (!formOpen.open) {
    return (
      <OpenMessageForm handleFormOpen={handleFormOpen} />
    );
  } else {
    return (
      <MessageForm handleFormOpen={handleFormOpen}/>
    );
  }
};

export default MessageFormContainer;