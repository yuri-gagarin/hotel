import React from "react";
import PropTypes from "prop-types";
import { 
  Grid,
  Segment,
} from "semantic-ui-react";

const RoomsIndexContainer = (props) => {
  return (
    <React.Fragment>
      <Grid.Row>
        <Grid.Column width={16}>
          <h5>Current Rooms in Hotel</h5>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={4}>
          <Segment style={{height: "100px", width: "300px"}}>1</Segment>
        </Grid.Column>
        <Grid.Column width={12}>
          <Segment>1</Segment>
          <Segment>2</Segment>
        </Grid.Column>
      </Grid.Row>
    </React.Fragment>
  );
};

export default RoomsIndexContainer;
