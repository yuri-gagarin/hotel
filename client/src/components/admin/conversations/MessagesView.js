import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Comment,
  Grid,
  Input,
  Segment
} from "semantic-ui-react";
// additional component imports //
import Message from "./Message";
// style imports //
import { conversationTitle } from "./styles/style";

const MessagesView = (props) => {
  const { 
    adminState, 
    conversationState,
    messages, 
    sendMessageRequest
  } = props;
  const [message, setMessage] = useState("");
  const [messageSounds, setMessageSounds] = useState({});

  useEffect(() => { 
    setMessageSounds({
      ...messageSounds,
      sendMessageSound: new Audio("/assets/media/sounds/sentMsg.mp3"),
      receiveMessageSound: new Audio("/assets/media/sounds/receiveMsg.mp3")
    });
    return function cleanup () { 
      setMessageSounds({});
    };
  }, [])

  useEffect(() => {
  }, [messageSounds])

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
      <Segment style={{ overflowY: "scroll", height: "100%", }}>
        <Comment.Group style={{ maxWidth: "none" }}>
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

      </Segment>
    </Grid.Column>
  )
};

// PropTypes validation //
MessagesView.propTypes = {
  messages: PropTypes.array.isRequired,
  conversationState: PropTypes.object.isRequired,
  sendMessageRequest: PropTypes.func.isRequired
};

export default MessagesView;