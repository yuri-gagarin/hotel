// @flow
import * as React from "react";
// semantic react //
import { Grid, Modal } from "semantic-ui-react";
// additional components //
import EditViewControls from "../shared/EditViewControls";
import ModelDeleteBtn  from "../shared/ModelDeleteBtn";
import RoomDisplay from "./RoomDisplay";
import RoomForm from "./RoomForm";
// types //
import type { RoomState, RoomData } from "../../../redux/reducers/rooms/flowTypes";
import type { RouterHistory } from "react-router-dom";
// styles and css //
import styles from "./css/editRoomDisplay.module.css";

type Props = {
  roomState: RoomState,
  history: RouterHistory,
  goBackToRoomsIndex: () => void,
  triggerModelDelete: (modelIdToDelete: string) => void,
  toggleOnlineOfflineStatus: (modelData: RoomData) => Promise<boolean>
};

type LocalState = {|
  formModalOpen: boolean,
|};

const EditRoomDisplay = ({ roomState, history, goBackToRoomsIndex, triggerModelDelete, toggleOnlineOfflineStatus }: Props): React.Node => {
  const [ localState, setLocalState ] = React.useState<LocalState>({ formModalOpen: false });
  const { roomData } = roomState;

  const toggleEditModal = () => {
    setLocalState({ formModalOpen: !localState.formModalOpen });
  };

  return (
    <Grid.Row style={{ height: "90%", overflowY: "scroll" }}>
      <Modal open={ localState.formModalOpen } className={ styles.editModal } size="fullscreen">
        <RoomForm 
          toggleEditModal= { toggleEditModal }
          roomState={ roomState } 
          history={ history } 
        />
      </Modal>
      <Grid.Column className={ styles.editColumn } style={{ marginBottom: "1em" }} width={15} >
        <EditViewControls 
          handleBack={ goBackToRoomsIndex } 
          handleOpenEditModal={ toggleEditModal }
          model={ roomData } 
          modelType="room"
          toggleOnlineOfflineStatus={ toggleOnlineOfflineStatus }
        />
        <ModelDeleteBtn 
          modelName={ "room" }
          modelId={ roomData._id }
          handleModelDelete={ triggerModelDelete }
        />
      </Grid.Column>
      <Grid.Column className={ styles.displayColumn } width={15}>
        <RoomDisplay 
          roomState= { roomState }
        />
      </Grid.Column>
    </Grid.Row>
  )
};

export default EditRoomDisplay;