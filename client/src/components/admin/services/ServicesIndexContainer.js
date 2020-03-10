import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { 
  Button,
  Card,
  Grid,
} from "semantic-ui-react";
// additional imports //
// redux imports //
import { connect } from "react-redux"; 
// router imports //
import { withRouter, Route } from "react-router-dom";
import { 
  clearServiceData, fetchServices,
  handleNewService, updateHotelService, deleteService,
} from "./../../../redux/actions/serviceActions";

const ServicesIndexContainer = (props) => {
  const { 
    history,
    serviceState
  } = props;
  const {
    fetchServices, clearServiceData, handleNewService,
    handleServiceUpdate, handleServiceDelete
  } = props;

  const { createdServices } = serviceState;
  const [servicInfoOpen, setServiceInfoOpen] = useState(false);
  const [newServiceFormOpen, setNewServiceFormOpen] = useState(false);

  useEffect(() => {
    // services api call //
    fetchServices();
    console.log("loaded");
  }, []);
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
    history.push("/admin/services/edit");
    setServiceInfoOpen(true);
  };
  const deleteService = (serviceId) => {
    handleServiceDelete(serviceId, createdServices);
    setRoomInfoOpen(false);
  };
  return (
    <React.Fragment>
      <Grid.Row>
        <Grid.Column width={14}>
          <h5>Current additional services displayed Hotel</h5>
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
                  <ServicesHolder
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
          </Grid.Column>
        </Grid.Row>
      </Route>
      <Route path={"/admin/services/edit"}>
        <Grid.Row>
          <Grid.Column width={14}>
            <Button onClick={goBackToServices}>Back</Button>
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
