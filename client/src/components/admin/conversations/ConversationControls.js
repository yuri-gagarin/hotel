// @flow 
import * as React from "react";
import { Checkbox, Dropdown, Grid, Menu, Popup } from "semantic-ui-react";
import type { AdminConversationState, AdminConversationData, MessengerOnlineToggleArgs } from "../../../redux/reducers/admin_conversations/flowTypes";
// styles //
import styles from "./css/conversationControls.module.css";
// helpers //
import {  objectValuesEmpty } from "../../helpers/displayHelpers";

type Props = {
  adminConversationState: AdminConversationState;
  handleToggleAdminMessengerOnlineStatus: (data: MessengerOnlineToggleArgs) => void;
  handleToggleDeleteConversation: (conversationId: string) => void;
  handleArchiveConversation: (conversationData: AdminConversationData, currentAdminConvState: AdminConversationState) => Promise<boolean>;
  handleToggleArchivedAdminConversations: (data: { viewArchived?: boolean, viewActive?: boolean }) => Promise<boolean>;
  openUsersModal: () => void;
  openMessageAllModal: () => void;
}
export const ConversationControls = ({ adminConversationState, handleToggleAdminMessengerOnlineStatus, handleToggleDeleteConversation, handleArchiveConversation, handleToggleArchivedAdminConversations, openUsersModal, openMessageAllModal }: Props): React.Node => {
  const { messengerOnline, viewingArchived, connectedOnlineClients, activeConversation, loadedAdminConversations } = adminConversationState;
  const { archived, conversationName, conversationId } = activeConversation;

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

  return (
    <React.Fragment>
      <Grid.Column largeScreen={5} style={{ padding: 0, height: "100%" }}>
        <div className={ styles.conversationControlsUpperWrapper }>
          <Menu className={ styles.conversationOptionsMenu }>
            <Menu.Item>
              <Dropdown text="Messenger Options" icon="caret down" pointing>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={ toggleMessegnerOnlineOffline }>
                    { messengerOnline ? "Disconnect" : "Connect" }
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={ toggleArchiveAdminConversation }>
                    Archive Selected
                  </Dropdown.Item>
                  <Dropdown.Item onClick={ toggleDeleteConversation }>
                    Delete Selected
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item>
                    Archive All
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={ toggleArchivedAdminConversations }>
                    { viewingArchived ? "View Active" : "View Archived" }
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={ openUsersModal }>
                    View All Users
                  </Dropdown.Item>
                  <Dropdown.Item onClick={ openMessageAllModal }>
                    Message All Users
                  </Dropdown.Item>
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
      <Grid.Column largeScreen={9} style={{ padding: 0, height: "100%" }}>
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
              <div className={ `${styles.conversationDetail} ${styles.activeConversationName}` }>
                <span>Conversation name:</span><span>{ conversationName ? conversationName : "Anonymous" }</span>
              </div>
              <div className={ `${styles.conversationDetail} ${styles.activeConversationArchiveControls}` }>
                <span>{ archived ? "Conversation is Archived" : "Conversation is Active" }</span>
                <button>Archive</button>
                <button>Delete</button>
              </div>
              <div className={ `${styles.conversationDetail} ${styles.activeConversationCloseControls}` }>
                <button>Close</button>
              </div>
            </div>
          </div>
        </div>
      </Grid.Column>
    </React.Fragment>
  );
};