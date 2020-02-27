import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Grid, 
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
import { socket } from "../../../App";

const MessagesSplashScreen = (props) => {
  return (
    <Grid.Column>
      <div className="colorAnimation">
        <h3>Messages View Here</h3>
      </div>
    </Grid.Column>
  )
};

const ConversationIndexCotainer = (props) => {
  
  const [conversationOpen, setConversationOpen] = useState(false);

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
        <Grid.Column width={14}>
          <h5 style={{textAlign: "center"}}>Live Conversations{"conversationState"}</h5>
          <Button style={ closeConvoButton } onClick={closeConversation}>Close Conversation</Button>
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
        <MessagesView 
          adminState={adminState}
          messages={conversationState.messages}
          sendMessageRequest={sendMessageRequest}
        />
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