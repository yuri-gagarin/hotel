import React from "react";
import PropTypes from "prop-types";
import DiningEntertainmentForm from "./DiningEntertainmentForm";

const EditDiningEntertainmentDisplay = (props) => {
  const { diningModel, history } = props;
  return (
    <div>
      <hr />
      <h3>Editing {diningModel.title ? diningModel.title : "No Name"}</h3>
        <DiningEntertainmentForm history={history} />
      <hr />
    </div>
  )
};
// PropTypes validations //
EditDiningEntertainmentDisplay.propTypes = {
  diningModel: PropTypes.object.isRequired
};

export default EditDiningEntertainmentDisplay;