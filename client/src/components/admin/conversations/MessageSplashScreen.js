// @flow 
import * as React from "react";
import styles from "./css/messagesSplashScreen.module.css";

export const MessagesSplashScreen = (): React.Node => {
  return (
    <div className={ styles.messagesSplashScreenWrapper }>
      <div className="messageArea">
        <div className="messageAreaTitle">
          <h1>Hotel Instant Messaging</h1>
          <p>Open a message to access a conversation</p>
        </div>
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
         </ul>
      </div>
    </div>
  );
};