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
  triggerModelDelete: (modelIdToDelete: string) => void
};

type LocalState = {
  formModalOpen: boolean,
}
export const EditDiningEntertainmentDisplay = ({ diningEntState, history, goBackToDiningModels, triggerModelDelete } : Props): React.Node => {
  const [ localState, setLocalState ] = React.useState<LocalState>({ formModalOpen: false });
  const { diningEntModelData } = diningEntState;

  const handleTakeOnline = (arg: any) => {
    return Promise.resolve(true);
  };
  const handleTakeOffline = (arg: any) => {
    return Promise.resolve(true);
  };

  const toggleEditModal = () => {
    setLocalState({ ...localState, formModalOpen: !localState.formModalOpen });
  };

  return (
    <Grid.Row>
      <Modal open={ localState.formModalOpen } className={ styles.editModal } size="fullscreen">
        <DiningEntertainmentForm 
          toggleEditModal= { toggleEditModal }
          diningEntState={ diningEntState } 
          history={ history } 
        />
      </Modal>
      <Grid.Column className={ styles.editColumn } style={{ marginBottom: "1em" }} width={15} >
        <EditViewControls 
          handleBack={goBackToDiningModels} 
          handleOpenEditModal={ toggleEditModal }
          model={ diningEntModelData } 
          modelType="dining"
          takeOnline={ handleTakeOnline }
          takeOffline={ handleTakeOffline }
        />
        <ModelDeleteBtn 
          modelName={ "dining" }
          modelId={ diningEntModelData._id }
          handleModelDelete={ triggerModelDelete }
        />
      </Grid.Column>
      <Grid.Column className={ styles.editColumn } width={15}>
        <DiningEntertainmentDisplay diningEntState={ diningEntState } />
      </Grid.Column>
    </Grid.Row>
     
  )
};
