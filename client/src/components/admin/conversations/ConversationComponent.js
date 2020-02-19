import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { 
  Comment, 
  Container,
  Header,
  Icon,
  Button
} from "semantic-ui-react";
import { withRouter } from "react-router-dom";
// addiotinal component imports //
import ConversationHolder from "./ConversationHolder";

const renderConversations = (conversations, openConversation) => {

  return conversations.map((conversation) => {
    return (
      <ConversationHolder 
        key={conversation._id}
        conversation={conversation}
        openConversation={openConversation}
      />
    );
  });
};

const ConversationComponent = (props) => {
  const { adminConversationState, openConversation } = props;
  const { conversations } =  adminConversationState;
  
  return (
      <Comment.Group style={{overflow: "scroll", height: "100%", paddingRight: "1em"}}>
        <Header as='h3' style={{textAlign: "center"}}>
          Active Conversations
        </Header>
        {
          [...renderConversations(conversations, openConversation)]
        } 
      </Comment.Group>
      
  )
};
// PropTypes validation //
ConversationComponent.propTypes = {
  openConversation: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export default withRouter(ConversationComponent);