import React from "react";
import PropTypes from "prop-types";
// semantic ui react imports //
import {
  Button, Popup
} from "semantic-ui-react";
// helpers //
import { capitalizeString } from "../../helpers/displayHelpers";

const EditViewControls = ({ handleBack, modelType, model, takeOnline, takeOffline }) => {
  const { live = false } = model.live;
  return (
    <React.Fragment>
      <Popup 
        content={ `Changes will NOT be saved` }
        trigger={
          <Button color="orange" onClick={ handleBack }>{ `Go Back` }</Button>
        }
      />
      <Button.Group>
        <Popup 
          content={`Saved hotel <${capitalizeString(modelType)}> will be displayed to visiting clients`}
          trigger={
            <Button color="blue" content={`Take online`} disabled={ live } onClick={ takeOnline } />
          }
        />
        <Popup 
          content={`Saved hotel <${capitalizeString(modelType)}> will be displayed to clients. This does not erase any data.`}
          trigger={
            <Button color="orange" content={`Take offline`} disabled={ !live } onClick={ takeOffline } />
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

export default OnlinePopupControls;