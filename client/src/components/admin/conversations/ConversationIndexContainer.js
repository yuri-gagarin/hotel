// @flow 
import * as React from "react";
import { Button, Grid, Segment } from "semantic-ui-react";
// additional components //
import ApiMessage from "../shared/ApiMessage";
import { ConnectedClientsModal } from "./ConnectedClientsModal";
import ConversationComponent from "./ConversationComponent";
import { ConversationControls } from "./ConversationControls";
import { ConfirmDeleteModal } from "../shared/ConfirmDeleteModal";
import { DefaultMessagesModal } from "./default_messaging/DefaultMessagesModal";
import MessagesView from "./MessagesView";
import { MessageAllModal } from "./MessageAllModal";
import { MessagesSplashScreen } from "./MessageSplashScreen";
// styles imports //
import styles from "./css/conversationIndexContainer.module.css";
// redux imports  //
import { connect } from "react-redux";
import { 
  handleOpenAdminConversation, handleCloseAdminConversation, handleUpdateAdminConversationName, handleToggleAdminMessengerOnlineStatus, handleSetAdminMessengerOnlineStatus, 
  handleFetchAdminConversations, handleArchiveAdminConversation, handleToggleArchivedAdminConversations, handleCreateNewAdminConversation, handleDeleteAdminConversation, handleNewAdminMessage, 
  handleFetchDefaultMessages, handleCreateDefaultMessage, handleUpdateDefaultMessage, handleDeleteDefaultMessage,
  setAdminConversations, handleSetAdminConversationError
} from "../../../redux/actions/adminConversationActions";
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
import { generateEmptyAdminConversationModel } from "../../../redux/reducers/_helpers/emptyDataGenerators";


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
  _handleUpdateAdminConversationName: (newName: string, conversationId: string, currentAdminConversationState: AdminConversationState) => void;
  _handleFetchAdminConversations: () => Promise<boolean>;
  _handleArchiveAdminConversation: (adminConversation: AdminConversationData, currentAdminConvState: AdminConversationState) => Promise<boolean>;
  _handleToggleArchivedAdminConversations: (options: { viewActive?: boolean, viewArchived?: boolean }) => Promise<boolean>;
  _handleCreateNewAdminConversation: (adminConversationData: AdminConversationData) => Promise<boolean>;
  _handleDeleteAdminConversation: (conversationId: string, currentAdminConversationState: AdminConversationState) => Promise<boolean>;
  _handleNewAdminMessage: (messageData: MessageData, currentAdminConversationState: AdminConversationState) => Promise<boolean>;
  // messages defaults actions //
  _handleFetchDefaultMessages: () => Promise<boolean>;
  _handleCreateDefaultMessage: (messageData: MessageData) => Promise<boolean>;
  _handleUpdateDefaultMessage: (messageData: MessageData, adminConvState: AdminConversationState) => Promise<boolean>;
  _handleDeleteDefaultMessage: (messageId: string, adminConvState: AdminConversationState) => Promise<boolean>;
  // error handling and extrass// 
  _setAdminConversationError: (error: any) => Promise<boolean>;
  _dispatch: Dispatch<AdminConversationAction>;
};
const ConversationIndexContainer = ({ 
  history, adminState, adminConversationState, _dispatch,
  _handleToggleAdminMessengerOnlineStatus, _handleSetAdminMessengerOnlineStatus, _handleOpenAdminConversation, _handleCloseAdminConversation, _handleUpdateAdminConversationName,
  _handleFetchDefaultMessages, _handleCreateDefaultMessage, _handleUpdateDefaultMessage, _handleDeleteDefaultMessage, 
  _handleFetchAdminConversations, _handleArchiveAdminConversation, _handleToggleArchivedAdminConversations, _handleCreateNewAdminConversation, _handleDeleteAdminConversation, _handleNewAdminMessage, _setAdminConversationError }: Props): React.Node => {
    // redux state props //
  const [ onlineUsersModalOpen, setOnlineUsersModalOpen ] = React.useState<boolean>(false);
  const [ messageAllModalOpen, setMessageAllModalOpen ] = React.useState<boolean>(false);
  const [ confirmDeleteModalState, setConfirmDeleteModalState ] = React.useState<{ open: boolean, modelToDelete: "message" | "conversation" | "", modelId: string }>({ open: false, modelToDelete: "", modelId: "" });
  const [ defaultMessgesModalState, setDefaultMessagesModalState ] = React.useState<{ open: boolean }>({ open: false });

  React.useEffect(() => {
    let mounted = true;

    if (mounted) {
      setClientSocketIOEventListeners(socket, _dispatch);
      //_handleFetchAdminConversations();
      //const mockConversations = generateMockConversations(5);
      //_dispatch(setAdminConversations({ status: 200, loading: false, viewingArchived: false, responseMsg: "ok", updatedActiveConversation: generateEmptyAdminConversationModel(), updatedLoadedAdminConversations: mockConversations }));
      _handleToggleArchivedAdminConversations({ viewActive: true });
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
  const updateAdminConversationName = ({ newName, conversationId }: { conversationId: string, newName: string }): void => {
    _handleUpdateAdminConversationName(newName, conversationId, adminConversationState);
  };
 
  const toggleModal = () => {
    setOnlineUsersModalOpen(!onlineUsersModalOpen);
  };
  const toggleMessageAllModal = (): void => {
    setMessageAllModalOpen(!messageAllModalOpen);
  }
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
        receiverSocketId: socketId,
        archived: false,
        newConversation: false,
        conversationName: "",
        messages: [],
        newMessages: [],
        createdAt: new Date().toISOString()
      }
      _handleCreateNewAdminConversation(newConversation);
    }
  };

  const handleSendGroupMessage = () => {

  };

  // add a confirmation modal //
  const toggleDeleteConversation = (conversationId: string): void => {
    if (!conversationId) return;
    setConfirmDeleteModalState({ open: true, modelToDelete: "conversation", modelId: conversationId });
  };
  const cancelConversationDelete = (): void => {
    setConfirmDeleteModalState({ open: false, modelToDelete: "", modelId: "" });
  };

  const toggleDeleteDefaultMessageModel = (messageId: string): void => {
    if (!messageId) return;
    setConfirmDeleteModalState({ open: true, modelToDelete: "message", modelId: messageId  });
  }
  const confirmModelDelete = (): Promise<boolean> => {
    const { open, modelToDelete, modelId } = confirmDeleteModalState;
    if (!open || !modelToDelete || !modelId) {
      return Promise.resolve(false);
    } 
    if (modelToDelete === "conversation") {
      return _handleDeleteAdminConversation(modelId, adminConversationState)
        .then((success) => {
          if (success) {
            setConfirmDeleteModalState({ open: false, modelToDelete: "", modelId: "" });
            return Promise.resolve(true);
          } else {
            // handle an error //
            return Promise.resolve(false);
          }
        })
        .catch((error) => {
          _setAdminConversationError(error);
          return Promise.resolve(false);
        });
    } else if (modelToDelete === "message") {
      return _handleDeleteDefaultMessage(modelId, adminConversationState)
        .then((success) => {
          setConfirmDeleteModalState({ open: false, modelToDelete: "", modelId: "" });
          return Promise.resolve(true);
        })
        .catch((error) => {
          _setAdminConversationError(error);
          return Promise.resolve(false);
        });
    } else {
      return Promise.resolve(false);
    }
  };
  // default messages modal //
  const toggleDefaultMessagesModal = (): void => {
    setDefaultMessagesModalState({ ...defaultMessgesModalState, open: !defaultMessgesModalState.open });
  }
  return (
    <React.Fragment>
      <ApiMessage currentLocalState={ adminConversationState } />
      <ConfirmDeleteModal open={ confirmDeleteModalState.open } modelName={ confirmDeleteModalState.modelToDelete } cancelAction={ cancelConversationDelete } confirmAction={ confirmModelDelete } />
      <ConnectedClientsModal 
        modalOpen={ onlineUsersModalOpen }
        toggleModal={ toggleModal }
        handleToggleConversation={ toggleConversation }
        messengerOnline= { adminConversationState.messengerOnline }
        onlineClients={ adminConversationState.connectedOnlineClients }
        activeConversationIds={ adminConversationState.loadedAdminConversations.map((data) => data.conversationId) }
      />
      <MessageAllModal 
        modalOpen={ messageAllModalOpen }
        toggleModal={ toggleMessageAllModal }
        handleSendGroupMessage= { handleSendGroupMessage }
        onlineClients={ adminConversationState.connectedOnlineClients }
      />
      <DefaultMessagesModal 
        modalOpen={ defaultMessgesModalState.open }
        adminConversationState={ adminConversationState }
        toggleDefaultMessagesModal={ toggleDefaultMessagesModal }
        handleFetchDefaultMessages={ _handleFetchDefaultMessages }
        handleCreateDefaultMessage={ _handleCreateDefaultMessage }
        handleUpdateDefaultMessage={ _handleUpdateDefaultMessage }
        triggerMessageModelDelete={ toggleDeleteDefaultMessageModel }
      />
      <Grid.Row className={ styles.conversationControlRow } centered style={{ padding: 0 }} columns={2}>
        <ConversationControls 
          adminConversationState={ adminConversationState } 
          handleToggleAdminMessengerOnlineStatus={ _handleToggleAdminMessengerOnlineStatus }
          handleToggleDeleteConversation={ toggleDeleteConversation }
          openUsersModal={ toggleModal }
          openMessageAllModal={ toggleMessageAllModal }
          closeAdminConversation={ closeConversation }
          handleArchiveConversation={ _handleArchiveAdminConversation }
          handleToggleArchivedAdminConversations={ _handleToggleArchivedAdminConversations }
          handleToggleDeleteAdminConversation={ toggleDeleteConversation }
          toggleDefaultMesagesModal={ toggleDefaultMessagesModal }
        />
      </Grid.Row>
      <Grid.Row stretched centered style={{ padding: 0, height: "80%" }} columns={2} className={ styles.messengerIndexRow }>
        <Grid.Column largeScreen={5} className={ `${styles.conversationsColumn} ${ !objectValuesEmpty(adminConversationState.activeConversation) ? styles.conversationsColumnSlideLeft : ""}` }>
          <ConversationComponent 
            adminConversationState={ adminConversationState } 
            openConversation={ openConversation }
            closeConversation={ closeConversation }
            deleteConversation={ toggleDeleteConversation }
            updateAdminConversationName={ updateAdminConversationName }
          />          
        </Grid.Column>
        <Grid.Column largeScreen={9} className={ styles.messagesColumn }>
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
    _handleUpdateAdminConversationName: (newName: string, conversationId: string, currentAdminConversationState: AdminConversationState) => handleUpdateAdminConversationName(dispatch, newName, conversationId, currentAdminConversationState),
    _handleFetchAdminConversations: () => handleFetchAdminConversations(dispatch),
    _handleToggleArchivedAdminConversations: (options: { viewArchived?: boolean, viewActive?: boolean }) => handleToggleArchivedAdminConversations(dispatch, options),
    _handleArchiveAdminConversation: (adminConversation: AdminConversationData, currentAdminConvState: AdminConversationState) => handleArchiveAdminConversation(dispatch, adminConversation, currentAdminConvState),
    _handleCreateNewAdminConversation: (conversationData: AdminConversationData) => handleCreateNewAdminConversation(dispatch, conversationData),
    _handleDeleteAdminConversation: (conversationId: string, currentAdminConversationState: AdminConversationState) => handleDeleteAdminConversation(dispatch, conversationId, currentAdminConversationState),
    _handleNewAdminMessage: (messageData: MessageData, currentAdminConversationState: AdminConversationState) => handleNewAdminMessage(dispatch, messageData, currentAdminConversationState),
    // default message dispatches //
    _handleFetchDefaultMessages: () => handleFetchDefaultMessages(dispatch),
    _handleCreateDefaultMessage: (messageData: MessageData) => handleCreateDefaultMessage(dispatch, messageData),
    _handleUpdateDefaultMessage: (messageData: MessageData, currentAdminConvState: AdminConversationState) => handleUpdateDefaultMessage(dispatch, messageData, currentAdminConvState),
    _handleDeleteDefaultMessage: (messageId: string, currentAdminConvState: AdminConversationState) => handleDeleteDefaultMessage(dispatch, messageId, currentAdminConvState),
    // error handling, extras //
    _setAdminConversationError: (error: any) => handleSetAdminConversationError(dispatch, error),
    _dispatch: dispatch
  };
};  

export default (connect(mapStateToProps, mapDispatchToProps)(ConversationIndexContainer): React.AbstractComponent<WrapperProps>);