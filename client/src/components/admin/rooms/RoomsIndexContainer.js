// @flow
import * as React from "react";
import PropTypes from "prop-types";
import { Button, Card, Grid, Icon, Label, Popup } from "semantic-ui-react";
// additional imports //
import APIMessage from "../shared/ApiMessage";
import { ConfirmDeleteModal } from "../shared/ConfirmDeleteModal";
import EditRoomDisplay from "./EditRoomDisplay";
import { GeneralNoModelsSegment } from "../shared/GeneralNoModelsSegment";
import OnlinePopupControls from "../shared/OnlinePopupControls";
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

type ConfirmDeleteModalState = {
  confirmDelModalOpen: boolean,
  modelIdToDelete: string
};

const RoomsIndexContainer = (props: Props): React.Node => {
  const { history, roomState } = props;
  const { _handleRoomOpen, _handleClearRoomData, _handleFetchRooms, _handleCreateNewRoom, _handleUpdateRoom, _handleDeleteRoom, _handleToggleRoomOnlineOffline } = props;
  const { createdRooms, roomData } = roomState;

  const [ confirmDeleteModalState, setConfirmDeleteModalState ] = React.useState<ConfirmDeleteModalState>({ confirmDelModalOpen: false, modelIdToDelete: "" });


  React.useEffect(() => {
    let mounted = true;
    if (mounted) _handleFetchRooms();
    return () => { mounted = false };
  }, []);
  
  // online offline handlers //
  const handleTakeAllOnline = () => {
    return Promise.resolve(true);
  };
  const handleTakeAllOffline = () => {
    return Promise.resolve(true);
  };
  const toggleRoomOnlineOfflineStatus = (roomToUpdate: RoomData) => {
    return _handleToggleRoomOnlineOffline(roomToUpdate, roomState);
  }


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

  const triggerRoomDelete = (modelIdToDelete: string) => {
    setConfirmDeleteModalState({ confirmDelModalOpen: true, modelIdToDelete: modelIdToDelete });
  };
  const confirmRoomDelete = () => {
    const { confirmDelModalOpen, modelIdToDelete } = confirmDeleteModalState;
    if (confirmDelModalOpen && modelIdToDelete) {
      return _handleDeleteRoom(modelIdToDelete, roomState)
        .then((success) => { 
          if (success) {
            setConfirmDeleteModalState({ confirmDelModalOpen: false, modelIdToDelete: "" })
          };
      });
    } else {
      return Promise.resolve();
    }
  };
  const cancelDeleteAction =() => {

  };

  return (
    <React.Fragment>
      <APIMessage currentLocalState={ roomState } />
      <ConfirmDeleteModal open={ confirmDeleteModalState.confirmDelModalOpen } modelName="room" confirmAction={confirmRoomDelete } cancelAction={ cancelDeleteAction } />
      <Route path={"/admin/rooms"} exact={true}>
        <Grid.Row centered style={{ height: "10%" }}>
          <Grid.Column style={{ paddingLeft: 0 }} width={15} className={ styles.buttonsCol }>
            <OnlinePopupControls 
             handleFormOpen={ openNewRoomForm } 
             takeAllOnline={ handleTakeAllOnline }
             takeAllOffline= { handleTakeAllOffline }
             createdModels={ createdRooms } 
             modelType={ "room" } 
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row centered style={{ overflowY: "scroll", height: "80%"}}>
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
        <Grid.Row centered style={{ height: "90%", border: "6px solid green", overflowY: "scroll" }}>
          <Grid.Column className={ styles.newFormColumn } width={15}>
            <RoomForm history={ history } roomState={ roomState } />
          </Grid.Column>
        </Grid.Row>
      </Route>
      <Route path={"/admin/rooms/edit"}>
        <EditRoomDisplay
          history={ history }
          roomState={ roomState }
          goBackToRoomsIndex={ goBackToRooms }
          triggerModelDelete= { triggerRoomDelete }
          toggleOnlineOfflineStatus= {toggleRoomOnlineOfflineStatus }
        />
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
