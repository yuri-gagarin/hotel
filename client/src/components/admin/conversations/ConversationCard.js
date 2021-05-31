// @flow
import * as  React from "react";
import PropTypes from "prop-types";
import { Button, Card, Icon } from "semantic-ui-react";
// additional dependencies //
import { formatDate } from "../../helpers/dateHelpers";
// types //
import type { AdminConversationState, AdminConversationData } from "../../../redux/reducers/admin_conversations/flowTypes";
// helpers //
import styles from "./css/conversationCard.module.css";

type Props = {
  adminConversationState: AdminConversationState;
  conversation: AdminConversationData;
  openConversation: (conversationId: string) => void;
  closeConversation: () => void;
  deleteConversation: (conversationId: string) => void;
}
export const ConversationCard = ({ adminConversationState, conversation, openConversation, closeConversation, deleteConversation }: Props): React.Node => {
  const [ convoSelected, setConvoSelected ] = React.useState(false);

  React.useEffect(() => {
    if (conversation.conversationId === adminConversationState.activeConversation.conversationId) {
      setConvoSelected(true);
    } else {
      setConvoSelected(false);
    }
  }, [ adminConversationState, conversation ]);

  const selectConversation = (): void => {
    openConversation(conversation.conversationId);
  }

  return (
    <Card fluid color="green" className={ `${conversation.new ? styles.newConversationCard : ""} ${styles.conversationCard} ${convoSelected ? styles.selectedConversation : ""}` } onClick={ selectConversation }>
      <Card.Content>
        <div className={ `${styles.conversationName}` }>
          <span className={ `${convoSelected ? styles.textColorSelected : ""}`}>
            Conversation with: 
          </span>
          <span>
          { conversation.conversationName ? conversation.conversationName : "Anonymous" }
          </span>
        </div>
        <div className={ `${styles.conversationContent} ${convoSelected ? styles.textColorSelected : ""}`}>
          { conversation.messages.length > 0 ? conversation.messages[conversation.messages.length - 1].messageContent : "No messages"}
        </div>
        <div className={ `${styles.conversationDate} ${convoSelected ? styles.textColorSelected : ""}` }>
          Created at: { formatDate(conversation.createdAt, { military: true }) }
        </div>
      </Card.Content>
      {
        conversation.new ?
          <div className={ styles.newNotificationDiv }>
            <span>New</span>
            <Icon name="exclamation" />
          </div>
        : 
          null
      }
      
    </Card>
  );
};  
