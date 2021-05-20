// @flow 
import * as React from "react";
import { Grid } from "semantic-ui-react";

export const MessagesSplashScreen = (): React.Node => {
  return (
    <Grid.Column width={11}>
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
    </Grid.Column>
  );
};