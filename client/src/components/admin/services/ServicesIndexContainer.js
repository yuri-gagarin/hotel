import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { 
  Button,
  Card,
  Grid,
} from "semantic-ui-react";
// additional imports //
import ServiceForm from "./ServiceForm";
import ServiceHolder from "./ServiceHolder";
// redux imports //
import { connect } from "react-redux"; 
// router imports //
import { withRouter, Route } from "react-router-dom";
import { 
  clearServiceData, openService, fetchServices,
  handleNewService, updateHotelService, deleteService, se
} from "./../../../redux/actions/serviceActions";

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
    fetchServices();
  }, []);
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
    setRoomInfoOpen(false);
  };
  // END form handlers //
  return (
    <React.Fragment>
      <Grid.Row>
        <Grid.Column width={14}>
          <h5>Current additional services offered by Hotel</h5>
        </Grid.Column>
      </Grid.Row>
      <Route path={"/admin/services"} exact={true}>
        <Grid.Row>
          <Grid.Column width={14}>
            <Button onClick={openNewServiceForm}>Add New Service</Button>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={14}>
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
          <Grid.Column width={14}>
            <Button onClick={goBackToServices}>Back</Button>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={14}>
            <ServiceForm history={history} />
          </Grid.Column>
        </Grid.Row>
      </Route>
      <Route path={"/admin/services/edit"}>
        <Grid.Row>
          <Grid.Column width={14}>
            <Button onClick={goBackToServices}>Back</Button>
            <ServiceForm />
          </Grid.Column>
        </Grid.Row>
      </Route>
    </React.Fragment>
  );
};
// PropTypes validation //

const mapStateToProps = (state) => {
  return {

  };
};
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
