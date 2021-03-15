import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { 
  Button,
  Card,
  Grid,
  Segment,
} from "semantic-ui-react";
// additional imports //
import RoomHolder from "./RoomHolder";
import RoomDisplay from "./RoomDisplay";
import RoomForm from "./RoomForm";
// redux imports //
import { connect } from "react-redux"; 
import { fetchRooms, openRoom, deleteRoom, clearRoomData } from "../../../redux/actions/roomActions";
// router imports //
import { withRouter, Route } from "react-router-dom";
// styles and css //
import styles from "./css/roomIndexCont.module.css";

const RoomsIndexContainer = (props) => {
  const { 
    history,
    fetchRooms, 
    handleRoomOpen, 
    handleRoomDelete, 
    clearRoomData, 
    roomState
  } = props;
  const { createdRooms } = roomState;
  const [roomInfoOpen, setRoomInfoOpen] = useState(false);
  const [newRoomFormOpen, setNewRoomFormOpen] = useState(false);

  useEffect(() => {
   fetchRooms();
  }, []);
  const openNewRoomForm = () => {
    clearRoomData();
    history.push("/admin/rooms/new");
    setNewRoomFormOpen(true);
    setRoomInfoOpen(false);
  };
  const goBackToRooms = () => {
    clearRoomData();
    history.push("/admin/rooms");
    setNewRoomFormOpen(false);
  };
  const openRoom = (roomId) => {
    handleRoomOpen(createdRooms, roomId);
    history.push("/admin/rooms/edit");
    setRoomInfoOpen(true);
  };
  const deleteRoom = (roomId) => {
    handleRoomDelete(roomId, createdRooms);
    setRoomInfoOpen(false);
  };
  return (
    <React.Fragment>
      <Grid.Row>
        <Grid.Column width={15} className={ styles.headerCol }>
          <h5>Current Rooms in Hotel</h5>
        </Grid.Column>
      </Grid.Row>
      <Route path={"/admin/rooms"} exact={true}>
        <Grid.Row>
          <Grid.Column width={15} className={ styles.buttonsCol }>
            <Button color="green" onClick={openNewRoomForm}>Add New Room</Button>
            <Button.Group>
              <Button color="blue">Take all Rooms online</Button>
              <Button color="orange">Take all Rooms offline</Button>
            </Button.Group>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={15} className={ styles.contentCol }>
            <Card.Group>
            {
              createdRooms.map((room) => {
                return ( 
                  <RoomHolder 
                    key={room._id} 
                    room={room}
                    openRoom={openRoom}
                    deleteRoom={deleteRoom}
                    history={history}
                  />
                );
              })
            }
            </Card.Group>
          </Grid.Column>
        </Grid.Row>
      </Route>
      <Route path={"/admin/rooms/new"}>
        <Grid.Row>
          <Grid.Column width={15}>
            <Button onClick={goBackToRooms}>Back</Button>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={15}>
            <RoomForm history={history} />
          </Grid.Column>
        </Grid.Row>
      </Route>
      <Route path={"/admin/rooms/edit"}>
        <Grid.Row>
          <Grid.Column width={15} className={ styles.editColButtons }>
            <Button inverted color="green" onClick={goBackToRooms}>Back</Button>
            <Button.Group>
              <Button color="blue">Take Online</Button>
              <Button color="orange">Take Offline</Button>
            </Button.Group>
          </Grid.Column>
        </Grid.Row>
        <RoomDisplay room={roomState.roomData} history={history} />
      </Route>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {

  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchRooms: () => fetchRooms(dispatch),
    clearRoomData: () => dispatch(clearRoomData()),
    handleRoomOpen: (rooms, roomId) => dispatch(openRoom(rooms, roomId)),
    handleRoomDelete: (roomId, currentRooms) => deleteRoom(dispatch, roomId, currentRooms)
  };
};

export default withRouter(connect(null, mapDispatchToProps)(RoomsIndexContainer));
