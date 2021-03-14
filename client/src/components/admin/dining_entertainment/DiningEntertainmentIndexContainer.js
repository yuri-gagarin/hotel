import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { 
  Button,
  Card,
  Grid,
  Segment,
} from "semantic-ui-react";
// additional imports //
import DiningEntertainmentForm from "./DiningEntertainmentForm";
import DiningEntertainmentDisplay from "./DiningEntertainmentDisplay";
import DiningEntertainmentContainer from "./DiningEntertainmentContainer";
// redux imports //
import { connect } from "react-redux"; 
import { fetchDiningModels, openDiningModel, deleteDiningModel, clearDiningModelData } from "../../../redux/actions/diningActions";
// router imports //
import { withRouter, Route } from "react-router-dom";

const DiningEntertainmentIndexContainer = (props) => {
  const { 
    history,
    fetchDiningModels, 
    handleDiningModelOpen, 
    handleDiningModelDelete, 
    clearDiningModelData, 
    adminState,
    diningState
  } = props;
  const { createdDiningModels } = diningState;
  const [ diningModelInfoOpen, setDiningModelInfoOpen ] = useState(false);
  const [ newDiningModelFormOpen, setNewDiningModelFormOpen ] = useState(false);

  useEffect(() => {
   fetchDiningModels();
  }, []);

  const openNewDiningModelForm = () => {
    clearDiningModelData();
    history.push("/admin/dining_entertainment/new");
    setNewDiningModelFormOpen(true);
    setDiningModelInfoOpen(false);
  };
  const goBackToDiningModels = () => {
    clearDiningModelData();
    history.push("/admin/dining_entertainment");
    setNewDiningModelFormOpen(false);
  };
  const openDiningModel = (diningModelId) => {
    handleDiningModelOpen(createdDiningModels, diningModelId);
    history.push("/admin/dining_entertainment/edit");
    setDiningModelInfoOpen(true);
  };
  const deleteDiningModel = (diningModelId) => {
    handleDiningModelDelete(diningModelId, createdDiningModels);
    setDiningModelInfoOpen(false);
  };

  return (
    <React.Fragment>
      <Grid.Row>
        <Grid.Column width={14}>
          <h5>Current Dining and Entertainment options in Hotel</h5>
        </Grid.Column>
      </Grid.Row>
      <Route path={"/admin/dining_entertainment"} exact={true}>
        <Grid.Row>
          <Grid.Column width={14}>
            <Button onClick={openNewDiningModelForm}>Add New Dining or Entertainment option</Button>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={14}>
            <Card.Group>
            {
              createdDiningModels.map((diningModel) => {
                return ( 
                  <DiningEntertainmentContainer 
                    key={diningModel._id} 
                    diningModel={diningModel}
                    openDiningModel={openDiningModel}
                    deleteDiningModel={deleteDiningModel}
                    history={history}
                  />
                );
              })
            }
            </Card.Group>
          </Grid.Column>
        </Grid.Row>
      </Route>
      <Route path={"/admin/dining_entertainment/new"}>
        <Grid.Row>
          <Grid.Column width={14}>
            <Button onClick={goBackToDiningModels}>Back</Button>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={14}>
            <DiningEntertainmentForm history={history} />
          </Grid.Column>
        </Grid.Row>
      </Route>
      <Route path={"/admin/dining_entertainment/edit"}>
        <Grid.Row>
          <Grid.Column width={14}>
            <Button onClick={goBackToDiningModels}>Back</Button>
          </Grid.Column>
        </Grid.Row>
        <DiningEntertainmentDisplay diningModel={diningState.diningModelData} history={history} />
      </Route>
    </React.Fragment>
  );
};


const mapDispatchToProps = (dispatch) => {
  return {
    fetchDiningModels: () => fetchDiningModels(dispatch),
    clearDiningModelData: () => dispatch(clearDiningModelData()),
    handleDiningModelOpen: (diningModels, diningModelId) => dispatch(openDiningModel(diningModels, diningModelId)),
    handleDiningModelDelete: (diningModelId, currentDiningModels) => deleteDiningModel(dispatch, diningModelId, currentDiningModels)
  };
};

DiningEntertainmentIndexContainer.propTypes = {
  adminState: PropTypes.object.isRequired,
  diningState: PropTypes.object.isRequired
};

export default withRouter(connect(null, mapDispatchToProps)(DiningEntertainmentIndexContainer));
