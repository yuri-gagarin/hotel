import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { 
  Comment, 
  Header,
  Segment
} from "semantic-ui-react";
import { withRouter } from "react-router-dom";
// addiotinal component imports //
import ConversationHolder from "./ConversationHolder";

const renderConversations = (conversations, openConversation, deleteConversation) => {

  return conversations.map((conversation) => {
    return (
      <ConversationHolder 
        key={conversation._id}
        conversation={conversation}
        openConversation={openConversation}
        deleteConversation={deleteConversation}
      />
    );
  });
};

const ConversationComponent = (props) => {
  const { adminConversationState, openConversation, deleteConversation } = props;
  const { conversations } =  adminConversationState;
  
  return (
    <Segment style={{ overflowY: "scroll", height: "100%", marginRight: "3%" }}>
       <Comment.Group style={{ paddingRight: "0.5em" }}>
        <Header as='h3' style={{textAlign: "center"}}>
          Active Conversations
        </Header>
        {
          [...renderConversations(conversations, openConversation, deleteConversation)]
        } 
      </Comment.Group>
    </Segment>
  );
};
// PropTypes validation //
ConversationComponent.propTypes = {
  openConversation: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export default withRouter(ConversationComponent);