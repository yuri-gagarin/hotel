// @flow 
import * as React from "react";
import { Dropdown, Grid, Menu, Popup } from "semantic-ui-react";
import type { AdminConversationState, MessengerOnlineToggleArgs } from "../../../redux/reducers/admin_conversations/flowTypes";
// styles //
import styles from "./css/conversationControls.module.css";

type Props = {
  adminConversationState: AdminConversationState;
  handleToggleAdminMessengerOnlineStatus: (data: MessengerOnlineToggleArgs) => void;
  openUsersModal: () => void;
}
export const ConversationControls = ({ adminConversationState, handleToggleAdminMessengerOnlineStatus, openUsersModal }: Props): React.Node => {
  const { messengerOnline } = adminConversationState;
  const toggleMessegnerOnlineOffline = () => {
    handleToggleAdminMessengerOnlineStatus({ messengerOnline: !messengerOnline });
  };

  return (
    <React.Fragment>
      <Grid.Column largeScreen={4} tablet={8} style={{ padding: 0 }}>
        <div className={ styles.conversationControlsMenuWrapper }>
          <Menu className={ styles.conversationOptionsMenu }>
            <Menu.Item>
              <Dropdown text="Messenger Options" icon="caret down" pointing>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={ toggleMessegnerOnlineOffline }>
                    { messengerOnline ? "Disconnect" : "Connect" }
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item>
                    Archive Selected
                  </Dropdown.Item>
                  <Dropdown.Item>
                    Delete Selected
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item>
                    Archive All
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item>
                    Message All
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={ openUsersModal }>
                    View All Users
                  </Dropdown.Item>
                  <Dropdown.Item>
                  <Dropdown.Divider />
                    Message User
                  </Dropdown.Item>
                  <Dropdown.Item>
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
                    <div className={ `${styles.conversationOnlineStatus} ${ messengerOnline ? styles.messengerOnline : styles.messengerOffline }` }>

                    </div>
                  }
                />
                <span>{ messengerOnline ? "Online" : "Offline" }</span>
              </div>
            </Menu.Menu>
          </Menu>
        </div>
      </Grid.Column>
      <Grid.Column largeScreen={10} tablet={8} style={{ padding: 0 }}>
        <div className={ styles.conversationDetailsWrapper }>
          <div className={ styles.conversationDetailsDiv }>
            <span>Online clients: </span>
            <span>0</span>
          </div>
          <div className={ styles.conversationDetailsDiv }>
            <span>Active conversations: </span>
            <span>0</span>
          </div>
          <div className={ styles.conversationDetailsDiv }>
            <span>Archived conversations: </span>
            <span>0</span>
          </div>
        </div>
      </Grid.Column>
    </React.Fragment>
  );
};