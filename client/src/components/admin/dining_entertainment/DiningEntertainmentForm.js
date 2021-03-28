// @flow
import * as React from "react";
import { Button,Header, Icon, Input, Form, TextArea, Segment, Label, Dropdown } from "semantic-ui-react";
// additional component imports  //
import DiningEntertainmentImageThumb from "./DiningEntertainmentImgThumb";
import { DiningEntertainmentTypeDropdown } from "./form_components/DiningEntertainmentTypeDropdown";
import { PreviewImagesCarousel } from "../shared/PreviewImagesCarousel";
import GenericImgModal from "../shared/GenericImgModal";
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
import { objectValuesEmpty, setImagePath } from "../../helpers/displayHelpers";


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

type ImageModalState = {
  imgModalOpen: boolean,
  openImageURL: string
}

const DiningEntertainmentForm = ({ diningEntState, history, _handleUploadDiningModelImage, _handleDeleteDiningModelImage, _handleCreateDiningModel, _handleUpdateDiningModel }: Props): React.Node => {
  const { useEffect, useState } = React;
  const { diningEntModelData } = diningEntState;

  // local form state //
  const [ diningModelDetails, setDiningModelDetails ] = useState({ ...diningEntModelData });
  const [ imageModalState, setImageModalState ] = useState({ imgModalOpen: false, openImageURL: "" });
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
  const handleSelect = (_e, data: any) => {
    if (data.value) {
      setDiningModelDetails({ ...diningModelDetails, optionType: data.value });
    } else {
      setDiningModelDetails({ ...diningModelDetails, optionType: "" });
    }
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

  const toggleImageModal = (imagePath?: string) => {
    setImageModalState({ 
      ...imageModalState, 
      imgModalOpen: !imageModalState.imgModalOpen, 
      openImageURL: imageModalState.openImageURL ? "" : setImagePath(imagePath)
    });
  }

  return (
    <React.Fragment>
      <GenericImgModal open={ imageModalState.imgModalOpen } imgURL={ imageModalState.openImageURL } handleClose={ toggleImageModal }/>
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
        <div className={styles.typeDropdown }>
          <div>Option type:</div>
          <div>
            <DiningEntertainmentTypeDropdown 
              selectedOption={ diningModelDetails.optionType }
              handleSelect={ handleSelect }
            />
          </div>
        </div>
      
        <Form.Field
          className={ styles.descriptionTextField }
          control={TextArea}
          label="Description:"
          placeholder='Description of the dining or entertainment option provided ...'
          onChange={ handleDiningModelDescription }
          value={ diningModelDetails.description }

        />
        <div className={ styles.imageUploadInputDiv }>
          <FileInput uploadImage={ _handleUploadDiningModelImage } dataName={ "diningImage" } modelState={ diningEntState } textContent={ "Upload menu images" }/>
          {
            diningEntModelData.menuImages.length > 0 
            ?
            <PreviewImagesCarousel images={ diningEntModelData.menuImages } toggleImageModal={ toggleImageModal } />
            :
            <Segment textAlign="center">
              <Header icon>
                <Icon name='file' />
                  No Images Uploaded. Upload some menu images.
              </Header>
            </Segment>
          }
        </div>
        <div className={ styles.imageUploadInputDiv}> 
          <FileInput uploadImage={ _handleUploadDiningModelImage } dataName={ "diningImage" } modelState={ diningEntState } textContent={ "Upload general images" } />
          { 
            diningEntModelData.images.length > 0 
            ?
            <PreviewImagesCarousel images={ diningEntModelData.images } toggleImageModal={ toggleImageModal }/>
            :
            <Segment textAlign="center">
              <Header icon>
                <Icon name='file' />
                  No Images Uploaded. Upload some descriptive images.
              </Header>
            </Segment>
          }
        
        </div>
      </Form>
    </React.Fragment>
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

