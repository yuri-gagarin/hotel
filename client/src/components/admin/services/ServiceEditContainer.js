// @flow
import * as React from "react";
// semantic ui react comps //
import { Grid } from "semantic-ui-react";
// additional components //
import EditViewControls from "../shared/EditViewControls";
import ModelDeleteBtn from "../shared/ModelDeleteBtn";
import ServiceDisplay from "./ServiceDisplay";
// flow types //
import type { RouterHistory } from "react-router-dom";
import type { ServiceState, ServiceData } from "../../../redux/reducers/service/flowTypes";
import styles from "./css/serviceEditContainer.module.css";

type Props = {
  history: RouterHistory,
  serviceState: ServiceState,
  triggerDeleteService: (serviceId: string) => void,
  toggleServiceOnlineOffline: (serviceToUpdate: ServiceData) => Promise<boolean>
}
type LocalState = {
  serviceFormOpen: boolean
}
export const ServiceEditContainer = ({ history, serviceState, triggerDeleteService, toggleServiceOnlineOffline }: Props): React.Node => {
  const { serviceData } = serviceState;

  const [ localState, setLocalState ] = React.useState({ serviceFormOpen: false });

  const handleGoBack = () => {
    history.goBack();
  };
  const toggleForm = () => {
    setLocalState({ ...localState, serviceFormOpen: !localState.serviceFormOpen });
  }
  return (
    <Grid.Row>
      <Grid.Column width={15}>
        <div className={ styles.editViewControlsDiv }>
          <EditViewControls handleBack={ handleGoBack } modelType="service" model={ serviceData } toggleOnlineOfflineStatus={ toggleServiceOnlineOffline } />
          <ModelDeleteBtn modelName={"service"} modelId={ serviceData._id} handleModelDelete={ triggerDeleteService } />
        </div>
        <ServiceDisplay formOpen={ localState.serviceFormOpen } service={serviceData} history={history} toggleForm={ toggleForm } />
      </Grid.Column>
    </Grid.Row>
  )
}