// @flow
import * as React from "react";
// semantic ui react //
import { Grid, Modal } from "semantic-ui-react";
// additional components //
import ServiceForm from "./ServiceForm";
import ServiceDisplay from "./ServiceDisplay";
import EditViewControls from "../shared/EditViewControls";
import ModelDeleteBtn from "../shared/ModelDeleteBtn";
// type imports //
import type { RouterHistory } from "react-router-dom";
import type { ServiceState, ServiceData } from "../../../redux/reducers/service/flowTypes";
// css imports //
import styles from "./css/editServiceDisplay.module.css";

type Props = {
  serviceState: ServiceState,
  history: RouterHistory,
  goBackToServices: () => void,
  triggerModelDelete: (modelIdToDelete: string) => void,
  toggleOnlineOfflineStatus: (modelToUpdate: ServiceData) => Promise<boolean>
};  

type LocalState = {
  formModalOpen: boolean
};

const EditServiceDisplay = ({ serviceState, history, goBackToServices, triggerModelDelete, toggleOnlineOfflineStatus } : Props): React.Node => {
  const [ localState, setLocalState ] = React.useState<LocalState>({ formModalOpen: false });
  const { serviceData } = serviceState;

  const toggleEditModal = () => {
    setLocalState({ formModalOpen: !localState.formModalOpen });
  };

  return (
    <Grid.Row>
      <Modal open={ true } className={ styles.editModal } size="fullscreen" >
        <ServiceForm 
          toggleEditModal={ toggleEditModal }
          serviceState={ serviceState }
          history={ history }
        />
      </Modal>
      <Grid.Column className={ styles.editColumn } style={{ marginBottom: "1em" }} width={15} >
        <EditViewControls 
          handleBack={ goBackToServices } 
          handleOpenEditModal={ toggleEditModal }
          model={ serviceData } 
          modelType="service"
          toggleOnlineOfflineStatus={ toggleOnlineOfflineStatus }
        />
        <ModelDeleteBtn 
          modelName={ "dining" }
          modelId={ serviceData._id }
          handleModelDelete={ triggerModelDelete }
        />
      </Grid.Column>
      <Grid.Column className={ styles.displayColumn } width={15}>
        <ServiceDisplay serviceState={ serviceState } />
      </Grid.Column>
      
    </Grid.Row>
  )
};


export default EditServiceDisplay;