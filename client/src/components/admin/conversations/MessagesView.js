import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Comment,
  Grid,
  Input
} from "semantic-ui-react";
// additional component imports //
import Message from "./Message";
// style imports //
import { conversationTitle } from "./styles/style";

const MessagesView = (props) => {
  const { 
    adminState, 
    messages, 
  } = props;
  const [message, setMessage] = useState("");

  const setConversationTitle = (messages, adminState) => {
    let conversationTitle;
    for (let i = 0; i < messages.length; i++) {
      if (messages[i].sender != adminState.firstName ) {
        conversationTitle = messages[i].sender;
        break;
      }
    }
    return conversationTitle
  };
  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };
  const handleSendMessage = (e) => {
    // first get the user informatin //
    const messageData = {
      user: adminState,
      messageData: message,
      conversationId: conversationState.conversationId,
      clientSocketId: conversationState.clientSocketId
    };
    sendMessageRequest(messageData);
    e.target.value = "";
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      // handle messages submission here //
      const messageData = {
        user: adminState,
        messageData: message,
        conversationId: conversationState.conversationId,
        clientSocketId: conversationState.clientSocketId
      };
      sendMessageRequest(messageData);
      e.target.value = "";
    };
  };

  return (
    <Grid.Column width={11} style={{ height: "100vh", padding: 0 }}>
      <Comment.Group style={{overflowY: "scroll", height: "100%", maxWidth: "none" }}>
        <div style={conversationTitle}>ConversationWith: {setConversationTitle(messages, adminState)}</div>
      {
        messages.map((message) => {
          return <Message key={message._id} message={message} adminState={adminState} />
        })
      }
      <Input 
        action={{
          icon: "send",
          content: "Send",
          onClick: handleSendMessage
        }}
        onChange={handleInputChange}
        placeholder='message...' 
        style={{position: "absolute", bottom: 0, left: 0, right: 0, height: "50px"}}
        onKeyPress={handleKeyPress}
        />
      </Comment.Group>
    </Grid.Column>
  )
};

// PropTypes validation //
MessagesView.PropTypes = {
  messages: PropTypes.object.isRequired
};

export default MessagesView;