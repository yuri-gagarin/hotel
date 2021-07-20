// @flow
import * as  React from "react";
import { Button, Card, Icon } from "semantic-ui-react";
// additional dependencies //
import { formatDate } from "../../helpers/dateHelpers";
import { ConversationNameInput } from "./ConversationNameInput";
// types //
import type { AdminConversationState, AdminConversationData } from "../../../redux/reducers/admin_conversations/flowTypes";
import type { MessageData } from "../../../redux/reducers/conversations/flowTypes";
// helpers //
import styles from "./css/conversationCard.module.css";
import { trimStringToSpecificLength } from "../../helpers/displayHelpers";

type Props = {
  adminConversationState: AdminConversationState;
  conversation: AdminConversationData;
  openConversation: (conversationId: string) => void;
  closeConversation: () => void;
  deleteConversation: (conversationId: string) => void;
  updateAdminConversationName: (data: { conversationId: string, newName: string }) => void;
}
export const ConversationCard = ({ adminConversationState, conversation, openConversation, closeConversation, deleteConversation, updateAdminConversationName }: Props): React.Node => {
  const [ convoSelected, setConvoSelected ] = React.useState(false);
  const [ lastMessageContent, setLastMessageContent ] = React.useState<MessageData | null>(null);

  React.useEffect(() => {
    if (conversation.conversationId === adminConversationState.activeConversation.conversationId) {
      setConvoSelected(true);
    } else {
      setConvoSelected(false);
    }
  }, [ adminConversationState, conversation ]);

  React.useEffect(() => {
    if (conversation.newMessages && conversation.newMessages.length > 0) {
      setLastMessageContent(conversation.newMessages[conversation.newMessages.length - 1]);
    } else if (conversation.messages && conversation.messages.length > 0) {
      setLastMessageContent(conversation.messages[conversation.messages.length - 1]);
    } else {
      setLastMessageContent(null);
    }
  }, [ conversation ]);

  const selectConversation = (): void => {
    openConversation(conversation.conversationId);
  }

  return (
    <Card fluid color="green" className={ `${styles.conversationCard} ${convoSelected ? styles.selectedConversation : ""}` }>
      <Card.Content>
        <div className={ `${styles.conversationName}` }>
          <ConversationNameInput 
            adminConversationData={ conversation } 
            updateAdminConversationName={ updateAdminConversationName }
          />
        </div>
        <div className={ `${styles.conversationContentWrapper} ${ convoSelected ? styles.selectedConversationContentWrapper : ""}`}>
          {
            lastMessageContent 
            ?
            <div className={ styles.lastMessage }>
              <div>Sender: <span>{ lastMessageContent.sender }</span><i className="fas fa-user"></i></div>
              <div>{ trimStringToSpecificLength(lastMessageContent.messageContent, 25)}</div>
            </div>
            :
            <div className={ styles.lastMessage }>
              {"Nothing yet..."}
            </div>
          }
        </div>
        <div className={ `${styles.conversationDate}` }>
          Created at: { formatDate(conversation.createdAt, { military: true }) }
        </div>
      </Card.Content>
      {
        (conversation.newMessages && conversation.newMessages.length) > 0
        ? 
          <div className={ styles.newNotificationWrapper} >
            {
              conversation.newConversation
              ?
                <div className={ styles.newConversationNotificationDiv }>
                  <span>Unread</span>
                  <div>
                    <i className="fas fa-exclamation"></i>
                  </div>
                </div>
              : 
                null
            }
            <div className={ styles.newMessagesNotificationDiv }>
              <div>{ conversation.newMessages.length }</div>
              <span>New Messages</span>
            </div>
          </div>
      
        : 
          null
      }
      <Card.Content style={{ padding: 0, margin: 0, height: "35px" }}>
        {
          adminConversationState.activeConversation.conversationId === conversation.conversationId 
          ?
          <div className={ `${styles.conversationOpenControls} ${styles.opened}` }>
            <i className={`fas fa-chevron-circle-right ${styles.slideRight}`}></i>
          </div>
          :
          <div className={ styles.conversationOpenControls }  onClick={ selectConversation }>
            Open
            <i className={`fas fa-comment`}></i>
          </div>
        }
      </Card.Content>
      
    </Card>
  );
};  
