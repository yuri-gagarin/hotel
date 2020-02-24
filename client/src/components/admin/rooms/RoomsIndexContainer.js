import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { 
  Button,
  Grid,
  Segment,
} from "semantic-ui-react";
// additional imports //
import RoomHolder from "./RoomHolder";
import RoomDisplay from "./RoomDisplay";

const RoomsIndexContainer = (props) => {
  const [formOpen, setFormOpen] = useState(true);

  return (
    <React.Fragment>
      <Grid.Row>
        <Grid.Column width={16}>
          <h5>Current Rooms in Hotel</h5>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={16}>
          <Button>Add New Room</Button>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={5}>
          <RoomHolder />
        </Grid.Column>
        <Grid.Column width={11}> 
          <RoomDisplay />
        </Grid.Column>
      </Grid.Row>
    </React.Fragment>
  );
};

export default RoomsIndexContainer;
