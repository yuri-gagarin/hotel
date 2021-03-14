import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Form,
  Input,
  TextArea
} from "semantic-ui-react";
// additional component imports  //
import DiningEntertainmentImageThumb from "./DiningEntertainmentImgThumb";
import FileInput from "../rooms/FileInput";
// redux imports  //
import { connect } from "react-redux";
import { 
  uploadDiningModelImage,
  deleteDiningModelImage,
  handleNewDiningModel,
  updateDiningModel,
  setPreviewImages
} from "../../../redux/actions/diningActions";
// helpers //

const DiningEntertainmentForm = (props) => {
  const { 
    diningState, 
    history,
    uploadDiningModelImage, 
    deleteDiningModelImage,
    handleNewDiningModel, 
    updateDiningModel, 
    setPreviewImages
  } = props;
  const { diningModelData = {}, diningModelImages } = diningState;

  const initialFormState = {
    title: diningModelData.title || "",
    hours: diningModelData.hours || "",
    description: diningModelData.description || ""
  };

  // local form state //
  const [ diningModelDetails, setDiningModelDetails ] = useState(initialFormState);

  useEffect(() => {
    if (diningModelData && diningModelData.images && Array.isArray(diningModelData.images)) {
      // set the images array //
      setPreviewImages(diningModelData.images);
    }
  }, []);
  
  // text input handlers //
  const handleDiningModelTitle = (_e, data) => {
    setDiningModelDetails({
      ...diningModelDetails,
      title: data.value
    });
  };
  const handleDiningModelHours = (_e, data) => {
    setDiningModelDetails({
      ...diningModelDetails,
      hours: data.value
    });
  };
  const handleDiningModelDescription = (e, data) => {
    setDiningModelDetails({
      ...diningModelDetails,
      description: data.value
    });
  };
  
  const handleFormSubmit = () => {
    const diningModelId = diningState.diningModelData._id;
    const createdDiningModels = diningState.createdDiningModels;

    const diningModelImages = diningState.diningModelImages.map((img) => img._id );
    const diningModelData = {
      ...diningModelDetails,
      images: diningModelImages
    };

    if (!diningModelId) {
      // new model being created //
      handleNewDiningModel(diningModelData, history)
        .then((success) => {
          if (success) {
            history.push("/admin/dining_entertainment");
          } else {
            return;
          }
        });
    } else {
      // existing model being edited with existing data //
      const diningModelImages = { currentImages: diningState.diningModelImages };
      updateDiningModel({ ...diningModelData, _id: diningModelId }, diningModelImages, createdDiningModels)
        .then((success) => {
          if (success) {
            history.push("/admin/dining_entertainment");
          } else {
            return;
          }
        });
    }
  };  

  const handleImageDelete = (imageId) => {
    const { diningModelImages } = diningModelState;
    const confirm = window.confirm("Are you Sure?");
    if (confirm) {
      deleteDiningModelImage(imageId, diningModelImages);
    } else {
      return;
    }
  };

  return (
    <Form>
      <Form.Group widths='equal'>
        <Form.Field
          control={Input}
          label='Title'
          placeholder="Name or title of dining/entertainment option"
          onChange={handleDiningModelTitle}
          value={diningModelDetails.title}
        />
        <Form.Field
          control={Input}
          label='Hours'
          placeholder='Hours available ...'
          onChange={handleDiningModelHours}
          value={diningModelDetails.hours}
        />
      </Form.Group>
      <Form.Field
        id='form-textarea-control-opinion'
        control={TextArea}
        label='Description'
        placeholder='Description of the dining or entertainment option provided ...'
        onChange={handleDiningModelDescription}
        value={diningModelDetails.description}

      />
      <FileInput uploadImage={uploadDiningModelImage} dataName={"diningModelImage"} />
      { 
        diningModelImages.map((diningModelImg) => {
          return (
            <DiningEntertainmentImageThumb 
              key={diningModelImg._id} 
              diningModelImage={diningModelImg} 
              handleImageDelete={handleImageDelete} 
            />
          );
        })
      }
      <Form.Field style={{marginTop: "0.5em"}}
        id='form-button-control-public'
        control={Button}
        content='Save All'
        onClick={handleFormSubmit}
      />
     
    </Form>
  )
};

DiningEntertainmentForm.propTypes = {
  history: PropTypes.object.isRequired,
  uploadDiningModelImage: PropTypes.func.isRequired,
  deleteDiningModelImage: PropTypes.func.isRequired,
  setPreviewImages: PropTypes.func.isRequired,
  handleNewDiningModel: PropTypes.func.isRequired,
  updateDiningModel: PropTypes.func.isRequired
}

// redux functionality //
const mapStateToProps = (state) => {
  return {
    diningState: state.diningState
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    uploadDiningModelImage: (imageData) => {
      return uploadDiningModelImage(dispatch, imageData);
    },
    deleteDiningModelImage: (imageId, oldImageState) => {
      return deleteDiningModelImage(dispatch, imageId, oldImageState);
    },
    setPreviewImages: (previewImages) => {
      return setPreviewImages(previewImages);
    },
    handleNewDiningModel: (diningModelData, history) => {
      return handleNewDiningModel(dispatch, diningModelData, history);
    },
    updateDiningModel: (diningModelData, diningModelImages, currentDiningModels) => {
      return updateDiningModel(dispatch, diningModelData, diningModelImages, currentDiningModels);
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DiningEntertainmentForm);

