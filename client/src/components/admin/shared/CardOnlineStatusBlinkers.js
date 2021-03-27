// @flow
import * as React from "react";
import { Popup } from "semantic-ui-react";
import styles from "./css/cardOnlineStatusBlinkers.module.css";

export const CardOnlineStatusBlinkers = ({ live } : { live : boolean }): React.Node => {
  return (
    <div className={ styles.cardOnlineStatusWrapper } >
      <Popup 
        content={ live ? "Online and visible to clients" : "Offline and invisible to clients" }
        trigger={
          <div className={ `${styles.cardOnlineBlinker} ${ live ? styles.modelOnline : styles.modelOffline }` }></div>
        }
      />
      <span className={ styles.cardOnlineStatusText }>
        { live ? "Online" : "Offline" }
      </span>
    </div>
  );
};
