// @flow
import * as React from "react";
import PropTypes from "prop-types";
// semantic ui react imports //
import { Button, Icon, Label, Popup } from "semantic-ui-react";
// types //
import type { ServiceData } from "../../../redux/reducers/service/flowTypes";
// css //
import styles from "./css/editViewControls.module.css";
// helpers //
import { capitalizeString } from "../../helpers/displayHelpers";

type Props =  {
  handleBack: () => void,
  modelType: "room" | "service" | "dining",
  model: ServiceData,
  takeOnline: (modelData: ServiceData ) => Promise<boolean | void>,
  takeOffline: (modelData: ServiceData ) => Promise<boolean | void> 
}

const EditViewControls = ({ handleBack, modelType, model, takeOnline, takeOffline } : Props): React.Node => {
  const { live } = model;

  const handleOnlineClick = () => {
    takeOnline(model)
  }
  const handleOfflineClick = () => {
    takeOffline(model);
  }
  return (
    <React.Fragment>
      <Button inverted color="blue" onClick={ handleBack }>Back</Button>
      <Button.Group>
        <Popup 
          content={`Current <${capitalizeString(modelType)}> will be displayed to clients`}
          trigger={
            <Button color="blue" disabled={ live } onClick={ handleOnlineClick }>Take Online</Button>
          }
        />
        <Popup 
          content={`Current <${capitalizeString(modelType)}> will NOT be displayed to clients`}
          trigger={
            <Button color="orange" disabled={ !live } onClick={ handleOfflineClick }>Take Offline</Button>
          }
        />  
        <Popup 
        content={ live ? `${capitalizeString(modelType)} is online` : `${capitalizeString(modelType)} is offline` }
        trigger={
          <Label color={ live ? "green" : "red" } className={ styles.onlineLabel }>
            {
              live ? <Icon name="check circle" size="large"/> : <Icon name="ban" size="large" />
            }
          </Label>
        }
      />
      </Button.Group>
    </React.Fragment>
  );
};

EditViewControls.propTypes = {
  handleBack: PropTypes.func.isRequired,
  modelType: PropTypes.string.isRequired,
  model: PropTypes.object.isRequired,
  takeOnline: PropTypes.func.isRequired,
  takOffline: PropTypes.func.isRequired
};

export default EditViewControls;