// @flow
import * as React from "react";
import { Button,Header, Icon, Input, Form, TextArea, Segment } from "semantic-ui-react";
// additional component imports  //
import DiningEntertainmentImageThumb from "./DiningEntertainmentImgThumb";
import DiningEntertainmentTypeDropdown from "./form_components/DiningEntertainmentTypeDropdown";
import FileInput from "../rooms/FileInput";
// redux imports  //
import { connect } from "react-redux";
import { handleUploadDiningModelImage, handleDeleteDiningModelImage, handleCreateDiningModel, handleUpdateDiningModel } from "../../../redux/actions/diningActions";
// types //
import type { DiningEntertainmentState, DiningImgData, MenuImageData, ClientDiningEntFormData, DiningEntModelAction } from "../../../redux/reducers/dining_entertainment/flowTypes";
import type { RootState, Dispatch } from "../../../redux/reducers/_helpers/createReducer";
import type { RouterHistory } from "react-router-dom";
// styles and css //
import styles from "./css/diningEntertainmentForm.module.css";
// helpers //
import { objectValuesEmpty } from "../../helpers/displayHelpers";


type OwnProps = {
  diningEntState: DiningEntertainmentState,
  history: RouterHistory
};
// from <connectDispatchToProps> //
type Props = {
  ...OwnProps,
  _handleUploadDiningModelImage: <DiningEntertainmentState>(file: FormData, currentDiningEntState: DiningEntertainmentState) => Promise<boolean>,
  _handleDeleteDiningModelImage: (imageId: string, currentDiningEntState: DiningEntertainmentState) => Promise<boolean>,
  _handleCreateDiningModel: (modelCreateData: ClientDiningEntFormData) => Promise<boolean>,
  _handleUpdateDiningModel: (modelUpdateData: ClientDiningEntFormData, currentDiningEntState: DiningEntertainmentState) => Promise<boolean>
};

const DiningEntertainmentForm = ({ diningEntState, history, _handleUploadDiningModelImage, _handleDeleteDiningModelImage, _handleCreateDiningModel, _handleUpdateDiningModel }: Props): React.Node => {
  const { useEffect, useState } = React;
  const { diningEntModelData } = diningEntState;

  // local form state //
  const [ diningModelDetails, setDiningModelDetails ] = useState({ ...diningEntModelData });

  /*
  useEffect(() => {
    if (diningModelData && diningModelData.images && Array.isArray(diningModelData.images)) {
      // set the images array //
      setPreviewImages(diningModelData.images);
    }
  }, []);
  */
  
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
  // select handlers //
  const handleSelect = (_e, data) => {
    console.log(data.value);
  };
  const handleClear = (_e, data) => {
    console.log(data);
  };
  
  const handleFormSubmit = () => {
    const {  _id: modelId } = diningEntModelData;
    const { createdDiningEntModels, menuImages, diningEntImages } = diningEntState;

    const diningModelData: ClientDiningEntFormData = {
      ...diningModelDetails,
      images: diningEntImages,
      menuImages: menuImages
    };

    if (!modelId) {
      // new model being created //
      return _handleCreateDiningModel(diningModelData)
        .then((success) => {
          if (success) history.push("/admin/dining_entertainment");
        });
    } else {
      // existing model being edited with existing data //
      return _handleUpdateDiningModel(diningModelData, diningEntState)
        .then((success) => {
          if (success) history.push("/admin/dining_entertainment");
        });
    }
  };  

  const handleImageDelete = (imageId: string) => {
    return _handleDeleteDiningModelImage(imageId, diningEntState);
  };

  return (
    <Form>
      <Form.Group widths='equal'>
        <Form.Field
          control={Input}
          label='Title'
          placeholder="Name or title of dining/entertainment option"
          onChange={ handleDiningModelTitle }
          value={diningModelDetails.title }
        />
        <Form.Field
          control={Input}
          label='Hours'
          placeholder='Hours available ...'
          onChange={ handleDiningModelHours } 
          value={ diningModelDetails.hours }
        />
      </Form.Group>
      <DiningEntertainmentTypeDropdown 
        handleSelect={ handleSelect }
        handleClear={ handleClear }
      />
      <Form.Field
        id='form-textarea-control-opinion'
        control={TextArea}
        label='Description'
        placeholder='Description of the dining or entertainment option provided ...'
        onChange={handleDiningModelDescription}
        value={diningModelDetails.description}

      />
      <div className={ styles.menuImageUploadInputDiv }>
        <FileInput uploadImage={ _handleUploadDiningModelImage } dataName={ "diningImage" } modelState={ diningEntState } textContent={ "Upload menu images" }/>
        {
          diningEntState.menuImages.length > 0 
          ?
          diningEntState.menuImages.map((imgData) => {
            return (
              <DiningEntertainmentImageThumb 
                key={ imgData._id } 
                diningModelImage={ imgData } 
                handleImageDelete={handleImageDelete} 
              />
            );
          })
          :
          <Segment textAlign="center">
            <Header icon>
              <Icon name='file' />
                No Images Uploaded. Upload some menu images.
            </Header>
          </Segment>
        }
      </div>
      <div className={ styles.diningImageUploadInputDiv}> 
        <FileInput uploadImage={ _handleUploadDiningModelImage } dataName={ "diningImage" } modelState={ diningEntState } textContent={ "Upload general images" } />
        { 
          diningEntState.diningEntImages.length > 0 
          ?
          diningEntState.diningEntImages.map((diningModelImg) => {
            return (
              <DiningEntertainmentImageThumb 
                key={diningModelImg._id} 
                diningModelImage={diningModelImg} 
                handleImageDelete={handleImageDelete} 
              />
            );
          })
          :
          <Segment textAlign="center">
            <Header icon>
              <Icon name='file' />
                No Images Uploaded. Upload some descriptive images.
            </Header>
          </Segment>
        }
      
      </div>
      
      <Form.Field style={{marginTop: "0.5em"}}
        id='form-button-control-public'
        control={Button}
        content='Save All'
        onClick={handleFormSubmit}
      />
     
    </Form>
  )
};

// redux functionality //

const mapDispatchToProps = (dispatch: Dispatch<DiningEntModelAction>) => {
  return {
    _handleUploadDiningModelImage: (imageData: FormData, currentDiningEntState: DiningEntertainmentState) => {
      return handleUploadDiningModelImage(dispatch, imageData, currentDiningEntState);
    },
    _handleDeleteDiningModelImage: (imageId: string, currentDiningEntState: DiningEntertainmentState) => {
      return handleDeleteDiningModelImage(dispatch, imageId, currentDiningEntState);
    },
    /*
    setPreviewImages: (previewImages) => {
      return setPreviewImages(previewImages);
    },
    */
    _handleCreateDiningModel: (diningModelData: ClientDiningEntFormData) => {
      return handleCreateDiningModel(dispatch, diningModelData);
    },
    _handleUpdateDiningModel: (diningModelData: ClientDiningEntFormData, currentDiningEntState: DiningEntertainmentState) => {
      return handleUpdateDiningModel(dispatch, diningModelData, currentDiningEntState);
    }
  };
};

export default (connect(null, mapDispatchToProps)(DiningEntertainmentForm): React.AbstractComponent<OwnProps>);

