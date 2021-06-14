// @flow //
import * as React from "react";
import { Dropdown, Icon, Menu } from "semantic-ui-react";
// types //
import type { MessageData } from "../../../redux/reducers/conversations/flowTypes";
// css //
import styles from "./css/defaultMessageMenu.module.css";

type Props = {
  messageData: MessageData;
  handleSetDefaultMessage: (messageData: MessageData) => void;
  triggerMessageModelDelete: (messageId: string) => void;
};
export const DefaultMessageMenu = ({ messageData, handleSetDefaultMessage, triggerMessageModelDelete }: Props): React.Node => {

  const setDefaultGreetingMessage = (): void => {
    handleSetDefaultMessage({ ...messageData, messageType: "DefaultGreeting" });
  };
  const setDefaultOfflineMessage = (): void => {
    handleSetDefaultMessage({ ...messageData, messageType: "DefaultOffline" });
  };
  const setDefaultResolvedMessage = (): void => {
    handleSetDefaultMessage({ ...messageData, messageType: "DefaultResolved" });
  };
  // delete trigger //
  const triggerDelete = () => {
    triggerMessageModelDelete(messageData._id);
  }
  return (
    <Menu className={ styles.defaultMessageMenu }>
      <Menu.Item>
        <Dropdown pointing text="Edit" className={ styles.editDropdown }>
          <Dropdown.Menu>
            <Dropdown.Item className={ styles.menuItem }>
              Edit
              <Icon color="blue" name="edit" />
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item className={ styles.menuItem } onClick={ triggerDelete }>
              Delete
              <Icon color="red" name="trash" />
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item  className={ styles.menuItem }>
              <Dropdown pointing="left" text="Set as...">
                <Dropdown.Menu>
                  <Dropdown.Item onClick={ setDefaultGreetingMessage }>
                    Set as default <span className={ styles.menuSubItemSpan }>'greeting'</span> message
                  </Dropdown.Item>
                  <Dropdown.Item onClick={ setDefaultOfflineMessage }>
                    Set as default <span className={ styles.menuSubItemSpan }>'offline'</span> message
                  </Dropdown.Item>
                  <Dropdown.Item onClick={ setDefaultResolvedMessage }>
                    Set as default <span className={ styles.menuSubItemSpan }>'resolved'</span> message
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
      <Menu.Item className={ styles.defaultMessageDescription }>
        <span>Description:</span>
        <span>{ messageData.messageDescription ? messageData.messageDescription : "No description" }</span>
      </Menu.Item>
      {
        messageData.messageType 
        ?
          <Menu.Item className={ styles.defaultMessageTypeDisplay } position="right">
            <span>Set as:</span>
            <span>{ messageData.messageType }</span>
          </Menu.Item>
        :
          null
      }
     
    </Menu>
  );
}