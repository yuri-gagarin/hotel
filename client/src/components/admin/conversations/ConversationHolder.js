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
      <Comment.Content style={{paddingTop: "0.75em"}}>
        <DeleteConvoBtn deleteConversation={deleteConversation} conversationId={conversationId} />
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

};

export default ConversationHolder;