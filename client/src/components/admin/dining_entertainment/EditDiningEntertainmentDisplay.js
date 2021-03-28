// @flow
import * as React from "react";
// semantic ui react //
import { Button, Grid, Modal, Popup } from "semantic-ui-react";
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
  goBackToDiningModels: () => void
};

type LocalState = {
  formModalOpen: boolean,
}
export const EditDiningEntertainmentDisplay = ({ diningEntState, history, goBackToDiningModels } : Props): React.Node => {
  const [ localState, setLocalState ] = React.useState<LocalState>({ formModalOpen: false });
  const { diningEntModelData } = diningEntState;

  const handleTakeOnline = (arg: any) => {
    return Promise.resolve(true);
  };
  const handleTakeOffline = (arg: any) => {
    return Promise.resolve(true);
  };
  const handleModelDelete = (modelId: string) => {
  };
  const handleModelSave = () => {

  };

  const toggleEditModal = () => {
    setLocalState({ ...localState, formModalOpen: !localState.formModalOpen });
  };

  return (
    <Grid.Row>
      <Modal open={ localState.formModalOpen } className={ styles.editModal } size="fullscreen">
        <div className={ styles.modalControlsDiv }>
          <Popup 
            content="Changes will not be saved"
            trigger={
              <Button inverted color="orange" icon="cancel" content="Cancel and Close" onClick={ toggleEditModal } />
            }
          />
          <Button content="Save and Update" icon="save" onClick={ handleModelSave } />
          <ModelDeleteBtn modelId={ diningEntModelData._id } modelName="dining" handleModelDelete={ handleModelDelete } />
        </div>
        <div className={ styles.modalFormDiv}>
          <DiningEntertainmentForm diningEntState={ diningEntState } history={ history } />
        </div>
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
          handleModelDelete={ handleModelDelete }
        />
      </Grid.Column>
      <Grid.Column className={ styles.editColumn } width={15}>
        <DiningEntertainmentDisplay diningEntState={ diningEntState } />
      </Grid.Column>
    </Grid.Row>
     
  )
};
