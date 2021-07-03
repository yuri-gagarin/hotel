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
  messageContentLanguage: "en" | "uk" | "ru";
  handleClearMessageStatus: (messageId: string) => void;
};
type DefaultCardState = {
  messageLanguage: "en" | "uk" | "ru";
}
export const ConfiguredDefaultCard = ({ messageHeaderLabel, messageId, messageContent, handleClearMessageStatus }: Props): React.Node => {
  const [ defaultCardState, setDefaultCardState ] = React.useState<DefaultCardState>({ messageLanguage: "en" });

  const setDefaultMessageLanguage = (messageLanguage: "en" | "uk" | "ru") => {
    const flagName = getCountryFlag(messageLanguage);
    setDefaultCardState({ ...defaultCardState, messageLanguage });
  }

  return (
    <div className={ styles.configuredDefaultWrapper }>
      <div className={ styles.configuredDefaultHeader }>
        <div>Default<span>{ messageHeaderLabel }</span>message</div>
        <Dropdown className={ styles.msgLanguageDropdown } text="Language" inline pointing>
          <Dropdown.Menu>
            <Dropdown.Item onClick={ () => setDefaultMessageLanguage("en") }>EN <Flag name="uk" /></Dropdown.Item>
            <Dropdown.Item onClick={ () => setDefaultMessageLanguage("uk") }>UA <Flag name="ua" /></Dropdown.Item>
            <Dropdown.Item onClick={ () => setDefaultMessageLanguage("ru") }>RU <Flag name="ru" /></Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Flag name={ getCountryFlag(defaultCardState.messageLanguage) } />
      </div>
      <div className={ styles.configuredDefaultContent }>
        <div className={ styles.configuredDefaultMsg }>{ setStringTranslation(messageContent, defaultCardState.messageLanguage) }</div>
      </div>
      <div className={ styles.configuredDefaultControls }>
        <div className={ styles.clearMessageStatusDiv }>
          <button onClick={ handleClearMessageStatus }>Clear</button>
        </div>
      </div>
    </div>
  );
};