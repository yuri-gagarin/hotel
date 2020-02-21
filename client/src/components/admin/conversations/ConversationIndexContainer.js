import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Comment,
  Grid, 
  Input
} from "semantic-ui-react";
import { withRouter } from "react-router-dom";
// redux imports  //
import { connect } from "react-redux";
import { fetchAllConversations, fetchConversation } from "../../../redux/actions/conversationActions";
import { handleNewClientMessage } from "../../../redux/actions/adminConversationActions"; 
// additional components //
import ConversationComponent from "./ConversationComponent";
import Message from "./Message";
// socket import //
import { socket } from "../../../App";
const ConversationIndexCotainer = (props) => {
  const [message, setMessage] = useState("");
  const { 
    fetchAllConversations,
    fetchConversation,
    newClientMessage,
    adminConversationState,
    conversationState
  } = props;
  const messages = conversationState.messages;
  const handleNewClientMessage = () =>{

  };
  
  useEffect(() => {
    socket.on("newClientMessage", (data) => {
        const { conversationId, clientSocket, newMessage } = data;
        newClientMessage({ conversationId: conversationId, clientSocketId: clientSocket });
    })
    fetchAllConversations();

  }, []);

  const openConversation = (conversationId) => {
    fetchConversation(conversationId);
  };
  const handleSendMessage = () => {
    console.log("clicked ");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      // handle messages submission here //
      console.log(props);
    }
  };
  const renderMessages = (messages) => {
    return messages.map((message) => {
      return <Message key={message._id} message={message} />
    })
  };

  

  return (
    <React.Fragment>
      <Grid.Row>
        <Grid.Column width={16}>
          <h5 style={{textAlign: "center"}}>Conversation With "Name Here"</h5>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={6} style={{border: "2px solid red", height: "100vh", paddingLeft: "0.5em", paddingRight: 0}}>
          <ConversationComponent 
            adminConversationState={adminConversationState}
            openConversation={openConversation}
            fetchAllConversations={fetchAllConversations}
           />
        </Grid.Column>
        <Grid.Column width={10} style={{border: "2px solid green", height: "100vh"}}>
          <Comment.Group style={{overflow: "scroll", height: "100%", paddingRight: "1em", paddingBottom: "50px"}}>
          {
           [...renderMessages(messages)]
          }
          </Comment.Group>
          
          <Input 
            action={{
              icon: "send",
              content: "Send",
              onClick: handleSendMessage
            }}
            placeholder='message...' 
            style={{position: "absolute", bottom: 0, left: 0, right: 0, height: "50px"}}
            onKeyPress={handleKeyPress}
            />
        </Grid.Column>
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
  clientState: PropTypes.object.isRequired
};
// connect functions //
const mapStateToProps = (state) => {
  return {
    adminConversationState: state.adminConvState,
    conversationState: state.conversationState,
    clientState: state.clientState
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllConversations: () => fetchAllConversations(dispatch),
    fetchConversation: (conversationId) => fetchConversation(dispatch, { conversationId }),
    newClientMessage: (messageData, currentConversations) => handleNewClientMessage(dispatch, messageData, currentConversations)
  };
};  

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ConversationIndexCotainer));