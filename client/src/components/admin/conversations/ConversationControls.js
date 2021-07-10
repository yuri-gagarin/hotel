// @flow 
import * as React from "react";
import { Checkbox, Dropdown, Grid, Icon, Menu, Popup } from "semantic-ui-react";
import type { AdminConversationState, AdminConversationData, MessengerOnlineToggleArgs } from "../../../redux/reducers/admin_conversations/flowTypes";
// styles //
import styles from "./css/conversationControls.module.css";
// helpers //
import {  objectValuesEmpty } from "../../helpers/displayHelpers";

const conversationClientActive = (adminConversationState: AdminConversationState): boolean => {
  const [ clientOnline, setClientOnline ] = React.useState<boolean>(false);
  const { activeConversation, connectedOnlineClients } = adminConversationState;
  React.useEffect(() => {
    const { receiverSocketId } = activeConversation;
    const clientOnline: boolean = connectedOnlineClients.map((data) => data.socketId).includes(receiverSocketId);
    // 
    setClientOnline(clientOnline);
  }, [ activeConversation, connectedOnlineClients ]);
  return clientOnline;
};  

type Props = {
  adminConversationState: AdminConversationState;
  handleToggleAdminMessengerOnlineStatus: (data: MessengerOnlineToggleArgs) => void;
  handleToggleDeleteConversation: (conversationId: string) => void;
  handleArchiveConversation: (conversationData: AdminConversationData, currentAdminConvState: AdminConversationState) => Promise<boolean>;
  handleToggleArchivedAdminConversations: (data: { viewArchived?: boolean, viewActive?: boolean }) => Promise<boolean>;
  handleToggleDeleteAdminConversation: (conversationId: string) => void;
  closeAdminConversation: () => void;
  openUsersModal: () => void;
  openMessageAllModal: () => void;
  toggleDefaultMesagesModal: () => void;
}
export const ConversationControls = ({ adminConversationState, handleToggleAdminMessengerOnlineStatus, handleToggleDeleteConversation, handleArchiveConversation, handleToggleArchivedAdminConversations, closeAdminConversation, openUsersModal, openMessageAllModal, handleToggleDeleteAdminConversation, toggleDefaultMesagesModal }: Props): React.Node => {
  const { messengerOnline, viewingArchived, connectedOnlineClients, activeConversation, loadedAdminConversations } = adminConversationState;
  const { archived, conversationName, conversationId } = activeConversation;
  const conversationActive = conversationClientActive(adminConversationState);

  const toggleMessegnerOnlineOffline = () => {
    handleToggleAdminMessengerOnlineStatus({ messengerOnline: !messengerOnline });
  };
  const toggleDeleteConversation = (): void => {
    handleToggleDeleteConversation(conversationId);
  };
  const toggleArchiveAdminConversation = (): void => {
    if (objectValuesEmpty(activeConversation)) return;
    handleArchiveConversation(activeConversation, adminConversationState);
  };
  const toggleArchivedAdminConversations = (): void => {
    if (viewingArchived) {
      // toggle active conversations //
      handleToggleArchivedAdminConversations({ viewActive: true });
    } else {
      // fetch and toggle archived conversations //
      handleToggleArchivedAdminConversations({ viewArchived: true });
    }
  };
  const toggleDeleteAdminConversation = (): void => {
    handleToggleDeleteAdminConversation(conversationId);
  };

  return (
    <React.Fragment>
      <Grid.Column className={ styles.messengerControlsCol } largeScreen={5} style={{ padding: 0, height: "100%" }}>
        <div className={ styles.conversationControlsUpperWrapper }>
          <Menu className={ styles.conversationOptionsMenu }>
            <Menu.Item>
              <Icon name="options" />
              <Dropdown text="Options" icon="caret down" pointing>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={ toggleMessegnerOnlineOffline } className={ styles.dropdownItem }>
                    { messengerOnline ? "Disconnect" : "Connect" }<i className={`fas fa-globe ${styles.dropdownIcon} ${messengerOnline ? styles.globeDisconnect: styles.globeConnect }`}></i>
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={ toggleArchiveAdminConversation } className={ styles.dropdownItem }>Archive Selected<i className={`fas fa-archive ${styles.dropdownIcon}`}></i></Dropdown.Item>
                  <Dropdown.Item onClick={ toggleDeleteConversation } className={ styles.dropdownItem }>Delete Selected <i className={`fas fa-trash ${styles.dropdownIcon} ${styles.dropdownTrashIcon}`}></i></Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={ toggleDefaultMesagesModal } className={ styles.dropdownItem }>Configure defaults<i className={`fas fa-cogs ${styles.dropdownIcon}`}></i></Dropdown.Item>
                  <Dropdown.Divider />
                  {
                    viewingArchived 
                    ?
                    <Dropdown.Item className={ styles.dropdownItem }>Unarchive All<i className={`fas fa-trash-restore ${styles.dropdownIcon}`}></i></Dropdown.Item>
                    :
                    <Dropdown.Item className={ styles.dropdownItem }>Archive All<i className={`fas fa-folder ${styles.dropdownIcon}`}></i></Dropdown.Item>
                  }          
                  <Dropdown.Divider />
                  {
                    viewingArchived
                    ?
                    <Dropdown.Item onClick={ toggleArchivedAdminConversations } className={ styles.dropdownItem }>View Active<i className={`fas fa-inbox ${styles.dropdownIcon}`}></i></Dropdown.Item>
                    :
                    <Dropdown.Item onClick={ toggleArchivedAdminConversations } className={ styles.dropdownItem }>View Archived<i className={`fas fa-inbox ${styles.dropdownIcon}`}></i></Dropdown.Item>
                  }
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={ openUsersModal } className={ styles.dropdownItem }>View All Users<i className={`fas fa-users ${styles.dropdownIcon}`}></i></Dropdown.Item>
                  <Dropdown.Item onClick={ openMessageAllModal } className={ styles.dropdownItem }>Message All Users<i className={`fas fa-comment-dots ${styles.dropdownIcon}`}></i></Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Item>
            <Menu.Menu position="right" className={ styles.rightMenu }>
              <div className={ styles.messengerStatusDisplay }>
                <Popup 
                  content={`${ messengerOnline ? "Your instant messenger is online" : "Your instant messenger is offline"}`}
                  position="top center"
                  trigger={
                    <div className={ `${styles.conversationOnlineStatus} ${ messengerOnline ? styles.messengerOnline : styles.messengerOffline } ${ messengerOnline ? styles.onlineBlink : "" }` }>
                    </div>
                  }
                />
                <span>{ messengerOnline ? "Online" : "Offline" }</span>
              </div>
            </Menu.Menu>
          </Menu>
        </div>
        <div className={ styles.conversationControlsLowerWrapper }>
          <div>{ viewingArchived ? "Archived Conversations" : "Active Conversations"}</div>
        </div>
      </Grid.Column>
      <Grid.Column className={ styles.messengerDetailsCol } largeScreen={9} style={{ padding: 0, height: "100%" }}>
        <div className={ styles.conversationDetailsWrapper }>
          <div className={ `${styles.conversationDetailsUpper} `}>
            <div className={ styles.conversationDetailsDiv }>
              <span>Online clients: </span>
              <span>{ connectedOnlineClients.length }</span>
            </div>
            <div className={ styles.conversationDetailsDiv }>
              <span>Active conversations: </span>
              <span>{ loadedAdminConversations.length }</span>
            </div>
            <div className={ styles.conversationDetailsDiv }>
              <span>Archived conversations: </span>
              <span>0</span>
            </div>
          </div>
          <div className={ `${styles.conversationDetailsLower} ${!objectValuesEmpty(activeConversation) ? styles.conversationDetailsLowerActive : ""}` }>
            <div className={ `${styles.activeConversationControls}` }>
              <div className={ `${styles.conversationControlsDiv} ${styles.activeConversationArchiveControls}` }>
                <span>{ conversationActive ? "Conversation is Active" : "Conversation is Inactive"  }
                  <div className={ `${styles.conversationActiveBlinker} ${conversationActive ? styles.active : styles.inactive}` }></div>
                </span>
                <button onClick={ toggleArchiveAdminConversation }>Archive <i className="fas fa-archive"></i></button>
                <button onClick={ toggleDeleteAdminConversation }>Delete <i className="fas fa-trash-alt"></i></button>
              </div>
              <div className={ `${styles.conversationControlsDiv} ${styles.activeConversationCloseControls}` }>
                <button onClick={ closeAdminConversation }>Close <i className="fas fa-times"></i></button>
              </div>
            </div>
          </div>
        </div>
      </Grid.Column>
    </React.Fragment>
  );
};