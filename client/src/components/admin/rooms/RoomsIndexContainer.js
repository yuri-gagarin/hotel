// @flow
import * as React from "react";
import PropTypes from "prop-types";
import { Button, Card, Grid, Icon, Label, Popup } from "semantic-ui-react";
// additional imports //
import APIMessage from "../shared/ApiMessage";
import { GeneralNoModelsSegment } from "../shared/GeneralNoModelsSegment";
import RoomDisplay from "./RoomDisplay";
import RoomForm from "./RoomForm";
import RoomHolder from "./RoomHolder";
// redux imports //
import { connect } from "react-redux"; 
import { handleFetchRooms, handleOpenRoom, handleCreateNewRoom, handleUpdateRoom, handleDeleteRoom, handleClearRoomData, handleToggleRoomOnlineOffline } from "../../../redux/actions/roomActions";
// router imports //
import { withRouter, Route } from "react-router-dom";
// FLOW types //
import type { RoomState, RoomData, ClientRoomFormData } from "../../../redux/reducers/rooms/flowTypes";
import type { RouterHistory } from "react-router-dom";
// styles and css //
import styles from "./css/roomIndexCont.module.css";

type WrapperProps = {
  history: RouterHistory,
  roomState: RoomState
};
type RouterProps = {
  ...WrapperProps,
  history: RouterHistory
};
type Props = {
  ...RouterProps,
  _handleRoomOpen: (roomIdToOpen: string, currentRoomState: RoomState) => void,
  _handleClearRoomData: () => void,
  // api actions //
  _handleFetchRooms: () => Promise<boolean>,
  _handleCreateNewRoom: (clientRoomFormData: ClientRoomFormData) => Promise<boolean>,
  _handleUpdateRoom: (clientRoomFormData: ClientRoomFormData, currentRoomState: RoomState) => Promise<boolean>,
  _handleDeleteRoom: (roomIdToDelete: string, currentRoomState: RoomState) => Promise<boolean>,
  _handleToggleRoomOnlineOffline: (roomToUpdate: RoomData, currentRoomState: RoomState) => Promise<boolean>
};

const RoomsIndexContainer = (props: Props): React.Node => {
  const { history, roomState } = props;
  const { _handleRoomOpen, _handleClearRoomData, _handleFetchRooms, _handleCreateNewRoom, _handleUpdateRoom, _handleDeleteRoom, _handleToggleRoomOnlineOffline } = props;
  const { createdRooms, roomData } = roomState;

  React.useEffect(() => {
    let mounted = true;
    if (mounted) _handleFetchRooms();
    return () => { mounted = false };
  }, []);
  
  const openNewRoomForm = () => {
    _handleClearRoomData();
    history.push("/admin/rooms/new");
  };
  const goBackToRooms = () => {
    _handleClearRoomData();
    history.push("/admin/rooms");
  };
  const handleRoomOnlineStatus = (roomDataToUpdate: RoomData) => {
    _handleToggleRoomOnlineOffline(roomDataToUpdate, roomState);
  };
  const openRoom = (roomId: string) => {
    _handleRoomOpen(roomId, roomState);
    history.push("/admin/rooms/edit");
  };
  const deleteRoom = (roomId: string) => {
    _handleDeleteRoom(roomId, roomState);
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
               <GeneralNoModelsSegment 
                customHeaderMessage="No rooms found"
                customContentMessage="Create new rooms by clicking create button above..."
              />
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
    _handleRoomOpen: (roomIdToOpen: string, currentRoomState: RoomState) => handleOpenRoom(dispatch, roomIdToOpen, currentRoomState),
    _handleClearRoomData: () => handleClearRoomData(dispatch),
    // non crud api actions //
    _handleFetchRooms: () => handleFetchRooms(dispatch),
    // crud api actions //
    _handleCreateNewRoom: (clientRoomFormData: ClientRoomFormData) => handleCreateNewRoom(dispatch, clientRoomFormData),
    _handleUpdateRoom: (clientRoomFormData: ClientRoomFormData, currentRoomState: RoomState) => handleUpdateRoom(dispatch, clientRoomFormData, currentRoomState),
    _handleDeleteRoom: (roomIdToDelete: string, currentRoomState: RoomState) => handleDeleteRoom(dispatch, roomIdToDelete, currentRoomState),
    // online offline toggles //
    _handleToggleRoomOnlineOffline: (roomToUpdate: RoomData, currentRoomState: RoomState) => handleToggleRoomOnlineOffline(dispatch, roomToUpdate, currentRoomState)
  };
};

export default (withRouter((connect(null, mapDispatchToProps)(RoomsIndexContainer): React.AbstractComponent<RouterProps>)): React.AbstractComponent<WrapperProps>);
