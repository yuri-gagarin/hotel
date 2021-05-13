/*
import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Form
} from "semantic-ui-react";

const MessageInitView = (props) => {
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [messageData, setMessageData] = useState({
    name: "",
    typingName: false,
    content: "",
    typingContent: false
  });
  const [nameInputError, setNameInputError] = useState(false);
  const [contentInputError, setContentInputError] = useState(false);
  // redux state and actions //
  const { handleInitialMessage, clientState } = props;
  const handleNameChange = (e) => {
    setMessageData({
      ...messageData,
      name: e.target.value,
      typingName: true
    });
  };
  const handleContentChange = (e) => {
    setMessageData({
      ...messageData,
      content: e.target.value,
      typingContent: true
    });
  };

  const handleNameError = () => {
    const { name, typingName } = messageData;
    if (typingName && (name.length === 0)) {
      setNameInputError({
        content: "Name required",
        pointing: "below"
      });
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
      setContentInputError(false);
    }
  };

  const handleInitSubmit = (e) => {
    e.preventDefault();
    const { _id, firstName } = clientState;
    const data = {
      user: {
        _id: _id,
        firstName: messageData.name || firstName
      },
      content: messageData.content
    };
    handleInitialMessage(data)
  };
  
  useEffect(() => {
    handleNameError();
    handleContentError();
  },  [messageData]);

  useEffect(() => {
    if (nameInputError || contentInputError || !messageData.name || !messageData.content) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [nameInputError, contentInputError, messageData]);
  
  return (
    <Form>
        <Form.Input
          error={nameInputError}
          onChange={handleNameChange}
          placeholder='your name please...'
        />
        <Form.Input
          error={contentInputError}
          onChange={handleContentChange}
          placeholder='message content...'
        />
      <Button variant="primary" type="submit" disabled={buttonDisabled} onClick={handleInitSubmit}>
        Send
      </Button>
    </Form>
  );
};
// PropTypes validation //
MessageInitView.propTypes = {
  clientState: PropTypes.object.isRequired,
  handleInitialMessage: PropTypes.func.isRequired

};

export default MessageInitView;
*/