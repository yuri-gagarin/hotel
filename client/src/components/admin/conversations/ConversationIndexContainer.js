import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Grid, 
  Segment
} from "semantic-ui-react";
// styles imports //
import { closeConvoButton } from "./styles/style";
import { withRouter } from "react-router-dom";
// redux imports  //
import { connect } from "react-redux";
import { sendMessageRequest } from "../../../redux/actions/messageActions";
import { fetchAllConversations, fetchConversation, deleteConversation } from "../../../redux/actions/conversationActions";
import { handleNewClientMessage } from "../../../redux/actions/adminConversationActions"; 
// additional components //
import ConversationComponent from "./ConversationComponent";
import MessagesView from "./MessagesView";
// socket import //
import { socket } from "./../../../App";

const MessagesSplashScreen = (props) => {
  return (
    <Grid.Column width={11}>
      <div className="messageArea">
        <div className="messageAreaTitle">
          <h1>Hotel Instant Messaging</h1>
          <p>Open a message to access a conversation</p>
        </div>
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
         </ul>
      </div>
    </Grid.Column>
  )
};

const ConversationIndexCotainer = (props) => {
  
  const [conversationOpen, setConversationOpen] = useState(false);

  const { 
    adminState,
    adminConversationState,
    conversationState
  } = props;

  const {
    sendMessageRequest,
    fetchConversation,
    fetchAllConversations,
    handleDeleteConversation,
    newClientMessage
  } = props;

  useEffect(() => {
    socket.on("newClientMessage", (data) => {
        const { conversationId, clientSocket, newMessage } = data;
        newClientMessage({ conversationId: conversationId, clientSocketId: clientSocket, newMessage: newMessage });
        //scrollToRef(bottomMessageRef);
    });
    fetchAllConversations();
  }, []);

  const openConversation = (conversationId) => {
    fetchConversation(conversationId);
    setConversationOpen(true);
  };

  const closeConversation = () => {
    setConversationOpen(false);
  }

  const deleteConversation = (conversationId) => {
    handleDeleteConversation(conversationId);
  };

  return (
    <React.Fragment>
      <Grid.Row>
        <Grid.Column width={16}>
          <h5 style={{textAlign: "center"}}>Live Conversations</h5>
          {
            conversationOpen ? 
              <Button 
                style={closeConvoButton} 
                onClick={closeConversation}
              >
                Close Conversation
              </Button>
              : null
          }
        </Grid.Column>
      </Grid.Row>
      <Grid.Row style={{borderTop: "1px solid grey", borderBottom: "1px solid grey" }}>
        <Grid.Column width={5} style={{ height: "90vh", paddingLeft: "0.5em", paddingRight: 0 }}>
          <ConversationComponent 
            adminConversationState={adminConversationState}
            openConversation={openConversation}
            fetchAllConversations={fetchAllConversations}
            deleteConversation={deleteConversation}
          />          
        </Grid.Column>
        {
          conversationOpen ? 
            <MessagesView 
              adminState={adminState}
              messages={conversationState.messages}
              conversationState={conversationState}
              sendMessageRequest={sendMessageRequest}
            /> :
            <MessagesSplashScreen />
        }
        
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