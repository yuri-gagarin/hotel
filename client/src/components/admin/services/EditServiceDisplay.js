import React from "react";
import PropTypes from "prop-types";
import ServiceForm from "./ServiceForm";

const EditServiceDisplay = (props) => {
  const { service, history } = props;
  return (
    <div>
      <hr />
      <h3>Editing {service.serviceType ? service.serviceType : "No Name"}</h3>
        <ServiceForm history={history} />
      <hr />
    </div>
  )
};
// PropTypes validations //
EditServiceDisplay.propTypes = {
  service: PropTypes.object.isRequired
};

export default EditServiceDisplay;