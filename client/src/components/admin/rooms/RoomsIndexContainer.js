import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { 
  Button,
  Card,
  Grid,
  Icon,
  Label,
  Popup
} from "semantic-ui-react";
// additional imports //
import RoomHolder from "./RoomHolder";
import RoomDisplay from "./RoomDisplay";
import RoomForm from "./RoomForm";
import APIMessage from "../shared/ApiMessage";
// redux imports //
import { connect } from "react-redux"; 
import { fetchRooms, openRoom, deleteRoom, clearRoomData, onlineRoomStatusAPIRequest } from "../../../redux/actions/roomActions";
// router imports //
import { withRouter, Route } from "react-router-dom";
// styles and css //
import styles from "./css/roomIndexCont.module.css";
import DefaultDisplay from "./DefaultDisplay";

const RoomsIndexContainer = (props) => {
  const { 
    history,
    fetchRooms, 
    onlineRoomStatusAPIRequest,
    handleRoomOpen, 
    handleRoomDelete, 
    clearRoomData, 
    roomState
  } = props;
  const { createdRooms, roomData } = roomState;
  const [ roomInfoOpen, setRoomInfoOpen ] = useState(false);
  const [ newRoomFormOpen, setNewRoomFormOpen ] = useState(false);

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
  const handleRoomOnlineStatus = () => {
    onlineRoomStatusAPIRequest(roomData, createdRooms);
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
      <APIMessage currentLocalState={ roomState } />
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
              <Popup 
                content="All saved rooms will be displayed to clients"
                trigger={
                  <Button color="blue" content="Take all Rooms online" disabled={ createdRooms.length === 0} />
                }
              />
              <Popup 
                content="No rooms will be displayed to clients. This does not erase any data."
                trigger={
                  <Button color="orange" content="Take all Rooms offline" disabled={ createdRooms.length === 0} />
                }
              />
            </Button.Group>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row style={{ height: "100%" }}>
          <Grid.Column width={15} className={ styles.contentCol }>
            {
              createdRooms.length > 0 
              ?
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
              :
               <DefaultDisplay />
            }
            
          </Grid.Column>
        </Grid.Row>
      </Route>
      <Route path={"/admin/rooms/new"}>
        <Grid.Row>
          <Grid.Column width={15}>
            <Popup 
              content="Go back. Changes will NOT be saved"
              trigger={
                <Button basic onClick={goBackToRooms} color="orange">Back</Button>
              } 
            />
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
              <Popup 
                content="Current room will be displayed to clients"
                trigger={
                  <Button color="blue" disabled={ roomData.live } onClick={ handleRoomOnlineStatus }>Take Online</Button>
                }
              />
              <Popup 
                content="Current room will NOT be displayed to clients"
                trigger={
                  <Button color="orange" disabled={ !roomData.live } onClick={ handleRoomOnlineStatus }>Take Offline</Button>
                }
              />  
              <Popup 
              content={ roomData.live ? "Room is online" : "Room is offline" }
              trigger={
                <Label color={ roomData.live ? "green" : "red" } className={ styles.roomOnlineLabel }>
                  {
                    roomData.live? <Icon name="check circle" size="large"/> : <Icon name="ban" size="large" />
                  }
                </Label>
              }
            />
            </Button.Group>
            
          </Grid.Column>
        </Grid.Row>
        <RoomDisplay room={roomState.roomData} history={history} />
      </Route>
    </React.Fragment>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRooms: () => fetchRooms(dispatch),
    clearRoomData: () => dispatch(clearRoomData()),
    onlineRoomStatusAPIRequest: (roomData, currentRooms) => onlineRoomStatusAPIRequest(dispatch, roomData, currentRooms),
    handleRoomOpen: (rooms, roomId) => dispatch(openRoom(rooms, roomId)),
    handleRoomDelete: (roomId, currentRooms) => deleteRoom(dispatch, roomId, currentRooms)
  };
};

export default withRouter(connect(null, mapDispatchToProps)(RoomsIndexContainer));
