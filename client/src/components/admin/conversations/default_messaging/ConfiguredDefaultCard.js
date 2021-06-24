// @flow 
import * as React from "react";
// styles and css //
import styles from "./css/configuredDefaultCard.module.css";
// helpers //
import { setStringTranslation } from "../../../helpers/displayHelpers";

type Props = {
  messageHeaderLabel: "Online" | "Offline" | "Resolved";
  messageId: string;
  messageContent: string;
  handleClearMessageStatus: (messageId: string) => void;
};

export const ConfiguredDefaultCard = ({ messageHeaderLabel, messageId, messageContent, handleClearMessageStatus }: Props): React.Node => {

  return (
    <div className={ styles.configuredDefaultWrapper }>
      <div className={ styles.configuredDefaultHeader }>
        <span>Default<span>{ messageHeaderLabel }</span>message</span>
      </div>
      <div className={ styles.configuredDefaultContent }>
        <div className={ styles.configuredDefaultMsg }>{ setStringTranslation(messageContent, "en") }</div>
      </div>
      <div className={ styles.configuredDefaultControls }>
        <div className={ styles.clearMessageStatusDiv }>
          <button onClick={ handleClearMessageStatus }>Clear</button>
        </div>
      </div>
    </div>
  );
};