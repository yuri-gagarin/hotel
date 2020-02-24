import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Button, Grid, Segment
} from "semantic-ui-react";
// additional component imports //
import RoomForm from "./RoomForm";

const RoomDisplay = (props) => {
  const [formOpen, setFormOpen] = useState(false);
  const { room } = props;
  const openForm = () => {
    setFormOpen(!formOpen);
  }
  return (
    <Grid.Column width={12}>
      <Segment>1</Segment>
      {
        formOpen ? <Button onClick={openForm}>Cancel</Button> : <Button onClick={openForm}>Edit Room</Button>
      }
      { formOpen ? <RoomForm room={room} /> : null }
    </Grid.Column>
  );
};

export default RoomDisplay;