import React from "react";
import PropTypes from "prop-types";
// semantic ui react imports //
import {
  Button, Icon, Label, Popup
} from "semantic-ui-react";
// css //
import styles from "./css/editViewControls.module.css";
// helpers //
import { capitalizeString } from "../../helpers/displayHelpers";

const EditViewControls = ({ handleBack, modelType, model, takeOnline, takeOffline }) => {
  const { live = false } = model ? model : false;
  return (
    <React.Fragment>
      <Button inverted color="blue" onClick={ handleBack }>Back</Button>
      <Button.Group>
        <Popup 
          content={`Current <${capitalizeString(modelType)}> will be displayed to clients`}
          trigger={
            <Button color="blue" disabled={ live } onClick={ takeOnline }>Take Online</Button>
          }
        />
        <Popup 
          content={`Current <${capitalizeString(modelType)}> will NOT be displayed to clients`}
          trigger={
            <Button color="orange" disabled={ !live } onClick={ takeOffline }>Take Offline</Button>
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