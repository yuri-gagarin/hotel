import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import {
  Comment,
  Grid, 
  Input
} from "semantic-ui-react";
import { withRouter } from "react-router-dom";
// redux imports  //
import { connect } from "react-redux";
import { sendMessageRequest } from "../../../redux/actions/messageActions";
import { fetchAllConversations, fetchConversation, deleteConversation } from "../../../redux/actions/conversationActions";
import { handleNewClientMessage } from "../../../redux/actions/adminConversationActions"; 
// additional components //
import ConversationComponent from "./ConversationComponent";
import Message from "./Message";
// socket import //
import { socket } from "../../../App";

const ConversationIndexCotainer = (props) => {
  
  const [message, setMessage] = useState("");
  const { 
    sendMessageRequest,
    fetchAllConversations,
    fetchConversation,
    handleDeleteConversation,
    newClientMessage,
    adminState,
    adminConversationState,
    conversationState
  } = props;
  const messages = conversationState.messages;
  const bottomMessageRef = useRef(null);

  useEffect(() => {
    socket.on("newClientMessage", (data) => {
        const { conversationId, clientSocket, newMessage } = data;
        newClientMessage({ conversationId: conversationId, clientSocketId: clientSocket, newMessage: newMessage });
        //scrollToRef(bottomMessageRef);
    })
    fetchAllConversations();

  }, []);

  const openConversation = (conversationId) => {
    fetchConversation(conversationId);
  };
  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };
  const handleSendMessage = (e) => {
    // first get the user informatin //
    console.log(adminState);
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

  const deleteConversation = (conversationId) => {
    handleDeleteConversation(conversationId);
  };

  return (
    <React.Fragment>
      <Grid.Row>
        <Grid.Column width={14}>
          <h5 style={{textAlign: "center"}}>Conversation With {"conversationState"}</h5>
        </Grid.Column>
      </Grid.Row>
      <div className="ui divider"></div>
      <Grid.Row>
        <Grid.Column width={4} style={{ height: "100vh", paddingLeft: "0.5em", paddingRight: 0 }}>
          <ConversationComponent 
            adminConversationState={adminConversationState}
            openConversation={openConversation}
            fetchAllConversations={fetchAllConversations}
            deleteConversation={deleteConversation}
           />
        </Grid.Column>
        <Grid.Column width={10} style={{ height: "100vh", padding: 0 }}>
          <Comment.Group style={{overflow: "scroll", height: "100%", maxWidth: "none", paddingBottom: "50px"}}>
          {
            messages.map((message) => {
              return <Message key={message._id} message={message} adminState={adminState} />
            })
          }
          <div style={{ float:"left", clear: "both" }}
             ref={bottomMessageRef}>
          </div>
          </Comment.Group>
          
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
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <div className="ui divider"></div>
      </Grid.Row>
    </React.Fragment>
  );
};
// PropTypes validation //
ConversationIndexCotainer.propTypes = {
  fetchAllConversations: PropTypes.func.isRequired,
  fetchConversation: PropTypes.func.isRequired,
  adminConversationState: PropTypes.object.isRequired,
  conversationState: PropTypes.object.isRequired,
  adminState: PropTypes.object.isRequired
};
// connect functions //
const mapStateToProps = (state) => {
  return {
    adminConversationState: state.adminConvState,
    adminState: state.adminState,
    conversationState: state.conversationState,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    sendMessageRequest: (messageData) => sendMessageRequest(dispatch, messageData),
    fetchAllConversations: () => fetchAllConversations(dispatch),
    fetchConversation: (conversationId) => fetchConversation(dispatch, { conversationId }),
    handleDeleteConversation: (conversationId) => deleteConversation(dispatch, conversationId),
    newClientMessage: (messageData, currentConversations) => handleNewClientMessage(dispatch, messageData, currentConversations)
  };
};  

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ConversationIndexCotainer));