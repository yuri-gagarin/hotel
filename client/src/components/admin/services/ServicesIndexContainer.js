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
  clearServiceData, openService, fetchServices,
  handleNewService, updateHotelService, deleteService, takeServiceOnline, takeServiceOffline, toggleAllServicesOnlineStatus
} from "./../../../redux/actions/serviceActions";
// types //
import type { ServiceState, ServiceData, ServiceImgData, ClientServiceFormData, ServiceAction } from "../../../redux/reducers/service/flowTypes";
import type { Dispatch, RootState } from "../../../redux/reducers/_helpers/createReducer";
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
  fetchServices: () => Promise<boolean>,
  clearServiceData: () => void,
  handleOpenService: (createdServices: Array<ServiceData>, serviceId: string) => void,
  handleServiceDelete: (serviceId: string, serviceState: ServiceState) => Promise<boolean>,
  takeServiceOnline: (serviceToActivate: ServiceData, serviceState: ServiceState) => Promise<boolean>,
  takeServiceOffline: (serviceToDeactivate: ServiceData, serviceState: ServiceState) => Promise<boolean>,
  toggleAllServicesOnlineStatus: (newStats: boolean) => Promise<boolean>
};

type LocalState = {
  serviceInfoOpen: boolean,
  serviceFormOpen: boolean,
  confirmModalOpen: boolean,
  serviceIdToDelete: string
};

const ServicesIndexContainer = (props: Props): React.Node => {
  const { history, serviceState } = props;
  const {
    fetchServices, clearServiceData, handleOpenService, handleServiceDelete, 
    takeServiceOnline, takeServiceOffline, toggleAllServicesOnlineStatus
  } = props;
  const { createdServices, serviceData } : { createdServices: Array<ServiceData>, serviceData: ServiceData } = serviceState;

  const [ localState, setLocalState ] = React.useState<LocalState>({ 
    serviceInfoOpen: false, serviceFormOpen: false, confirmModalOpen: false, serviceIdToDelete: ""
  });

  React.useEffect(() => {
    // services api call //
    let mounted = true;
    if (mounted) {
      fetchServices();
    }
    return () => { mounted = false };
  }, []);
  
  // online/live online - offline api calls //
  const takeAllServicesOnline = () => {
    return toggleAllServicesOnlineStatus(true);
  };
  const takeAllServicesOffline = () => {
    return toggleAllServicesOnlineStatus(false);

  };
  const handleTakeServiceOnline = (service: ServiceData) => {
    return takeServiceOnline(service, serviceState);
  };
  const handleTakeServiceOffline = (serviceToDeactivate: ServiceData) => {
    return takeServiceOffline(serviceToDeactivate, serviceState);
  };
  const toggleForm = () => {
    return setLocalState({ ...localState, serviceFormOpen: !localState.serviceFormOpen });
  }
  // form handlers //
  const openNewServiceForm = () => {
    clearServiceData();
    history.push("/admin/services/new");
    setLocalState({ ...localState, newServiceFormOpen: true, serviceInfoOpen: false });
  };
  const goBackToServices = () => {
    clearServiceData();
    history.push("/admin/services");
    setLocalState({ ...localState, newServiceFormOpen: false });
  };
  const openService = (serviceId) => {
    handleOpenService(createdServices, serviceId);
    history.push("/admin/services/edit");
    setLocalState({ ...localState, serviceInfoOpen: true });
  };
  
  const confirmDeleteAction = () => {
    const { serviceIdToDelete, serviceInfoOpen } = localState;
    setLocalState({ ...localState, confirmModalOpen: false });
    return handleServiceDelete(serviceIdToDelete, serviceState)
      .then(() => {
        if (serviceInfoOpen) {
          setLocalState({ ...localState, serviceInfoOpen: false, serviceIdToDelete: "" });
        } else {
          setLocalState({ ...localState, serviceIdToDelete: "" });
        }
      })
  }
  const cancelDeleteAction = () => {
    setLocalState({ ...localState, confirmModalOpen: false, serviceIdToDelete: "" });
  }
  const triggerDeleteService = (serviceId: string) => {
    setLocalState({ ...localState, confirmModalOpen: true, serviceIdToDelete: serviceId });
  };
  // END form handlers //
  return (
    <React.Fragment>
      <APIMessage currentLocalState={ serviceState }/>
      <ConfirmDeleteModal 
        open={ localState.confirmModalOpen } 
        modelName="service" 
        confirmAction={ confirmDeleteAction } 
        cancelAction={ cancelDeleteAction } 
      />
    
      <Grid.Row>
        <Grid.Column width={15} className={ styles.headerCol }>
          <h5>Current additional services offered by your hotel</h5>
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
          <Grid.Column width={15} className={ styles.indexViewControlsDiv } >
            <Popup 
              content="Content will NOT be saved"
              trigger= {
                <Button color="orange" onClick={goBackToServices}>Back</Button>
              }
            />
          </Grid.Column>
        </Grid.Row>
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
          handleTakeServiceOnline={ handleTakeServiceOnline }
          handleTakeServiceOffline={ handleTakeServiceOffline }
          triggerDeleteService={ triggerDeleteService }
        />
      </Route>
    </React.Fragment>
  );
};
// PropTypes validation //
const mapStateToProps = (state: RootState) => {
  return {

  }
}
const mapDispatchToProps = (dispatch: Dispatch<ServiceAction>) => {
  return {
    clearServiceData: () => dispatch(clearServiceData()),
    handleOpenService: (createdServices: Array<ServiceData>, serviceId: string) => {
      return dispatch(openService(createdServices, serviceId));
    },
    fetchServices: () => fetchServices(dispatch),
    /*
    handleNewService: (serviceData, history) => {
      return handleNewService(dispatch, serviceData, history);
    },
    */
    handleServiceDelete: (serviceId: string, serviceState: ServiceState) => {
      return deleteService(dispatch, serviceId, serviceState);
    },
    takeServiceOnline: (serviceToActivate: ServiceData, serviceState: ServiceState) => {
      return takeServiceOnline(dispatch, serviceToActivate, serviceState);
    },
    takeServiceOffline: (serviceToDeactivate: ServiceData, serviceState: ServiceState) => {
      return takeServiceOffline(dispatch, serviceToDeactivate, serviceState);
    },
    toggleAllServicesOnlineStatus: (newStatus: boolean) => {
      return toggleAllServicesOnlineStatus(dispatch, newStatus);
    }
  };
};

export default (withRouter((connect(mapStateToProps, mapDispatchToProps)(ServicesIndexContainer):  React.AbstractComponent<OwnProps>)): React.AbstractComponent<WrapperProps>)
