// @flow
import * as React from "react";
import { Card, Header, Segment } from "semantic-ui-react";
// addiotinal component imports //
import { ConversationCard } from "./ConversationCard";
import { GeneralNoModelsSegment } from "../shared/GeneralNoModelsSegment";
// type imports //
import type { AdminConversationState } from "../../../redux/reducers/admin_conversations/flowTypes";
// styles //
import styles from "./css/conversationComponent.module.css";


type Props = {
  adminConversationState: AdminConversationState;
  openConversation: (conversationId: string) => void;
  closeConversation: () => void;
  deleteConversation: (conversationId: string) => void;
  updateAdminConversationName: (data: { conversationId: string, newName: string }) => void;
}

const ConversationComponent = ({ adminConversationState, openConversation, closeConversation, deleteConversation, updateAdminConversationName }: Props): React.Node => {
  const { loadedAdminConversations } = adminConversationState;

  return (
    <div className={ styles.conversationComponentWrapper }>
      {
        adminConversationState.loadedAdminConversations.length > 0
        ?
        <Card.Group centered className={ styles.conversationCardGroup }>
          {
            adminConversationState.loadedAdminConversations.map((conversation) => {
              return (
                <ConversationCard
                  key={conversation.conversationId}
                  adminConversationState={adminConversationState}
                  conversation={conversation}
                  openConversation={openConversation}
                  closeConversation={closeConversation}
                  deleteConversation={deleteConversation}
                  updateAdminConversationName={ updateAdminConversationName }
                />
              );
            })
          }
        </Card.Group>
        :
        <GeneralNoModelsSegment customHeaderMessage="No Conversations" customContentMessage="You dont have any active conversations" />
      }
    </div>
  );
};


export default ConversationComponent;