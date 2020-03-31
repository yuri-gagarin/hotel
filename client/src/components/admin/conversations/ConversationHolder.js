import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Comment,
  Icon
} from "semantic-ui-react";
// additional dependencies //
import { formatDate } from "../../helpers/dateHelpers";
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
  convoDeleteBtn: { 
    position: "absolute",
    right: "1%",
    top: "5%",
    color: "white"
  }
};

const DeleteConvoBtn = (props) => {
  const { conversationId, conversationState, deleteConversation, closeConversation } = props;
  const currentOpenConvId = conversationState.conversationId;

  const confirmDeleteConversation = (e) => {
    e.stopPropagation();
    alert("Are You Sure?");
    deleteConversation(conversationId, currentOpenConvId)
      .then((success) => {
        if (success) {
          // handle view close here //
          console.log(conversationState)
          if (conversationId == currentOpenConvId) {
            closeConversation();
          }
        }
      });
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

const ConversationHolder = (props) => {
  const { conversationState, conversation, openConversation, closeConversation, deleteConversation } = props;
  const conversationId = conversation._id;
  const lastMessage = conversation.lastMessage;
  
  return (
    <Comment onClick={() => openConversation(conversationId)} style={style.convoContainerStyle}>
      <Comment.Content style={{paddingTop: "0.75em"}}>
        <DeleteConvoBtn 
          conversationState={conversationState}
          deleteConversation={deleteConversation} 
          closeConversation={closeConversation}
          conversationId={conversationId} 
        />
        <Comment.Author><span>From: </span>{lastMessage.sender}</Comment.Author>
        <Comment.Content>{lastMessage.content}</Comment.Content>
        <Comment.Metadata style={{ marginLeft: 0 }}>
          <div>Sent at: {formatDate(lastMessage.sentAt, { military: true })}</div>
        </Comment.Metadata>
      </Comment.Content>
    </Comment>
  );
};  

ConversationHolder.propTypes = {
  conversationState: PropTypes.object.isRequired,
  conversation: PropTypes.object.isRequired,
  openConversation: PropTypes.func.isRequired,
  closeConversation: PropTypes.func.isRequired,
  deleteConversation: PropTypes.func.isRequired
};

DeleteConvoBtn.propTypes = {
  conversationState: PropTypes.object.isRequired,
  conversationId: PropTypes.string.isRequired,
  closeConversation: PropTypes.func.isRequired,
  deleteConversation: PropTypes.func.isRequired
};

export default ConversationHolder;