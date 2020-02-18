import React, { useEffect } from "react";
import PropTypes from "prop-types";
import {
  Comment,
  Grid, 
  Input
} from "semantic-ui-react";
import { withRouter } from "react-router-dom";
// redux imports  //
import { connect } from "react-redux";
import { fetchAllConversations } from "../../../redux/actions/conversationActions";
// additional components //
import ConversationComponent from "./ConversationComponent";
import Message from "./Message";
// socket import //
import { socket } from "../../../App";
const ConversationIndexCotainer = (props) => {
  const { 
    fetchAllConversations,
    adminConversationState
  } = props;

  useEffect(() => {
    socket.on("newClientMessage", (data) => {
      const { socketId, messageData } = data;
        // to do //
        //messageReceived(socketId, messageData); //
    })
    fetchAllConversations();

  }, []);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      // handle messages submission here //
      console.log(props);
    }
  };
  const renderMessages = (props) => {
    const messages = [];
    for (let i = 0; i < 20; i++) {
      messages.push(<Message key={i} />);
    };
    return messages;
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
            fetchAllConversations={fetchAllConversations}
           />
        </Grid.Column>
        <Grid.Column width={10} style={{border: "2px solid green", height: "100vh"}}>
          <Comment.Group style={{overflow: "scroll", height: "100%", paddingRight: "1em", paddingBottom: "50px"}}>
          {
           [...renderMessages()]
          }
          </Comment.Group>
          
          <Input 
            action='Send' 
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
  adminConversationState: PropTypes.object.isRequired,
  clientState: PropTypes.object.isRequired
};
// connect functions //
const mapStateToProps = (state) => {
  return {
    adminConversationState: state.adminConvState,
    clientState: state.clientState
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllConversations: () => fetchAllConversations(dispatch)
  };
};  

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ConversationIndexCotainer));