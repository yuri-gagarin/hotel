import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { 
  Button,
  Card,
  Grid,
  Popup
} from "semantic-ui-react";
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
import { 
  clearServiceData, openService, fetchServices,
  handleNewService, updateHotelService, deleteService
} from "./../../../redux/actions/serviceActions";
// style and css //
import styles from "./css/servicesIndexContainer.module.css";

const ServicesIndexContainer = (props) => {
  const { 
    history,
    serviceState
  } = props;
  const {
    fetchServices, clearServiceData, handleOpenService, handleNewService,
    handleServiceUpdate, handleServiceDelete
  } = props;

  const { createdServices, serviceData } = serviceState;
  const [servicInfoOpen, setServiceInfoOpen] = useState(false);
  const [newServiceFormOpen, setNewServiceFormOpen] = useState(false);

  useEffect(() => {
    // services api call //
    let mounted = true;
    if (mounted) {
      fetchServices();
    }
    return () => mounted = false;
  }, []);
  useEffect(() => {
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
    handleServiceDelete(serviceId, createdServices);
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

const mapDispatchToProps = (dispatch) => {
  return {
   clearServiceData: () => dispatch(clearServiceData()),
   handleOpenService: (createdServices, serviceId) => {
     return dispatch(openService(createdServices, serviceId));
   },
   fetchServices: () => fetchServices(dispatch),
   handleNewService: (serviceData, history) => {
     return handleNewService(dispatch, serviceData, history);
   },
   handleServiceDelete: (serviceId, createdServices) => {
     return deleteService(dispatch, serviceId, createdServices);
   },
   handleServiceUpdate: (serviceData, serviceImages, createdServices) => {
     return updateHotelService(dispatch, serviceData, serviceImages, createdServices);
   }
  };
};

export default withRouter(connect(null, mapDispatchToProps)(ServicesIndexContainer));
