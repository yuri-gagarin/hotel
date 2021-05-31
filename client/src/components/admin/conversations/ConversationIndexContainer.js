// @flow 
import * as React from "react";
import { Button, Grid, Segment } from "semantic-ui-react";
// additional components //
import { ConnectedClientsModal } from "./ConnectedClientsModal";
import ConversationComponent from "./ConversationComponent";
import { ConversationControls } from "./ConversationControls";
import MessagesView from "./MessagesView";
import { MessagesSplashScreen } from "./MessageSplashScreen";
// styles imports //
import { closeConvoButton } from "./styles/style";
import styles from "./css/conversationIndexContainer.module.css";
// redux imports  //
import { connect } from "react-redux";
import { handleOpenAdminConversation, handleCloseAdminConversation, handleToggleAdminMessengerOnlineStatus, handleSetAdminMessengerOnlineStatus, handleFetchAdminConversations, handleCreateNewAdminConversation, handleDeleteAdminConversation, handleNewAdminMessage, setAdminConversations } from "../../../redux/actions/adminConversationActions";
// flow types //
import type { RouterHistory } from "react-router-dom";
import type { RootState, Dispatch } from "../../../redux/reducers/_helpers/createReducer";
import type { AdminConversationAction, AdminConversationState, AdminConversationData, MessengerOnlineToggleArgs } from "../../../redux/reducers/admin_conversations/flowTypes";
import type { MessageData } from "../../../redux/reducers/conversations/flowTypes";
// socket import //
import { socket } from "./../../../App";
// helpers //
import { objectValuesEmpty } from "../../helpers/displayHelpers";
import { setClientSocketIOEventListeners, removeClientSocketIOEventListeners } from "../_helpers/clientSocketIOHelpers";
import { generateMockConversations } from "../../helpers/mockData";


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
  _handleCreateNewAdminConversation: (adminConversationData: AdminConversationData) => Promise<boolean>;
  _handleDeleteAdminConversation: (conversationId: string, currentAdminConversationState: AdminConversationState) => void;
  _handleNewAdminMessage: (messageData: MessageData, currentAdminConversationState: AdminConversationState) => Promise<boolean>;
  _dispatch: Dispatch<AdminConversationAction>;
};
const ConversationIndexContainer = ({ 
  history, adminState, adminConversationState, _dispatch,
  _handleToggleAdminMessengerOnlineStatus, _handleSetAdminMessengerOnlineStatus, _handleOpenAdminConversation, _handleCloseAdminConversation,
  _handleFetchAdminConversations, _handleCreateNewAdminConversation, _handleDeleteAdminConversation, _handleNewAdminMessage }: Props): React.Node => {
    // redux state props //
  const [ onlineUsersModalOpen, setOnlineUsersModalOpen ] = React.useState<boolean>(false);
  React.useEffect(() => {
    let mounted = true;

    if (mounted) {
      setClientSocketIOEventListeners(socket, _dispatch);
      //_handleFetchAdminConversations();
      const mockConversations = generateMockConversations(12);
      _dispatch(setAdminConversations({ status: 200, responseMsg: "ok", adminConversations: mockConversations }))
    }
    return () => { 
      mounted = false;
      removeClientSocketIOEventListeners(socket);
    };
  }, []);

  React.useEffect(() => {
    if(!objectValuesEmpty(adminConversationState.activeConversation) && onlineUsersModalOpen) {
      setOnlineUsersModalOpen(false);
    } 
  }, [ adminConversationState.activeConversation ]);

  const openConversation = (conversationId: string): void => {
    _handleOpenAdminConversation(conversationId, adminConversationState);
  };

  const closeConversation = (): void => {
    _handleCloseAdminConversation();
  };
  // TODO //
  // add a confirmation modal //
  const deleteConversation = (converstionId: string): void => {
    _handleDeleteAdminConversation
  };
  const toggleModal = () => {
    setOnlineUsersModalOpen(!onlineUsersModalOpen);
  };
  const toggleConversation = (socketId: string): void => {
    const conversationId = `CONVERSATION_${socketId}`;
    const existingConversation = adminConversationState.loadedAdminConversations.filter((convData) => convData.conversationId === conversationId);
    if (existingConversation.length === 1) {
      // open existing conversation //
      _handleOpenAdminConversation(conversationId, adminConversationState);
    } else {
      // create a new conversation push to top and open //
      const newConversation: AdminConversationData = {
        conversationId: conversationId,
        receiverSocketId: "",
        archived: false,
        conversationName: "",
        messages: [],
        newMessages: [],
        createdAt: new Date().toISOString()
      }
      _handleCreateNewAdminConversation(newConversation);
    }
  };

  return (
    <React.Fragment>
      <ConnectedClientsModal 
        modalOpen={ onlineUsersModalOpen }
        toggleModal={ toggleModal }
        handleToggleConversation={ toggleConversation }
        onlineClients={ adminConversationState.connectedOnlineClients }
      />
      <Grid.Row centered style={{ height: "10%", padding: 0 }}>
        <ConversationControls 
          adminConversationState={ adminConversationState } 
          handleToggleAdminMessengerOnlineStatus={ _handleToggleAdminMessengerOnlineStatus }
          openUsersModal={ toggleModal }
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
              sendAdminMessage={ _handleNewAdminMessage }
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
    _handleCreateNewAdminConversation: (conversationData: AdminConversationData) => handleCreateNewAdminConversation(dispatch, conversationData),
    _handleDeleteAdminConversation: (conversationId: string, currentAdminConversationState: AdminConversationState) => handleDeleteAdminConversation(dispatch, conversationId, currentAdminConversationState),
    _handleNewAdminMessage: (messageData: MessageData, currentAdminConversationState: AdminConversationState) => handleNewAdminMessage(dispatch, messageData, currentAdminConversationState),
    _dispatch: dispatch
  };
};  

export default (connect(mapStateToProps, mapDispatchToProps)(ConversationIndexContainer): React.AbstractComponent<WrapperProps>);