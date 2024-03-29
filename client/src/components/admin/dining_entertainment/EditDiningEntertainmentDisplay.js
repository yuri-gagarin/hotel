// @flow
import * as React from "react";
// semantic ui react //
import { Grid, Modal } from "semantic-ui-react";
// additonal components //
import DiningEntertainmentForm from "./DiningEntertainmentForm";
import DiningEntertainmentDisplay from "./DiningEntertainmentDisplay";
import EditViewControls from "../shared/EditViewControls";
import ModelDeleteBtn from "../shared/ModelDeleteBtn";
// types //
import type { DiningEntModelData, DiningEntertainmentState } from "../../../redux/reducers/dining_entertainment/flowTypes";
import type { RouterHistory } from "react-router-dom";
// styles and css //
import styles from "./css/editDiningEntertainmentDisplay.module.css";

type Props = {
  diningEntState: DiningEntertainmentState,
  history: RouterHistory,
  goBackToDiningModels: () => void,
  triggerModelDelete: (modelIdToDelete: string) => void,
  toggleOnlineOfflineStatus: (modelData: DiningEntModelData) => Promise<boolean>
};

type LocalState = {
  formModalOpen: boolean,
};

export const EditDiningEntertainmentDisplay = ({ diningEntState, history, goBackToDiningModels, triggerModelDelete, toggleOnlineOfflineStatus } : Props): React.Node => {
  const [ localState, setLocalState ] = React.useState<LocalState>({ formModalOpen: false });
  const { diningEntModelData } = diningEntState;

  const toggleEditModal = () => {
    setLocalState({ formModalOpen: !localState.formModalOpen });
  };

  return (
    <Grid.Row style={{ height: "90%", overflowY: "scroll" }}>
      <Modal open={ localState.formModalOpen } className={ styles.editModal } size="fullscreen">
        <DiningEntertainmentForm 
          toggleEditModal= { toggleEditModal }
          diningEntState={ diningEntState } 
          history={ history } 
        />
      </Modal>
      <Grid.Column className={ styles.editColumn } style={{ marginBottom: "1em" }} width={15} >
        <EditViewControls 
          handleBack={ goBackToDiningModels } 
          handleOpenEditModal={ toggleEditModal }
          model={ diningEntModelData } 
          modelType="dining"
          toggleOnlineOfflineStatus={ toggleOnlineOfflineStatus }
        />
        <ModelDeleteBtn 
          modelName={ "dining" }
          modelId={ diningEntModelData._id }
          handleModelDelete={ triggerModelDelete }
        />
      </Grid.Column>
      <Grid.Column className={ styles.displayColumn } width={15}>
        <DiningEntertainmentDisplay diningEntState={ diningEntState } />
      </Grid.Column>
    </Grid.Row>
     
  )
};
