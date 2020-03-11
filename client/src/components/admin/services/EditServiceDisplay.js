import React from "react";
import PropTypes from "prop-types";
import ServiceForm from "./RoomForm";

const EditServiceDisplay = (props) => {
  const { service } = props;
  return (
    <div>
      <hr />
      <h3>Editing {service.serviceType ? service.roomType : "No Name"}</h3>
        <ServiceForm />
      <hr />
    </div>
  )
};
// PropTypes validations //
EditServiceDisplay.propTypes = {
  service: PropTypes.object.isRequired
};

export default EditServiceDisplay;