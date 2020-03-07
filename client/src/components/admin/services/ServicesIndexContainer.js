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

const ServicesIndexContainer = (props) => {
  const { 
    history
  } = props;
  const { createdServices } = servicesState;
  const [servicInfoOpen, setServiceInfoOpen] = useState(false);
  const [newServiceFormOpen, setNewServiceFormOpen] = useState(false);

  useEffect(() => {
   // services api call //
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
            <Button onClick={goBackToRooms}>Back</Button>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={14}>
            <RoomForm history={history} />
          </Grid.Column>
        </Grid.Row>
      </Route>
      <Route path={"/admin/services/edit"}>
        <Grid.Row>
          <Grid.Column width={14}>
            <Button onClick={goBackToServices}>Back</Button>
          </Grid.Column>
        </Grid.Row>
        <RoomDisplay room={servicesState.serviceData} history={history} />
      </Route>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {

  };
};
const mapDispatchToProps = (dispatch) => {
  return {
   
  };
};

export default withRouter(connect(null, mapDispatchToProps)(ServicesIndexContainer));
