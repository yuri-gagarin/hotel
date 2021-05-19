// @flow
import * as React from "react";
import { Button, Form } from "semantic-ui-react";
// redux imports and actions  //
import { connect } from "react-redux";
import { handleConversationOpen, handleConversationClose, handleFetchConversation, handleSendMessage, handleSendMessageSuccess, handleReceiveMessage } from "../../../redux/actions/conversationActions";
import MessageForm from "./MessageForm";
import MessengerClosedComponent from "./MessengerClosedComp";
// types //
import type { Dispatch, RootState } from "../../../redux/reducers/_helpers/createReducer";
import type { ClientState } from "../../../redux/reducers/client/flowTypes";
import type { ConversationState, ConversationAction, MessageData } from "../../../redux/reducers/conversations/flowTypes";
type WrapperProps = {

}
type Props = {
  ...WrapperProps;
  clientState: ClientState;
  conversationState: ConversationState;
  // non API calling redux actions //
  _handleConversationOpen: (currentConversationState: ConversationState) => void;
  _handleConversationClose: () => void;
  // API call reliant redux actions //
  _handleFetchConversation: (conversationId: string) => Promise<boolean>;
  _handleSendMessage: (messageData: MessageData) => Promise<boolean>;
  _handleSendMessageSuccess: (messageData: MessageData) => Promise<boolean>;
  _handleReceiveMessage: (messageData: MessageData) => Promise<boolean>;
};

const MessengerContainer = ({ 
    clientState, conversationState, _handleConversationOpen, _handleConversationClose,
   _handleFetchConversation, _handleSendMessage, _handleSendMessageSuccess, _handleReceiveMessage }: Props): React.Node => {
 
  const handleClientMessengerOpen = () => {
    // toggles between messaging form and back //
   _handleConversationOpen(conversationState);
  }

  return (
    <React.Fragment>
      <MessengerClosedComponent handleFormOpen={ handleClientMessengerOpen } />
      <MessageForm 
        open={ conversationState.messengerOpen }
        clientState={ clientState }
        conversationState={ conversationState }
        handleConversationClose={ _handleConversationClose }
        handleSendMessage={ _handleSendMessage }
        handleSendMessageSuccess={ _handleSendMessageSuccess }
        handleReceiveMessage={ _handleReceiveMessage }
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
    _handleConversationOpen: (conversationState: ConversationState) => handleConversationOpen(dispatch, conversationState),
    _handleConversationClose: () => handleConversationClose(dispatch),
    _handleFetchConversation: (conversationId: string) => handleFetchConversation(dispatch, conversationId),
    _handleSendMessage: (messageData: MessageData) => handleSendMessage(dispatch, messageData),
    _handleSendMessageSuccess: (messageData: MessageData) => handleSendMessageSuccess(dispatch, messageData), 
    _handleReceiveMessage: (socketId: string, messageData: MessageData) => handleReceiveMessage(dispatch, socketId, messageData),
  };
};

export default (connect(mapStateToProps, mapDispatchToProps)(MessengerContainer): React.AbstractComponent<WrapperProps>);