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
import RoomForm from "./RoomForm";
// redux imports //
import { connect } from "react-redux"; 
import { fetchRooms } from "../../../redux/actions/roomActions";


const RoomsIndexContainer = (props) => {
  const { fetchRooms, adminRoomState } = props;
  const { createdRooms } = adminRoomState;
  console.log(createdRooms.length);
  const [newRoomFormOpen, setNewRoomFormOpen] = useState(false);
  useEffect(() => {
   fetchRooms();
  }, []);
  const openNewRoomForm = () => {
    setNewRoomFormOpen(true);
  };
  const closeNewRoomForm = () => {
    setNewRoomFormOpen(false);
  }
  if (!newRoomFormOpen) {
    return (
      <React.Fragment>
        <Grid.Row>
          <Grid.Column width={16}>
            <h5>Current Rooms in Hotel</h5>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <Button onClick={openNewRoomForm}>Add New Room</Button>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={5}>
            {
              createdRooms.map((room) => <RoomHolder key={room._id} room={room}/>)
            }
          </Grid.Column>
          <Grid.Column width={11}> 
            <RoomDisplay />
          </Grid.Column>
        </Grid.Row>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Grid.Row>
          <Grid.Column width={16}>
            <h5>Create a New Room</h5>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <Button onClick={closeNewRoomForm}>Cancel</Button>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={1}>
          </Grid.Column>
          <Grid.Column width={14}>
            <RoomForm />
          </Grid.Column>
          <Grid.Column width={1}>
          </Grid.Column>
        </Grid.Row>
      </React.Fragment>
    );
  } 
};

const mapStateToProps = (state) => {
  return {
    adminRoomState: state.adminRoomState
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchRooms: () => fetchRooms(dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomsIndexContainer);
