import React from "react";
import { Button } from "semantic-ui-react";
import PropTypes from "prop-types";

const ImgUploadControls = ({ handleUpload, handleCancel }) => {

  return (
    <div>
      <Button.Group>
        <Button onClick={ handleCancel }>
          Cancel
        </Button>
        <Button.Or />
        <Button onClick={ handleUpload } positive >
          Upload
        </Button>
      </Button.Group>
    </div>
  )
};

ImgUploadControls.propTypes = {
  handleUpload: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired
};

export default ImgUploadControls;