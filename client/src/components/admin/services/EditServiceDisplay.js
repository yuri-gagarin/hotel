// @flow
import * as React from "react";
import ServiceForm from "./ServiceForm";
// 
import type { RouterHistory } from "react-router-dom";
import type { ServiceData } from "../../../redux/reducers/service/flowTypes";

const EditServiceDisplay = ({ service, history } : { service: ServiceData, history: RouterHistory }): React.Node => {
  return (
    <div>
      <hr />
      <h3>Editing {service.serviceType ? service.serviceType : "No Name"}</h3>
        <ServiceForm history={history} />
      <hr />
    </div>
  )
};


export default EditServiceDisplay;