// @flow
import * as React from "react";
import { Comment, Header, Segment } from "semantic-ui-react";
// addiotinal component imports //
import ConversationHolder from "./ConversationHolder";
import { GeneralNoModelsSegment } from "../shared/GeneralNoModelsSegment";
// type imports //
import type { AdminConversationState } from "../../../redux/reducers/admin_conversations/flowTypes";
import styles from "./css/conversationComponent.module.css";

type Props = {
  adminConversationState: AdminConversationState;
  openConversation: (conversationId: string) => void;
  closeConversation: () => void;
  deleteConversation: (conversationId: string) => void;
}
const ConversationComponent = ({ adminConversationState, openConversation, closeConversation, deleteConversation}: Props): React.Node => {
  const { loadedAdminConversations } = adminConversationState;
  return (
    <div className={ styles.conversationComponentWrapper }>
      {
        loadedAdminConversations.length > 0
        ?
        <Comment.Group style={{ paddingRight: "0.5em" }}>
          <Header as='h3' style={{textAlign: "center"}}>
            Active Conversations
          </Header>
          {
            loadedAdminConversations.map((conversation) => {
              return (
                <ConversationHolder 
                  key={conversation.conversationId}
                  adminConversationState={adminConversationState}
                  conversation={conversation}
                  openConversation={openConversation}
                  closeConversation={closeConversation}
                  deleteConversation={deleteConversation}
                />
              );
            })
          }
        </Comment.Group>
        :
        <GeneralNoModelsSegment customHeaderMessage="No Conversations" customContentMessage="You dont have any active conversations" />
      }
    </div>
  );
};


export default ConversationComponent;