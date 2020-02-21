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
    border: "1px solid grey", 
    padding: "1em"
  },
  convoDeleteBtn: { 
    position: "absolute",
    right: 0,
    top: 0,
    padding: "0.5em",
    marginTop: "0.25em",
    color: "white"
  }
};

const DeleteConvoBtn = (props) => {
  const { deleteConversation, conversationId } = props;
  const confirmDeleteConversation = (e) => {
    e.stopPropagation();
    alert("Are You Sure?");
    deleteConversation(conversationId);
  };
  return(
    <Button 
      icon 
      style={style.convoDeleteBtn} 
      color="red" 
      onClick={confirmDeleteConversation}
    >
      <Icon name="trash"></Icon>
      <span>Delete</span>
    </Button>
  )
};

const ConversationHolder = (props) => {
  const { conversation, openConversation, deleteConversation } = props;
  const conversationId = conversation._id;
  const lastMessage = conversation.lastMessage;
  
  return (
    <Comment onClick={() => openConversation(conversationId)} style={style.convoContainerStyle}>
      <Comment.Content style={{paddingTop: "0.5em"}}>
        <DeleteConvoBtn deleteConversation={deleteConversation} conversationId={conversationId} />
        <Comment.Author as='a'>{lastMessage.sender}</Comment.Author>
        <Comment.Content>{lastMessage.content}</Comment.Content>
        <Comment.Metadata>
          <div>Sent at: {formatDate(lastMessage.sentAt, { military: true })}</div>
        </Comment.Metadata>
      </Comment.Content>
    </Comment>
  );
};  

ConversationHolder.propTypes = {

};

export default ConversationHolder;