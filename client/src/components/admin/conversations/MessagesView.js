import React, { useState, useEffect, useRef } from "react";
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
    sendAdminMessage
  } = props;
  const [message, setMessage] = useState("");
  const [messageSounds, setMessageSounds] = useState({});
  // set the sound effects for send, receive instant message //
  useEffect(() => { 
    // load sounds upon component load //
    const messageInput = document.getElementById("messageInput");
    setMessageSounds({
      ...messageSounds,
      sendMessageSound: new Audio("/assets/media/sounds/sentMsg.mp3"),
      receiveMessageSound: new Audio("/assets/media/sounds/receiveMsg.mp3")
    });
    messageInput.scrollIntoView();
   
    return function cleanup () { 
      setMessageSounds({});
    };
  }, [])
  // 
  useEffect(() => {
    const messagesView = document.getElementById("messagesView");
    const messageInput = document.getElementById("messageInput");
    messageInput.scrollIntoView();
    messagesView.scrollTo(0, messagesView.scrollHeight);
  }, [messages]);

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
    // first get the user information //
    console.log("calling")
    const messageData = {
      user: adminState,
      messageData: message,
      conversationId: conversationState.conversationId,
      clientSocketId: conversationState.clientSocketId
    };
    e.target.value = "";
    sendMessageRequest(messageData)
      .then((success) => {
        if (success && messageSounds.sendMessageSound) {
          messageSounds.sendMessageSound.play();
        }
      });
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
      e.target.value = "";
      sendMessageRequest(messageData)
        .then((success) => {
          if (success && messageSounds.sendMessageSound) {
            messageSounds.sendMessageSound.play();
          }
        });
    };
  };

  return (
    <Grid.Column width={11} style={{ height: "90vh", padding: 0 }}>
      <Segment style={{ overflowY: "scroll", height: "100%", paddingBottom: "60px", position: "relative" }} id="messagesView">
        <Comment.Group style={{ maxWidth: "none" }}>
          <div className="adminConvHeader">
            <div className="adminConvTitle">
              <p>ConversationWith: {setConversationTitle(messages, adminState)}</p>
            </div>
            <div className="adminCloseConvButton" onClick={closeConversation}>
              <p>Close Conversation</p>
            </div>
          </div>
         
          {
            messages.map((message) => {
              return <Message key={message._id} message={message} adminState={adminState} />
            })
          }
        </Comment.Group>
      </Segment>
      <Input 
        id="messageInput"
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
    </Grid.Column>
  )
};

// PropTypes validation //
MessagesView.propTypes = {
  messages: PropTypes.array.isRequired,
  conversationState: PropTypes.object.isRequired,
  sendMessageRequest: PropTypes.func.isRequired,
  closeConversation: PropTypes.func.isRequired
};

export default MessagesView;