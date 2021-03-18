// @flow
import * as React from "react";
import PropTypes from "prop-types";
import { Button, Card, Grid, Popup } from "semantic-ui-react";
// additional imports //
import ServiceForm from "./ServiceForm";
import ServiceHolder from "./ServiceHolder";
import ServiceDisplay from "./ServiceDisplay";
import OnlinePopupControls from "../shared/OnlinePopupControls";
import EditViewControls from "../shared/EditViewControls";
// redux imports //
import { connect } from "react-redux"; 
// router imports //
import { withRouter, Route } from "react-router-dom";
import type { RouterHistory } from "react-router-dom";
import { 
  clearServiceData, openService, fetchServices,
  handleNewService, updateHotelService, deleteService
} from "./../../../redux/actions/serviceActions";
import type { ServiceState, ServiceData, ServiceImgData, ClientServiceFormData } from "../../../redux/reducers/service/flowTypes";
import type { Dispatch, RootState } from "../../../redux/reducers/_helpers/createReducer";
// style and css //
import styles from "./css/servicesIndexContainer.module.css";

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
  handleServiceDelete: (serviceId: string, serviceState: ServiceState) => Promise<boolean>
};

const ServicesIndexContainer = (props: Props) => {
  const { 
    history,
    serviceState
  } = props;
  const {
    fetchServices, clearServiceData, handleOpenService, handleServiceDelete
  } = props;

  const { createdServices, serviceData } = serviceState;
  const [servicInfoOpen, setServiceInfoOpen] = React.useState(false);
  const [newServiceFormOpen, setNewServiceFormOpen] = React.useState(false);

  React.useEffect(() => {
    // services api call //
    let mounted = true;
    if (mounted) {
      fetchServices();
    }
    return () => { mounted = false };
  }, []);
  React.useEffect(() => {
    console.log(48);
    console.log(serviceData);
  }, [ serviceData ]);
  // online/live online - offline api calls //
  const takeAllServicesOnline = () => {

  };
  const takeAllServicesOffline = () => {
    
  };
  const takeServiceOnline = () => {

  };
  const takeServiceOffline = () => {

  };
  // form handlers //
  const openNewServiceForm = () => {
    clearServiceData();
    history.push("/admin/services/new");
    setNewServiceFormOpen(true);
    setServiceInfoOpen(false);
  };
  const goBackToServices = () => {
    clearServiceData();
    history.push("/admin/services");
    setNewServiceFormOpen(false);
  };
  const openService = (serviceId) => {
    handleOpenService(createdServices, serviceId);
    history.push("/admin/services/edit");
    setServiceInfoOpen(true);
  };
  const deleteService = (serviceId) => {
    handleServiceDelete(serviceId, serviceState);
    setServiceInfoOpen(false);
  };
  // END form handlers //
  return (
    <React.Fragment>
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
              handleFormOpen={ openNewServiceForm }
              createdModelsLength={ createdServices.length } 
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
                    deleteService={deleteService}
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
        <Grid.Row>
          <Grid.Column width={15}>
            <div className={ styles.indexViewControlsDiv }>
              <EditViewControls handleBack={ goBackToServices } modelType="service" model={ serviceData } takeOnline={ takeServiceOnline } takeOffline={ takeServiceOffline } />

            </div>
            <ServiceDisplay  service={serviceData} history={history} />
          </Grid.Column>
        </Grid.Row>
      </Route>
    </React.Fragment>
  );
};
// PropTypes validation //
const mapStateToProps = (state: RootState) => {
  return {

  }
}
const mapDispatchToProps = (dispatch: Dispatch) => {
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
    }
  };
};
type ComponentType = typeof ServicesIndexContainer;

export default (withRouter((connect<Props, OwnProps, _, _, _, _>(mapStateToProps, mapDispatchToProps)(ServicesIndexContainer):  React.AbstractComponent<OwnProps>)): React.AbstractComponent<WrapperProps>)
