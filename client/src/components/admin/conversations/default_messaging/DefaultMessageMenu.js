// @flow //
import * as React from "react";
import { Dropdown, Flag, Icon, Menu } from "semantic-ui-react";
// types //
import type { MessageData } from "../../../../redux/reducers/conversations/flowTypes";
// css //
import styles from "./css/defaultMessageMenu.module.css";

type Props = {
  messageData: MessageData;
  handleSetDefaultMessage: (messageData: MessageData) => Promise<boolean>;
  handleSetDefaultMessageLanguage: (e: any, messageLangauge: ("en" | "uk" | "ru")) => void;
  toggleMessageEdit: () => void;
  triggerMessageModelDelete: (messageId: string) => void;
};
export const DefaultMessageMenu = ({ messageData, handleSetDefaultMessage, handleSetDefaultMessageLanguage, toggleMessageEdit, triggerMessageModelDelete }: Props): React.Node => {

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
        <Dropdown pointing text="Options" icon="options" className={ styles.editDropdown }>
          <Dropdown.Menu>
            <Dropdown.Item style={{ padding: 0, border: "2px solid blue" }} className={ styles.menuItem } onClick={ toggleMessageEdit } >
              Edit
              <Icon className={ styles.optionsIcon } color="blue" name="edit" />
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item className={ styles.menuItem } onClick={ triggerDelete }>
              Delete
              <Icon className={ styles.optionsIcon } color="red" name="trash" />
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
      <Menu.Item>
        <Dropdown pointing text="Language" icon="flag">
          <Dropdown.Menu>
            <Dropdown.Item className={ styles.menuItem } onClick={ (e) => handleSetDefaultMessageLanguage(e, "en") }>
              EN<Flag name="gb" className={ styles.menuItemFlag } />
            </Dropdown.Item>
            <Dropdown.Item className={ styles.menuItem } onClick={ (e) => handleSetDefaultMessageLanguage(e, "uk") }>
              UA<Flag name="ua" className={ styles.menuItemFlag } />
            </Dropdown.Item>
            <Dropdown.Item className={ styles.menuItem } onClick={ (e) => handleSetDefaultMessageLanguage(e, "ru") }>
              RU<Flag name="ru" className={ styles.menuItemFlag } />
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