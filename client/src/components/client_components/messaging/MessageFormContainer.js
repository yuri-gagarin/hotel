// @flow
import * as React from "react";
import { Button, Form } from "semantic-ui-react";
// redux imports and actions  //
import { connect } from "react-redux";
import { handleConversationOpen, handleConversationClose, handleFetchConversation, handleSendMessage, handleSendMessageSuccess, handleReceiveMessage } from "./../../../redux/actions/conversationActions";
import MessageForm from "./MessageForm";
import OpenMessageForm from "./OpenMessageForm";
// types //
import type { Dispatch, RootState } from "../../../redux/reducers/_helpers/createReducer";
import type { ClientState } from "../../../redux/reducers/client/flowTypes";
import type { ConversationState, ConversationAction, MessageData } from "../../../redux/reducers/conversations/flowTypes";

import { messageFormContainer } from "./style/styles";

type Props = {
  clientState: ClientState;
  conversationState: ConversationState;
  // non API calling redux actions //
  _handleConversationOpen: (currentConversationState: ConversationState) => void;
  _handleConversationClose: () => void;
  // API call reliant redux actions //
  _handleFetchConversation: (conversationId: string) => Promise<boolean>;
  _handleSendMessage: (messageData: MessageData) => Promise<boolean>;
  _handleSendMessageSuccess: (messageData: MessageData) => Promise<boolean>;
  _handleReceiveMesssage: (messageData: MessageData) => Promise<boolean>;
};

const MessageFormContainer = ({ clientState, conversationState, _handleConversationOpen, _handleConversationClose, _handleFetchConversation, _handleSendMessage }: Props): React.Node => {
 
  const handleClientMessengerOpen = (e) => {
    // toggles between messaging form and back //
    const messageForm = document.getElementById("clientMessageForm");
    if (messageForm) messageForm.classList.add("transitionedForm");

  }
  // render conditionally //
  return (
    <React.Fragment>
      <OpenMessageForm handleFormOpen={ _handleConversationOpen } />
      <MessageForm 
        open={ conversationState.messengerOpen } 
        handleClose={ _handleConversationClose }
        handleSendMessage={ _handleSendMessage  }
      />
    </React.Fragment>
  );
}
const mapStateToProps = (state: RootState) => {
  return {
    conversationState: state.conversationState,
    clientState: state.clientState
  };
};
const mapDispatchToProps = (dispatch: Dispatch<ConversationAction>) => {
  return {
    _handleFetchConversation: (conversationId: string) => handleFetchConversation(dispatch, conversationId)
  };
};

export default (connect(mapStateToProps, mapDispatchToProps)(MessageFormContainer): React.AbstractComponent<Props>);