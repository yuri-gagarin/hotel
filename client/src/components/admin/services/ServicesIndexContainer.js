// @flow
import * as React from "react";
import PropTypes from "prop-types";
import { Button, Card, Grid, Popup } from "semantic-ui-react";
// additional imports //
import ServiceForm from "./ServiceForm";
import ServiceHolder from "./ServiceCard";
import ServiceDisplay from "./ServiceDisplay";
import OnlinePopupControls from "../shared/OnlinePopupControls";
import EditViewControls from "../shared/EditViewControls";
import APIMessage from "../shared/ApiMessage";
import ModelDeleteBtn from "../shared/ModelDeleteBtn";
import ConfirmDeleteModal from "../shared/ConfirmDeleteModal";
// redux imports //
import { connect } from "react-redux"; 
// router imports //
import { withRouter, Route } from "react-router-dom";
import { 
  handleClearServiceData, handleOpenService, handleFetchServices,
  handleDeleteService, handleToggleServiceOnlineOffline, handleToggleAllServicesOnlineStatus
} from "./../../../redux/actions/serviceActions";
// types //
import type { ServiceState, ServiceData, ServiceImgData, ClientServiceFormData, ServiceAction } from "../../../redux/reducers/service/flowTypes";
import type { Dispatch, RootState, GenericModelData } from "../../../redux/reducers/_helpers/createReducer";
import type { RouterHistory } from "react-router-dom";
// style and css //
import styles from "./css/servicesIndexContainer.module.css";
import { ServiceEditContainer } from "./ServiceEditContainer";

type WrapperProps ={|
  serviceState: ServiceState
|}
type OwnProps = {|
  ...WrapperProps,
  history: RouterHistory,
|}
type Props = {
  ...OwnProps,
  _handleClearServiceData: () => void,
  _handleOpenService: (serviceId: string, currentServiceState: ServiceState) => void,
  _handleFetchServices: () => Promise<boolean>,
  _handleDeleteService: (serviceId: string, serviceState: ServiceState) => Promise<boolean>,
  _handleToggleServiceOnlineOffline: (serviceToUpdate: ServiceData, serviceState: ServiceState) => Promise<boolean>,
  _handleToggleAllServicesOnlineStatus: (newStats: boolean) => Promise<boolean>
};

type ConfirmDeleteModalState = {
  confirmModalOpen: boolean,
  serviceIdToDelete: string
};

