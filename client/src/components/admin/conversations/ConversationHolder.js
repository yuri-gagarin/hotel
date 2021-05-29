// @flow
import * as  React from "react";
import PropTypes from "prop-types";
import { Button, Comment, Icon } from "semantic-ui-react";
// additional dependencies //
import { formatDate } from "../../helpers/dateHelpers";
// types //
import type { AdminConversationState, AdminConversationData } from "../../../redux/reducers/admin_conversations/flowTypes";
const style = {
  convoContainerStyle: {
    cursor: "pointer", 
    border: "1px solid rgb(50, 113, 230)", 
    borderRadius: "5px",
    padding: "1.5em",
    WebkitBoxShadow: "0px 0px 7px -2px rgba(158,142,54,1)",
    MozBoxShadow: "0px 0px 7px -2px rgba(158,142,54,1)",
    BoxShadow: "0px 0px 7px -2px rgba(158,142,54,1)"
  },
  activeConvoContainerStyle: {
    cursor: "pointer", 
    border: "1px solid rgb(50, 113, 230)", 
    background: "#00B4DB",  /* fallback for old browsers */
    borderRadius: "5px",
    padding: "1.5em",
    WebkitBoxShadow: "0px 0px 7px -2px rgba(158,142,54,1)",
    MozBoxShadow: "0px 0px 7px -2px rgba(158,142,54,1)",
    BoxShadow: "0px 0px 7px -2px rgba(158,142,54,1)"
  },
  convoDeleteBtn: { 
    position: "absolute",
    right: "1%",
    top: "5%",
    color: "white"
  }
};

type DeleteConvoBtnProps = {
  deleteConversation: (convesationId: string) => void;
  conversationId: string;
};
const DeleteConvoBtn = ({ deleteConversation, conversationId }: DeleteConvoBtnProps): React.Node => {

  const confirmDeleteConversation = (e) => {
    e.stopPropagation();
    alert("Are You Sure?");
    deleteConversation(conversationId)
  };

  return (
    <Button 
      icon 
      style={style.convoDeleteBtn} 
      color="red" 
      onClick={confirmDeleteConversation}
    >
      <Icon name="trash"></Icon>
      <span>Delete</span>
    </Button>
  );
};

type Props = {
  adminConversationState: AdminConversationState;
  conversation: AdminConversationData;
  openConversation: (conversationId: string) => void;
  closeConversation: () => void;
  deleteConversation: (conversationId: string) => void;
}
const ConversationHolder = ({ adminConversationState, conversation, openConversation, closeConversation, deleteConversation }: Props): React.Node => {
  const [ convoSelected, setConvoSelected ] = React.useState(false);

 
  React.useEffect(() => {
    if (conversation.conversationId === adminConversationState.activeConversation.conversationId) {
      setConvoSelected(true);
    } else {
      setConvoSelected(false);
    }
  }, [ adminConversationState, conversation ]);

  return (
    <Comment 
      onClick={() => openConversation(conversation.conversationId)} 
      style={ convoSelected ? style.activeConvoContainerStyle : style.convoContainerStyle }
    >
      <Comment.Content style={{paddingTop: "0.75em"}}>
        <DeleteConvoBtn 
          deleteConversation={deleteConversation} 
          conversationId={conversation.conversationId}
        />
        <Comment.Content>{conversation.messages[conversation.messages.length - 1].messageContent}</Comment.Content>
        <Comment.Metadata style={{ marginLeft: 0 }}>
          <div>Sent at: {formatDate(conversation.messages[conversation.messages.length - 1].sentAt, { military: true })}</div>
        </Comment.Metadata>
      </Comment.Content>
    </Comment>
  );
};  
export default ConversationHolder;