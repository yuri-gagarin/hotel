// @flow 
import * as React from "react";
import { Dropdown, Flag } from "semantic-ui-react";
// styles and css //
import styles from "./css/configuredDefaultCard.module.css";
// helpers //
import { setStringTranslation } from "../../../helpers/displayHelpers";
import { getCountryFlag } from "../../_helpers/generalComponentHelpers";

type Props = {
  messageHeaderLabel: "Online" | "Offline" | "Resolved";
  messageId: string;
  messageContent: string;
  handleClearDefaultMessage: (messageId: string) => void;
};
type DefaultCardState = {
  languageDisplay: "English" | "Русский" | "Українська";
  messageLanguage: "en" | "uk" | "ru";
  defaultCardDescription: string;
}
export const ConfiguredDefaultCard = ({ messageHeaderLabel, messageId, messageContent, handleClearDefaultMessage }: Props): React.Node => {
  const [ defaultCardState, setDefaultCardState ] = React.useState<DefaultCardState>({ languageDisplay: "English", messageLanguage: "en", defaultCardDescription: "" });

  const setDefaultMessageLanguage = (messageLanguage: "en" | "uk" | "ru") => {
    switch (messageLanguage) {
      case "en": {
        setDefaultCardState({ ...defaultCardState, languageDisplay: "English", messageLanguage });
        break;
      }
      case "ru": {
        setDefaultCardState({ ...defaultCardState, languageDisplay: "Русский", messageLanguage });
        break;
      }
      case "uk": {
        setDefaultCardState({ ...defaultCardState, languageDisplay: "Українська", messageLanguage });
        break;
      }
      default: {
        setDefaultCardState({ ...defaultCardState, languageDisplay: "English", messageLanguage });
      }
    }
  };

  React.useEffect(() => {
    if (messageHeaderLabel === "Online") {
      setDefaultCardState({ ...defaultCardState, defaultCardDescription: "This is the message which will be sent to a new guest upon entering your hotel site and at least one of your admins is online..." });
    } else if (messageHeaderLabel === "Offline") {
      setDefaultCardState({ ...defaultCardState, defaultCardDescription: "This is the message which will be sent to a new guest upon entering your hotel site and at no admins are online..." });
    } else if (messageHeaderLabel === "Resolved") {
      setDefaultCardState({ ...defaultCardState, defaultCardDescription: "This is the message which will automatically be sent to a guest when admin marks converstion resolved..." });
    } else {
      setDefaultCardState({ ...defaultCardState, defaultCardDescription: "Could not reslove model..." });
    }
  }, [ messageHeaderLabel ]);

  return (
    <div className={ styles.configuredDefaultWrapper }>
      <div className={ styles.configuredDefaultHeader }>
        <div>Default<span>{ messageHeaderLabel }</span>message response</div>
        <Dropdown className={ styles.msgLanguageDropdown } disabled={ messageId ? false : true } text={ defaultCardState.languageDisplay } inline pointing>
          <Dropdown.Menu>
            <Dropdown.Item onClick={ () => setDefaultMessageLanguage("en") }>EN <Flag name="uk" /></Dropdown.Item>
            <Dropdown.Item onClick={ () => setDefaultMessageLanguage("uk") }>UA <Flag name="ua" /></Dropdown.Item>
            <Dropdown.Item onClick={ () => setDefaultMessageLanguage("ru") }>RU <Flag name="ru" /></Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Flag name={ getCountryFlag(defaultCardState.messageLanguage) } />
        <div className={ styles.configuredDefaultDesc }>{ defaultCardState.defaultCardDescription }</div>
      </div>
      <div className={ styles.configuredDefaultContent }>
        <div className={ `${styles.configuredDefaultMsg} ${messageId ? styles.configuredPresentDefaultMsg : styles.configuredNoDefaultMsg}` }>{ setStringTranslation(messageContent, defaultCardState.messageLanguage) }</div>
      </div>
      {
        messageId 
        ? 
        <div className={ styles.configuredDefaultControls }>
          <div className={ styles.clearMessageStatusDiv }>
            <button onClick={ () => handleClearDefaultMessage(messageId) }>Clear</button>
          </div>
        </div>
        : 
        null
      }
      
    </div>
  );
};