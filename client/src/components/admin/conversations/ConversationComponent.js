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

const renderConversations = (conversations) => {
  return conversations.map((conversation) => {
    return <ConversationHolder key={conversation._id}/>
  });
};

const ConversationComponent = (props) => {
  const { adminConversationState } = props;
  const { conversations } =  adminConversationState;
  console.log(adminConversationState);
  const messages = props.messages || [];
  const handleConvoOpen = () => {
    console.log("clicked");
  }

  const switchDanger = () => {
    console.log("danger")
  };
  return (
      <Comment.Group style={{overflow: "scroll", height: "100%", paddingRight: "1em"}}>
        <Header as='h3' style={{textAlign: "center"}}>
          Active Conversations
        </Header>
        {
          [...renderConversations(conversations)]
        } 
      </Comment.Group>
      
  )
};
// PropTypes validation //
ConversationComponent.propTypes = {
  history: PropTypes.object.isRequired
};

export default withRouter(ConversationComponent);