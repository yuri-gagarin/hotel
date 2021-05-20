// @flow
import * as React from "react";
import { Comment, Header, Segment } from "semantic-ui-react";
// addiotinal component imports //
import ConversationHolder from "./ConversationHolder";
// type imports //
import type { AdminConversationState } from "../../../redux/reducers/admin_conversations/flowTypes";

type Props = {
  adminConversationState: AdminConversationState;
  openConversation: (conversationId: string) => void;
  closeConversation: () => void;
  deleteConversation: (conversationId: string) => void;
}
const ConversationComponent = ({ adminConversationState, openConversation, closeConversation, deleteConversation}: Props): React.Node => {
  const { loadedAdminConversations } = adminConversationState;
  return (
    <Segment style={{ overflowY: "scroll", height: "100%", marginRight: "3%" }}>
       <Comment.Group style={{ paddingRight: "0.5em" }}>
        <Header as='h3' style={{textAlign: "center"}}>
          Active Conversations
        </Header>
        {
          loadedAdminConversations.map((conversation) => {
            return (
              <ConversationHolder 
                key={conversation.conversationId}
                conversationState={adminConversationState}
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


export default ConversationComponent;