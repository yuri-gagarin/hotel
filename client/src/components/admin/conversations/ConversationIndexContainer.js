// @flow 
import * as React from "react";
import { Button, Grid, Segment } from "semantic-ui-react";
// additional components //
import ConversationComponent from "./ConversationComponent";
import MessagesView from "./MessagesView";
import { MessagesSplashScreen } from "./MessageSplashScreen";
// styles imports //
import { closeConvoButton } from "./styles/style";
import styles from "./css/conversationIndexContainer.module.css";
// redux imports  //
import { connect } from "react-redux";
import { handleOpenAdminConversation, handleCloseAdminConversation, handleFetchAdminConversations, handleDeleteAdminConversation, handleNewMessage } from "../../../redux/actions/adminConversationActions";
// flow types //
import type { RouterHistory } from "react-router-dom";
import type { RootState, Dispatch } from "../../../redux/reducers/_helpers/createReducer";
import type { AdminConversationAction, AdminConversationState } from "../../../redux/reducers/admin_conversations/flowTypes";
import type { MessageData } from "../../../redux/reducers/conversations/flowTypes";
// socket import //
import { socket } from "./../../../App";
// helpers //
import { objectValuesEmpty } from "../../helpers/displayHelpers";

type WrapperProps = {|
  history: RouterHistory;
|};
type Props = {
  ...WrapperProps;
  adminState: any;
  adminConversationState: AdminConversationState;
  _handleOpenAdminConversation: (conversationId: string, currentAdminConversationState: AdminConversationState) => void;
  _handleCloseAdminConversation: () => void;
  _handleFetchAdminConversations: () => Promise<boolean>;
  _handleDeleteAdminConversation: (conversationId: string, currentAdminConversationState: AdminConversationState) => void;
  _handleNewMessage: (messageData: MessageData, currentAdminConversationState: AdminConversationState) => Promise<boolean>;
};
const ConversationIndexContainer = ({ history, adminState, adminConversationState, _handleOpenAdminConversation, _handleCloseAdminConversation, _handleFetchAdminConversations, _handleDeleteAdminConversation, _handleNewMessage }: Props): React.Node => {
    // redux state props //

  React.useEffect(() => {
    let mounted = true;

    if (mounted) {
      socket.on("newClientMessage", (data: MessageData) => {
       _handleNewMessage(data, adminConversationState);
    });

    _handleFetchAdminConversations();
    }
    return () => { mounted = false };
  }, []);

  const openConversation = (conversationId: string): void => {
    _handleOpenAdminConversation(conversationId, adminConversationState);
  };

  const closeConversation = (): void => {
    _handleCloseAdminConversation;
  };
  // TODO //
  // add a confirmation modal //
  const deleteConversation = (converstionId: string): void => {
    _handleDeleteAdminConversation
  };

  return (
    <React.Fragment>
      <Grid.Row>
        
      </Grid.Row>
      <Grid.Row centered className={ styles.messengerIndexRow }>
        <Grid.Column width={4} className={ styles.conversationsColumn }>
          <ConversationComponent 
            adminConversationState={ adminConversationState } 
            openConversation={ openConversation }
            closeConversation={ closeConversation }
            deleteConversation={ deleteConversation }
          />          
        </Grid.Column>
        <Grid.Column width={10} className={ styles.messagesColumn }>
          {
            objectValuesEmpty(adminConversationState.activeConversation) 
            ? 
            <MessagesSplashScreen />
            :
            <MessagesView 
              adminState={ adminState }
              adminConversationState={ adminConversationState }
              sendAdminMessage={ _handleNewMessage }
              closeConversation={ closeConversation }
            /> 
          }
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <div className="ui divider"></div>
      </Grid.Row>
    </React.Fragment>
  );
};
// connect functions //
const mapStateToProps = (state: RootState) => {
  return {
    adminState: state.adminState,
    adminConversationState: state.adminConversationState,
  };
};
const mapDispatchToProps = (dispatch: Dispatch<AdminConversationAction>) => {
  return {
    _handleOpenAdminConversation: (conversationId: string, currentAdminConversationState: AdminConversationState) => handleOpenAdminConversation(dispatch, conversationId, currentAdminConversationState),
    _handleCloseAdminConversation: () => handleCloseAdminConversation(dispatch),
    _handleFetchAdminConversations: () => handleFetchAdminConversations(dispatch),
    _handleDeleteAdminConversation: (conversationId: string, currentAdminConversationState: AdminConversationState) => handleDeleteAdminConversation(dispatch, conversationId, currentAdminConversationState),
    _handleNewMessage: (messageData: MessageData, currentAdminConversationState: AdminConversationState) => handleNewMessage(dispatch, messageData, currentAdminConversationState)
  }
};  

export default (connect(mapStateToProps, mapDispatchToProps)(ConversationIndexContainer): React.AbstractComponent<WrapperProps>);