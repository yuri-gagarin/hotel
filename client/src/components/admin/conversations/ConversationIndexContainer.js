// @flow 
import * as React from "react";
import { Button, Grid, Segment } from "semantic-ui-react";
// additional components //
import ConversationComponent from "./ConversationComponent";
import { ConversationControls } from "./ConversationControls";
import MessagesView from "./MessagesView";
import { MessagesSplashScreen } from "./MessageSplashScreen";
// styles imports //
import { closeConvoButton } from "./styles/style";
import styles from "./css/conversationIndexContainer.module.css";
// redux imports  //
import { connect } from "react-redux";
import { handleOpenAdminConversation, handleCloseAdminConversation, handleToggleAdminMessengerOnlineStatus, handleSetAdminMessengerOnlineStatus, handleFetchAdminConversations, handleDeleteAdminConversation, handleNewMessage } from "../../../redux/actions/adminConversationActions";
// flow types //
import type { RouterHistory } from "react-router-dom";
import type { RootState, Dispatch } from "../../../redux/reducers/_helpers/createReducer";
import type { AdminConversationAction, AdminConversationState, MessengerOnlineToggleArgs } from "../../../redux/reducers/admin_conversations/flowTypes";
import type { MessageData } from "../../../redux/reducers/conversations/flowTypes";
// socket import //
import { socket } from "./../../../App";
// helpers //
import { objectValuesEmpty } from "../../helpers/displayHelpers";
import { setClientSocketIOEventListeners, removeClientSocketIOEventListeners } from "../_helpers/clientSocketIOHelpers";

type WrapperProps = {|
  history: RouterHistory;
|};
type Props = {
  ...WrapperProps;
  adminState: any;
  adminConversationState: AdminConversationState;
  _handleToggleAdminMessengerOnlineStatus: (data: MessengerOnlineToggleArgs) => void,
  _handleSetAdminMessengerOnlineStatus: (data: MessengerOnlineToggleArgs) => void,
  _handleOpenAdminConversation: (conversationId: string, currentAdminConversationState: AdminConversationState) => void;
  _handleCloseAdminConversation: () => void;
  _handleFetchAdminConversations: () => Promise<boolean>;
  _handleDeleteAdminConversation: (conversationId: string, currentAdminConversationState: AdminConversationState) => void;
  _handleNewMessage: (messageData: MessageData, currentAdminConversationState: AdminConversationState) => Promise<boolean>;
  _dispatch: Dispatch<AdminConversationAction>;
};
const ConversationIndexContainer = ({ 
  history, adminState, adminConversationState, _dispatch,
  _handleToggleAdminMessengerOnlineStatus, _handleSetAdminMessengerOnlineStatus, _handleOpenAdminConversation, _handleCloseAdminConversation, _handleFetchAdminConversations, _handleDeleteAdminConversation, _handleNewMessage }: Props): React.Node => {
    // redux state props //

  React.useEffect(() => {
    let mounted = true;

    if (mounted) {
      setClientSocketIOEventListeners(socket, _dispatch);
      _handleFetchAdminConversations();
    }
    return () => { 
      mounted = false;
      removeClientSocketIOEventListeners(socket);
    };
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
      <Grid.Row centered style={{ height: "10%", padding: 0 }}>
        <ConversationControls 
          adminConversationState={ adminConversationState } 
          handleToggleAdminMessengerOnlineStatus={ _handleToggleAdminMessengerOnlineStatus }
        />
      </Grid.Row>
      <Grid.Row centered style={{ height: "80%" }} className={ styles.messengerIndexRow }>
        <Grid.Column largeScreen={4} tablet={8} className={ styles.conversationsColumn }>
          <ConversationComponent 
            adminConversationState={ adminConversationState } 
            openConversation={ openConversation }
            closeConversation={ closeConversation }
            deleteConversation={ deleteConversation }
          />          
        </Grid.Column>
        <Grid.Column largeScreen={10} tablet={8} className={ styles.messagesColumn }>
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
    _handleToggleAdminMessengerOnlineStatus: ({ messengerOnline }: MessengerOnlineToggleArgs) => handleToggleAdminMessengerOnlineStatus(dispatch, { messengerOnline }),
    _handleSetAdminMessengerOnlineStatus: ({ messengerOnline }: MessengerOnlineToggleArgs) => handleSetAdminMessengerOnlineStatus(dispatch, { messengerOnline }),
    _handleOpenAdminConversation: (conversationId: string, currentAdminConversationState: AdminConversationState) => handleOpenAdminConversation(dispatch, conversationId, currentAdminConversationState),
    _handleCloseAdminConversation: () => handleCloseAdminConversation(dispatch),
    _handleFetchAdminConversations: () => handleFetchAdminConversations(dispatch),
    _handleDeleteAdminConversation: (conversationId: string, currentAdminConversationState: AdminConversationState) => handleDeleteAdminConversation(dispatch, conversationId, currentAdminConversationState),
    _handleNewMessage: (messageData: MessageData, currentAdminConversationState: AdminConversationState) => handleNewMessage(dispatch, messageData, currentAdminConversationState),
    _dispatch: dispatch
  };
};  

export default (connect(mapStateToProps, mapDispatchToProps)(ConversationIndexContainer): React.AbstractComponent<WrapperProps>);