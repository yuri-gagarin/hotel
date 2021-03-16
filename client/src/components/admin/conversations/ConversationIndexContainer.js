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
import { sendAdminMessage } from "../../../redux/actions/messageActions";
import { 
  fetchAllConversations, fetchConversation, 
  deleteConversation, clearConversationState 
} from "../../../redux/actions/conversationActions";
import { newClientMessage } from "../../../redux/actions/adminConversationActions"; 
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

const ConversationIndexContainer = (props) => {
    // redux state props //
  const { 
    adminState,
    adminConversationState,
    conversationState
  } = props;
  // redux action functions //
  const {
    _sendAdminMessage,
    _fetchAllConversations,
    _fetchConversation,
    _clearConversationState,
    _deleteConversation,
    _newClientMessage
  } = props;

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      socket.on("newClientMessage", (data) => {
        const { conversationId, socketId, newMessage } = data;
        _newClientMessage({ conversationId: conversationId, clientSocketId: socketId, newMessage: newMessage }, adminConversationState);
        //scrollToRef(bottomMessageRef);
    });
    _fetchAllConversations();
    }
    return () => mounted = false;
  }, []);

  const openConversation = (conversationId) => {
    _fetchConversation(conversationId);
  };

  const closeConversation = () => {
    _clearConversationState();
  };

  return (
    <React.Fragment>
      <Grid.Row style={{borderTop: "1px solid grey", borderBottom: "1px solid grey" }}>
        <Grid.Column width={5} style={{ height: "90vh", paddingLeft: "0.5em", paddingRight: 0 }}>
          <ConversationComponent 
            adminConversationState={adminConversationState}
            conversationState={conversationState}
            openConversation={openConversation}
            closeConversation={closeConversation}
            fetchAllConversations={_fetchAllConversations}
            deleteConversation={_deleteConversation}
          />          
        </Grid.Column>
        {
          conversationState.conversationId ? 
            <MessagesView 
              adminState={adminState}
              messages={conversationState.messages}
              conversationState={conversationState}
              sendAdminMessage={_sendAdminMessage}
              closeConversation={closeConversation}
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
ConversationIndexContainer.propTypes = {
  _sendAdminMessage: PropTypes.func.isRequired,
  _fetchAllConversations: PropTypes.func.isRequired,
  _fetchConversation: PropTypes.func.isRequired,
  _clearConversationState: PropTypes.func.isRequired,
  _deleteConversation: PropTypes.func.isRequired,
  _newClientMessage: PropTypes.func.isRequired,
  adminState: PropTypes.object.isRequired,
  adminConversationState: PropTypes.object.isRequired,
  conversationState: PropTypes.object.isRequired
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
    _sendAdminMessage: (messageData) => sendAdminMessage(dispatch, messageData),
    _fetchAllConversations: () => fetchAllConversations(dispatch),
    _fetchConversation: (conversationId) => fetchConversation(dispatch, { conversationId }),
    _clearConversationState: () => dispatch(clearConversationState()),
    _deleteConversation: (conversationId, curentConversationId) => {
      return deleteConversation(dispatch, conversationId, curentConversationId);
    },
    _newClientMessage: (messageData, currentConversations) => newClientMessage(dispatch, messageData, currentConversations)
  };
};  

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ConversationIndexContainer));