// @flow //
import * as React from "react";
import { Dropdown, Flag, Icon, Menu } from "semantic-ui-react";
// types //
import type { MessageData } from "../../../../redux/reducers/conversations/flowTypes";
// css //
import styles from "./css/defaultMessageMenu.module.css";
// helpers //
import { getMenuLanguageWithFlag } from "../../_helpers/generalComponentHelpers";
import { splitStringByUppercase } from "../../../helpers/componentHelpers";

type Props = {
  messageData: MessageData;
  handleSetDefaultMessage: (messageData: MessageData) => Promise<boolean>;
  toggleMessageEdit: () => void;
  handleSetDefaultMessageLanguage: (lang: "en" | "ru" | "uk") => void;
  triggerMessageModelDelete: (messageId: string) => void;
};

type LocalState = {
  i18nLnaguage: "en" | "ru" | "uk";
  flagType: "uk" | "ru" | "ua";
  messageLanguage: "English" | "Русский" | "Українська";
}

export const DefaultMessageMenu = ({ messageData, handleSetDefaultMessage, toggleMessageEdit, handleSetDefaultMessageLanguage, triggerMessageModelDelete }: Props): React.Node => {
  const [ localState, setLocalState ] = React.useState<LocalState>({ i18nLnaguage: "en", flagType: "uk", messageLanguage: "English" });
  const setDefaultGreetingMessage = (): void => {
    handleSetDefaultMessage({ ...messageData, messageType: "DefaultGreeting" });
  };
  const setDefaultOfflineMessage = (): void => {
    handleSetDefaultMessage({ ...messageData, messageType: "DefaultOffline" });
  };
  const setDefaultResolvedMessage = (): void => {
    handleSetDefaultMessage({ ...messageData, messageType: "DefaultResolved" });
  };

  const handleSetMessageLanguage = (i18nLnaguage: "en" | "uk" | "ru"): void => {
    const { flagType, messageLanguage } = getMenuLanguageWithFlag(i18nLnaguage);
    setLocalState({ i18nLnaguage, flagType, messageLanguage });
  }
  // delete trigger //
  const triggerDelete = () => {
    triggerMessageModelDelete(messageData._id);
  };

  React.useEffect(() => {
    handleSetDefaultMessageLanguage(localState.i18nLnaguage);
  }, [ localState.i18nLnaguage ]);
  return (
    <Menu className={ styles.defaultMessageMenu }>
      <Menu.Item>
        <Dropdown pointing text="Options" icon="options" className={ styles.editDropdown }>
          <Dropdown.Menu>
            <Dropdown.Item className={ styles.menuItem } onClick={ toggleMessageEdit } >
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
                    Set as default <div className={ styles.menuSubItemSpan }>Greeting <i className="fas fa-bell"></i></div> message
                  </Dropdown.Item>
                  <Dropdown.Item onClick={ setDefaultOfflineMessage }>
                    Set as default <div className={ styles.menuSubItemSpan }>Offline <i className="fas fa-globe"></i></div> message
                  </Dropdown.Item>
                  <Dropdown.Item onClick={ setDefaultResolvedMessage }>
                    Set as default <div className={ styles.menuSubItemSpan }>Resolved <i className="fas fa-check-circle"></i></div> message
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
      <Menu.Item>
        <Dropdown pointing text={ localState.messageLanguage }>
          <Dropdown.Menu>
            <Dropdown.Item className={ styles.menuItem } onClick={ () => handleSetMessageLanguage("en") }>
              EN<Flag name="gb" className={ styles.menuItemFlag } />
            </Dropdown.Item>
            <Dropdown.Item className={ styles.menuItem } onClick={ () => handleSetMessageLanguage("uk") }>
              UA<Flag name="ua" className={ styles.menuItemFlag } />
            </Dropdown.Item>
            <Dropdown.Item className={ styles.menuItem } onClick={ (e) => handleSetMessageLanguage("ru") }>
              RU<Flag name="ru" className={ styles.menuItemFlag } />
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Flag className={ styles.messageLanguageFlag } name={ localState.flagType } />
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
            <span>{ `${splitStringByUppercase(messageData.messageType)} Response` }</span>
          </Menu.Item>
        :
          null
      }
     
    </Menu>
  );
}