import React from "react";
import PropTypes from "prop-types";
// semantic ui react imports //
import {
  Button, Popup
} from "semantic-ui-react";
// helpers //
import { capitalizeString } from "../../helpers/displayHelpers";

const OnlinePopupControls = ({ handleFormOpen, modelType, createdModelsLength, takeAllOnline, takeAllOffline }) => {

  return (
    <React.Fragment>
      <Popup 
        content={ `Create a new ${capitalizeString(modelType)}`}
        trigger={
          <Button color="green" onClick={ handleFormOpen }>{ `Add New ${capitalizeString(modelType)}` }</Button>
        }
      />
      <Button.Group>
        <Popup 
          content={`All saved hotel ${modelType}s will be displayed to visiting clients`}
          trigger={
            <Button color="blue" content={`Take all hotel ${modelType}s online`} disabled={ createdModelsLength === 0} onClick={ takeAllOnline } />
          }
        />
        <Popup 
          content={`No ${modelType}s will be displayed to clients. This does not erase any data.`}
          trigger={
            <Button color="orange" content={`Take all ${modelType}s offline`} disabled={ createdModelsLength === 0} onClick={ takeAllOffline } />
          }
        />
      </Button.Group>
    </React.Fragment>
  );
};

OnlinePopupControls.propTypes = {
  handleFormOpen: PropTypes.func.isRequired,
  modelType: PropTypes.string.isRequired,
  createdModelsLength: PropTypes.number.isRequired,
  takeAllOnline: PropTypes.func.isRequired,
  takAllOffline: PropTypes.func.isRequired
};

export default OnlinePopupControls;