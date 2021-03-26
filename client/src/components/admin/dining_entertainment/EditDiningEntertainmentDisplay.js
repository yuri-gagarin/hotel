// @flow
import * as React from "react";
import DiningEntertainmentForm from "./DiningEntertainmentForm";
// types //
import type { DiningEntModelData, DiningEntertainmentState } from "../../../redux/reducers/dining_entertainment/flowTypes";
import type { RouterHistory } from "react-router-dom";

type Props = {
  diningEntState: DiningEntertainmentState,
  history: RouterHistory
};

const EditDiningEntertainmentDisplay = ({ diningEntState, history } : Props): React.Node => {
  const { diningEntModelData } = diningEntState;
  return (
    <div>
      <hr />
      <h3>Editing { diningEntModelData.title ?  diningEntModelData.title : "No Name"}</h3>
        <DiningEntertainmentForm history={history} diningEntState={ diningEntState } />
      <hr />
    </div>
  )
};

export default EditDiningEntertainmentDisplay;