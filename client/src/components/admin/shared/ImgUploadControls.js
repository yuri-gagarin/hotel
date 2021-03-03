import React from "react";
import { Button } from "semantic-ui-react";
import PropTypes from "prop-types";

const ImgUploadControls = (props) => {

  return (
    <div>
      <Button.Group>
        <Button>
          Cancel
        </Button>
        <Button.Or />
        <Button positive >
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