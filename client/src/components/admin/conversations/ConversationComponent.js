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


const ConversationComponent = (props) => {
  const { adminConversationState, conversationState, openConversation, closeConversation, deleteConversation } = props;
  const { conversations } = adminConversationState;
  return (
    <Segment style={{ overflowY: "scroll", height: "100%", marginRight: "3%" }}>
       <Comment.Group style={{ paddingRight: "0.5em" }}>
        <Header as='h3' style={{textAlign: "center"}}>
          Active Conversations
        </Header>
        {
          conversations.map((conversation) => {
            return (
              <ConversationHolder 
                key={conversation._id}
                conversationState={conversationState}
                conversation={conversation}
                openConversation={openConversation}
                closeConversation={closeConversation}
                deleteConversation={deleteConversation}
              />
            );
          })
        } 
      </Comment.Group>
    </Segment>
  );
};
// PropTypes validation //
ConversationComponent.propTypes = {
  history: PropTypes.object.isRequired,
  adminConversationState: PropTypes.object.isRequired,
  conversationState: PropTypes.object.isRequired,
  openConversation: PropTypes.func.isRequired
};

export default withRouter(ConversationComponent);