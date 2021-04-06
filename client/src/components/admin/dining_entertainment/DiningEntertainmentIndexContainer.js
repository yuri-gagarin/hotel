// @flow 
import * as React from "react";
import PropTypes from "prop-types";
import { Button, Card, Grid, Header, Icon, Segment } from "semantic-ui-react";
// router imports //
import { withRouter, Route } from "react-router-dom";
// additional imports //
import DiningEntertainmentForm from "./DiningEntertainmentForm";
import DiningEntertainmentDisplay from "./DiningEntertainmentDisplay";
import { DiningEntertainmentCards } from "./DiningEntertainmentCards";
import { EditDiningEntertainmentDisplay } from "./EditDiningEntertainmentDisplay";
import { ConfirmDeleteModal } from "../shared/ConfirmDeleteModal";
import OnlinePopupControls from "../shared/OnlinePopupControls";
// redux imports //
import { connect } from "react-redux"; 
import { handleFetchDiningModels, handleOpenDiningModel, handleDeleteDiningModel, handleClearDiningModelData } from "../../../redux/actions/diningActions";
// types //
import type { Dispatch } from "../../../redux/reducers/_helpers/createReducer";
import type { DiningEntertainmentState, DiningEntModelAction } from "../../../redux/reducers/dining_entertainment/flowTypes";
import type { RouterHistory } from "react-router-dom";
// styles and css //
import styles from "./css/diningEntertainmentIndexContainer.module.css";


export type OwnProps = {
  adminState: any,
  diningEntertainmentState: DiningEntertainmentState
};
export type RouterProps = {
  ...OwnProps,
  history: RouterHistory
};
export type Props = {
  ...RouterProps,
  _handleFetchDiningModels: () => Promise<void>,
  _handleOpenDiningModel: (idToOpen: string, diningEntModelState: DiningEntertainmentState) => void,
  _handleClearDiningModelData: () => void,
  _handleDeleteDiningModel: (modelIdToDelete: string, diningEntModelState: DiningEntertainmentState) => Promise<boolean>
};

type ConfirmDeleteModalState = {
  confirmDelModalOpen: boolean,
  modelIdToDelete: string
}

const DiningEntertainmentIndexContainer = (props : Props): React.Node => {
  const { useEffect, useState } = React;
  const { adminState, diningEntertainmentState, history } = props;
  const { _handleFetchDiningModels, _handleOpenDiningModel, _handleClearDiningModelData, _handleDeleteDiningModel } = props;
  //const [ diningModelInfoOpen, setDiningModelInfoOpen ] = useState(false);
  //const [ newDiningModelFormOpen, setNewDiningModelFormOpen ] = useState(false);
  const { diningEntModelData, createdDiningEntModels } = diningEntertainmentState;

  const [ confirmDeleteModalState, setConfirmDeleteModalState ] = useState<ConfirmDeleteModalState>({ confirmDelModalOpen: false, modelIdToDelete: "" });

  useEffect(() => {
   _handleFetchDiningModels();
  }, []);
  
  const handleTakeAllOnline = () => {
    return Promise.resolve(true);
  };
  const handleTakeAllOffline = () => {
    return Promise.resolve(true);
  };

  const openNewDiningModelForm = () => {
    _handleClearDiningModelData();
    history.push("/admin/dining_entertainment/new");
    // setNewDiningModelFormOpen(true);
    // setDiningModelInfoOpen(false);
  };
  const goBackToDiningModels = () => {
    _handleClearDiningModelData();
    history.push("/admin/dining_entertainment");
    // setNewDiningModelFormOpen(false);
  };
  const openDiningModel = (diningModelId: string) => {
    _handleOpenDiningModel(diningModelId, diningEntertainmentState);
    history.push("/admin/dining_entertainment/edit");
    //setDiningModelInfoOpen(true);
  };

  /* handle model delete actions */
  const triggerDiningModelDelete = (diningModelId) => {
    // setDiningModelInfoOpen(false);
    setConfirmDeleteModalState({ ...confirmDeleteModalState, confirmDelModalOpen: true, modelIdToDelete: diningModelId });
  };
  const confirmModelDelete = () => {
    return _handleDeleteDiningModel(confirmDeleteModalState.modelIdToDelete, diningEntertainmentState)
      .then((success) => {
        if (success) setConfirmDeleteModalState({ ...confirmDeleteModalState, confirmDelModalOpen: false, modelIdToDelete: "" });
      })
  };
  const cancelDeleteAction = () => {
    setConfirmDeleteModalState({ ...confirmDeleteModalState, confirmDelModalOpen: false, modelIdToDelete: "" });
  };

  return (
    <React.Fragment>
      <ConfirmDeleteModal open={ confirmDeleteModalState.confirmDelModalOpen } modelName="dining" confirmAction={ confirmModelDelete } cancelAction={ cancelDeleteAction } />
      <Grid.Row>
        <Grid.Column className={ styles.headerColumn } width={15}>
          <span>Dining and entertainment options editor</span>
        </Grid.Column>
      </Grid.Row>
      <Route path={"/admin/dining_entertainment"} exact={true}>
        <Grid.Row>
          <Grid.Column className={ styles.buttonsColumn } width={15}>
            <OnlinePopupControls 
              handleFormOpen={ openNewDiningModelForm } 
              takeAllOnline={ handleTakeAllOnline }
              takeAllOffline= { handleTakeAllOffline }
              createdModels={ createdDiningEntModels } 
              modelType={"dining_entertainment_model"} 
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column className={ styles.mainViewColumn } width={15}>
            {
              diningEntertainmentState.createdDiningEntModels.length > 0 
              ?
              <DiningEntertainmentCards 
                diningEntState={ diningEntertainmentState }
                openDiningEntModel={ openDiningModel }
                triggerDeleteDiningEntModel={ triggerDiningModelDelete }
              />
              : 
              <Segment placeholder className={ styles.defaultNoItemsSegment }>
                <Header icon>
                  <Icon name='search' />
                  We don't have any documents matching your query.
                </Header>
              </Segment>
            }
          
          </Grid.Column>
        </Grid.Row>
      </Route>
      <Route path={"/admin/dining_entertainment/new"}>
        <Grid.Row>
          <Grid.Column className={ styles.newFormColumn } width={15}>
            <DiningEntertainmentForm diningEntState={ diningEntertainmentState } history={history} />
          </Grid.Column>
        </Grid.Row>
      </Route>
      <Route path={"/admin/dining_entertainment/edit"}>
        <EditDiningEntertainmentDisplay 
          diningEntState={ diningEntertainmentState } 
          history={ history }
          goBackToDiningModels={ goBackToDiningModels }
          triggerModelDelete={ triggerDiningModelDelete }
        />
      </Route>
    </React.Fragment>
  );
};


const mapDispatchToProps = (dispatch: Dispatch<DiningEntModelAction>) => {
  return {
    _handleFetchDiningModels: () => {
      return handleFetchDiningModels(dispatch);
    },
    _handleClearDiningModelData: () => {
      return handleClearDiningModelData(dispatch);
    },
    _handleOpenDiningModel: (modelId: string, diningEntState: DiningEntertainmentState) => {
      return handleOpenDiningModel(dispatch, modelId, diningEntState);
    },
    _handleDeleteDiningModel: (modelId: string, diningEntState: DiningEntertainmentState) => {
      return handleDeleteDiningModel(dispatch, modelId, diningEntState);
    }
  };
};

export default (withRouter((connect(null, mapDispatchToProps)(DiningEntertainmentIndexContainer): React.AbstractComponent<RouterProps>)): React.AbstractComponent<OwnProps>);
