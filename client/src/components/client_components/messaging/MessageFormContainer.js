// @flow
import * as React from "react";
import { Button, Form } from "semantic-ui-react";
// redux imports and actions  //
import { connect } from "react-redux";
import { fetchClientConversation } from "./../../../redux/actions/conversationActions";
import MessageForm from "./MessageForm";
import OpenMessageForm from "./OpenMessageForm";

import { messageFormContainer } from "./style/styles";

const MessageFormContainer = (props) => {
 
  const [ formOpen, setFormOpen ] = React.useState({open: false});
  const [conversationId, setConversationId] = React.useState(localStorage.getItem("conversationId"));

  const handleFormOpen = (e) => {
    // toggles between messaging form and back //
    const messageForm = document.getElementById("clientMessageForm");
    if (messageForm) messageForm.classList.add("transitionedForm");

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

export default (connect(mapStateToProps, mapDispatchToProps)(MessageFormContainer) :;