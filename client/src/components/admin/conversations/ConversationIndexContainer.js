import React from "react";
import PropTypes from "prop-types";
import {
  Grid, Input
} from "semantic-ui-react";
import { withRouter } from "react-router-dom";
// additional components //
import ConversationComponent from "./ConversationComponent";

const ConversationIndexCotainer = (props) => {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      // handle messages submission here //
    }
  }
  return (
    <React.Fragment>
      <Grid.Row>
        <Grid.Column width={16}>
          <h5>Conversations</h5>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={4} style={{border: "2px solid red", height: "100vh", paddingLeft: "0.5em"}}>
          <ConversationComponent />
        </Grid.Column>
        <Grid.Column width={12} style={{border: "2px solid green", height: "100vh"}}>
          <Input 
            action='Send' 
            placeholder='message...' 
            style={{position: "absolute", bottom: 0, left: 0, right: 0}}
            onKeyPress={handleKeyPress}
            />
        </Grid.Column>
      </Grid.Row>
    </React.Fragment>
  );
};

export default withRouter(ConversationIndexCotainer);