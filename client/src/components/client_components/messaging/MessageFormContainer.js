import React, { useState, useEffect } from "react";
import { 
  Form,
  Button
} from "react-bootstrap";
// redux imports //
import { connect } from "react-redux";
import { fetchClientConversation } from "./../../../redux/actions/conversationActions";
import MessageForm from "./MessageForm";
import OpenMessageForm from "./OpenMessageForm";

import { messageFormContainer } from "./style/styles";

const MessageFormContainer = (props) => {
 
  const [formOpen, setFormOpen] = useState({open: false});
  const [conversationId, setConversationId] = useState(localStorage.getItem("conversationId"));
  const  { handleOldConversation } = props;
  useEffect(() => {
    if (conversationId) {
      handleOldConversation(conversationId);
    }
  }, []);
  const handleFormOpen = (e) => {
    // toggles between messaging form and back //
    const messageForm = document.getElementById("clientMessageForm");
    messageForm.classList.add("transitionedForm");
  }
  // render conditionally //
  return (
    <React.Fragment>
      <OpenMessageForm handleFormOpen={handleFormOpen} />
      <MessageForm handleFormOpen={handleFormOpen}/>
    </React.Fragment>
  );
}
const mapStateToProps = (state) => {
  return {
    conversationState: state.conversationState
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    handleOldConversation: (conversationId) => fetchClientConversation(dispatch, conversationId)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageFormContainer);