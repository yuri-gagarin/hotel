import React from "react";
import PropTypes from "prop-types";
import {
  Grid
} from "semantic-ui-react";
import { withRouter } from "react-router-dom";


const ConversationIndexCotainer = (props) => {

  return (
    <Grid.Row>
      <h5>Hello from Conversations</h5>
      <Grid.Column width={4} style={{border: "2px solid red"}}>

      </Grid.Column>
      <Grid.Column width={12} style={{border: "2px solid green"}}>

      </Grid.Column>
    </Grid.Row>
  )
}

export default withRouter(ConversationIndexCotainer);