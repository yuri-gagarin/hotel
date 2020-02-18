import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Comment,
  Icon
} from "semantic-ui-react";

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
  const confirmDeleteConversation = () => {
    alert("Are You Sure?");
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
  const handleConvoOpen = () => {

  };
  return (
    <Comment onClick={handleConvoOpen} style={style.convoContainerStyle}>
      <Comment.Content style={{paddingTop: "0.5em"}}>
        <DeleteConvoBtn/>
        <Comment.Author as='a'>Matt</Comment.Author>
        <Comment.Content>How artistic!</Comment.Content>
        <Comment.Metadata>
          <div>Today at 5:42PM</div>
        </Comment.Metadata>
      </Comment.Content>
    </Comment>
  );
};  

export default ConversationHolder;