const ServicesIndexContainer = (props: Props): React.Node => {
  const { history, serviceState } = props;
  const { _handleClearServiceData, _handleOpenService, _handleFetchServices, 
          _handleDeleteService, _handleToggleServiceOnlineOffline, _handleToggleAllServicesOnlineStatus
  } = props;
  const { createdServices, serviceData } : { createdServices: Array<ServiceData>, serviceData: ServiceData } = serviceState;

  const [ confirmDelModalState, setConfirmDelModalState ] = React.useState<ConfirmDeleteModalState>({ confirmModalOpen: false, serviceIdToDelete: "" });

  React.useEffect(() => {
    // services api call //
    let mounted = true;
    if (mounted) _handleFetchServices();
    return () => { mounted = false };
  }, []);
  
  // online/live online - offline api calls //
  const takeAllServicesOnline = () => {
    return _handleToggleAllServicesOnlineStatus(true);
  };
  const takeAllServicesOffline = () => {
    return _handleToggleAllServicesOnlineStatus(false);

  };
  const toggleServiceOnlineOffline = (serviceToUpdate: ServiceData) => {
    return _handleToggleServiceOnlineOffline(serviceToUpdate, serviceState);
  };
  
  // form handlers //
  const openNewServiceForm = () => {
    _handleClearServiceData();
    history.push("/admin/services/new");
  };
  const goBackToServices = () => {
    _handleClearServiceData();
    history.push("/admin/services");
  };
  const openService = (serviceId) => {
    _handleOpenService(serviceId, serviceState);
    history.push("/admin/services/edit");
  };
  
  /* Service model delete actions */
  const triggerDeleteService = (serviceId: string) => {
    setConfirmDelModalState({ confirmModalOpen: true, serviceIdToDelete: serviceId });
  };
  const cancelDeleteAction = () => {
    setConfirmDelModalState({ confirmModalOpen: false, serviceIdToDelete: "" });
  }

  const confirmDeleteAction = () => {
    const { serviceIdToDelete } = confirmDelModalState;
    return _handleDeleteService(serviceIdToDelete, serviceState)
      .then((success) => {
        if (success) setConfirmDelModalState({ confirmModalOpen: false, serviceIdToDelete: "" });
      })
  }
  
  
  // END form handlers //
  return (
    <React.Fragment>
      <APIMessage currentLocalState={ serviceState }/>
      <ConfirmDeleteModal 
        open={ confirmDelModalState.confirmModalOpen } 
        modelName="service" 
        confirmAction={ confirmDeleteAction } 
        cancelAction={ cancelDeleteAction } 
      />
    
      <Grid.Row>
        <Grid.Column width={15} className={ styles.headerCol }>
          <span>Current additional services offered by your hotel</span>
        </Grid.Column>
      </Grid.Row>
      <Route path={"/admin/services"} exact={true}>
        <Grid.Row>
          <Grid.Column width={15} className={ styles.buttonsCol }>
            <OnlinePopupControls 
              modelType="service"
              createdModels={ createdServices }
              handleFormOpen={ openNewServiceForm }
              takeAllOnline={ takeAllServicesOnline } 
              takeAllOffline={ takeAllServicesOffline } 
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={15} className={ styles.mainViewCol }>
            <Card.Group>
            {
              createdServices.map((service) => {
                return ( 
                  <ServiceHolder
                    key={service._id} 
                    service={service}
                    openService={openService}
                    triggerDeleteService={ triggerDeleteService }
                    history={history}
                  />
                );
              })
            }
            </Card.Group>
          </Grid.Column>
        </Grid.Row>
      </Route>
      <Route path={"/admin/services/new"}>
        <Grid.Row>
          <Grid.Column width={15} className={ styles.serviceFormColumn }>
            <ServiceForm history={history} />
          </Grid.Column>
        </Grid.Row>
      </Route>
      <Route path={"/admin/services/edit"}>
        <ServiceEditContainer 
          history={ history }
          serviceState={ serviceState }
          triggerDeleteService={ triggerDeleteService }
          toggleServiceOnlineOffline={ toggleServiceOnlineOffline }
        />
      </Route>
    </React.Fragment>
  );
};
// PropTypes validation //
const mapDispatchToProps = (dispatch: Dispatch<ServiceAction>) => {
  return {
    // non api actions //
    _handleClearServiceData: () => handleClearServiceData(dispatch),
    _handleOpenService: (serviceId: string, currentServiceState: ServiceState) => {
      return handleOpenService(dispatch, serviceId, currentServiceState);
    },
    // non CRUD api actions //
    _handleFetchServices: () => handleFetchServices(dispatch),
    // CRUD api actions //
    _handleDeleteService: (serviceId: string, serviceState: ServiceState) => {
      return handleDeleteService(dispatch, serviceId, serviceState);
    },
    // toglle online offline actions //
    _handleToggleServiceOnlineOffline: (serviceToUpdate: ServiceData, serviceState: ServiceState) => {
      return handleToggleServiceOnlineOffline(dispatch, serviceToUpdate, serviceState);
    },
    _handleToggleAllServicesOnlineStatus: (newStatus: boolean) => {
      return handleToggleAllServicesOnlineStatus(dispatch, newStatus);
    }
  };
};

export default (withRouter((connect(null, mapDispatchToProps)(ServicesIndexContainer):  React.AbstractComponent<OwnProps>)): React.AbstractComponent<WrapperProps>)
