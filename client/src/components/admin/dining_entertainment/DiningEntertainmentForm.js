// @flow
import * as React from "react";
import { Button, Form, Header, Icon, Input,  Label, Popup, Segment, TextArea } from "semantic-ui-react";
// additional component imports  //
import DiningEntertainmentImageThumb from "./DiningEntertainmentImgThumb";
import { DiningEntertainmentTypeDropdown } from "./form_components/DiningEntertainmentTypeDropdown";
import { PreviewImagesCarousel } from "../shared/PreviewImagesCarousel";
import { ConfirmDeleteModal } from "../shared/ConfirmDeleteModal";
import ModelDeleteBtn from "../shared/ModelDeleteBtn";
import GenericImgModal from "../shared/GenericImgModal";
import FileInput from "../rooms/FileInput";
import { FormErrorMessages } from "../shared/FormErrorMessages";
// redux imports  //
import { connect } from "react-redux";
import { handleUploadDiningModelImage, handleDeleteDiningModelImage, handleUploadMenuImage, handleDeleteMenuImage, handleCreateDiningModel, handleUpdateDiningModel, handleDeleteDiningModel, handleDeleteAllImages } from "../../../redux/actions/diningActions";
// types //
import type { DiningEntertainmentState, DiningEntModelData, DiningImgData, MenuImageData, ClientDiningEntFormData, DiningEntModelAction } from "../../../redux/reducers/dining_entertainment/flowTypes";
import type { RootState, Dispatch } from "../../../redux/reducers/_helpers/createReducer";
import type { RouterHistory } from "react-router-dom";
// styles and css //
import styles from "./css/diningEntertainmentForm.module.css";
// helpers //
import { objectValuesEmpty, setImagePath } from "../../helpers/displayHelpers";
import { checkFormErrors } from "./helpers/checkFormErrors";

type OwnProps = {
  diningEntState: DiningEntertainmentState,
  history: RouterHistory,
  toggleEditModal?: () => void
};
// from <connectDispatchToProps> //
type Props = {
  ...OwnProps,
  _handleUploadMenuImage: <DiningEntertainmentState>(file: FormData, currentDiningEntState: DiningEntertainmentState) => Promise<boolean>,
  _handleDeleteMenuImage: <DiningEntertainmentState>(imageId: string, currentDiningEntState: DiningEntertainmentState) => Promise<boolean>,
  //
  _handleUploadDiningModelImage: <DiningEntertainmentState>(file: FormData, currentDiningEntState: DiningEntertainmentState) => Promise<boolean>,
  _handleDeleteDiningModelImage: (imageId: string, currentDiningEntState: DiningEntertainmentState) => Promise<boolean>,
  //
  _handleCreateDiningModel: (modelCreateData: ClientDiningEntFormData, currentDiningEntState: DiningEntertainmentState) => Promise<boolean>,
  _handleUpdateDiningModel: (modelUpdateData: ClientDiningEntFormData, currentDiningEntState: DiningEntertainmentState) => Promise<boolean>,
  _handleDeleteDiningModel: (diningModelId: string, currentDiningEntState: DiningEntertainmentState) => Promise<boolean>,
  //
  _handleDeleteAllImages: (images?: Array<DiningImgData>, menuImages?: Array<MenuImageData>) => Promise<boolean>
};

type ImageModalState = {
  imgModalOpen: boolean,
  openImageURL: string
}

type ConfirmDeleteModalState = {
  confirmDelModalOpen: boolean,
  modelIdToDelete: string, 
  modelToDelete: "image" | "menuImage" | "model" | ""
}

type FormState = {
  title: string,
  hours: string,
  address: string,
  instagramURL: string,
  facebookURL: string,
  phoneNumber: string,
  description: string,
  optionType: "restaurant" | "cafe" | "lounge" | "",
  titleError: string,
  hoursError: string,
  descriptionError: string
}

type ErrorMessagesState = {
  visible: boolean,
  errorMessages: Array<string>
}

const DiningEntertainmentForm = ({ 
  diningEntState, history, toggleEditModal, 
  _handleUploadDiningModelImage, _handleDeleteDiningModelImage, 
  _handleUploadMenuImage, _handleDeleteMenuImage, _handleDeleteAllImages,
  _handleCreateDiningModel, _handleUpdateDiningModel, _handleDeleteDiningModel }: Props): React.Node => {

  const { useEffect, useState } = React;
  const { diningEntModelData, menuImages, diningEntImages } = diningEntState;

  // local form state //
  const [ formState, setFormState ] = useState<FormState>({ ...diningEntModelData, titleError: "", hoursError: "", descriptionError: "" });
  const [ imageModalState, setImageModalState ] = useState<ImageModalState>({ imgModalOpen: false, openImageURL: "" });
  const [ confirmDeleteModalState, setConfirmDeleteModalState ] = useState<ConfirmDeleteModalState>({ confirmDelModalOpen: false, modelIdToDelete: "", modelToDelete: "" }); 
  const [ errorMessagesState, setErrorMessagesState ] = useState<ErrorMessagesState>({ visible: false, errorMessages: [] });
  
  const handleFormCancel = () => {
    if (toggleEditModal && !objectValuesEmpty(diningEntModelData)) {
      toggleEditModal();
    } else {
      // remove any uploaded images //
      if (menuImages.length > 0 || diningEntImages.length > 0) {
        _handleDeleteAllImages(diningEntImages, menuImages)
          .then((success) => { if (success) history.goBack() });
      } else {
        history.goBack();
      }
    }
    // else its a new form 
  };
  
  // text input handlers //
  const handleDiningModelTitle = (_e, data) => {
    if (data.value.length === 0) {
      setFormState({ ...formState, title: data.value, titleError: "A title is required..." });
    } else {
      setFormState({ ...formState, title: data.value, titleError: "" });
    }
  };
  const handleDiningModelHours = (_e, data) => {
    if (data.value.length === 0) {
      setFormState({ ...formState, hours: data.value, hoursError: "Please insert hours in following format: 'xx:xx - xx:xx'" });
    } else {
      setFormState({ ...formState, hours: data.value, hoursError: "" });
    }
  };
  const handleDiningModelAddress = (_e, data) => {
    setFormState({ ...formState, address: data.value });
  };
  const handleDeleteDiningModelInstaURL = (_e, data) => {
    setFormState({ ...formState, instagramURL: data.value });
  };
  const handleDiningModelFacebookURL = (_e, data) => {
    setFormState({ ...formState, facebookURL: data.value });
  };
  const handleDiningModelPhoneNUmber = (_e, data) => {
    setFormState({ ...formState, phoneNumber: data.value });
  };
  const handleDiningModelDescription = (e, data) => {
    if (data.value.length === 0) {
      setFormState({ ...formState, description: data.value, descriptionError: "Please write a short description...." });
    } else {
      setFormState({ ...formState, description: data.value, descriptionError: "" });
    }
  };
  // select handlers //
  const handleSelect = (_e, data: any) => {
    if (data.value) {
      setFormState({ ...formState, optionType: data.value });
    } else {
      setFormState({ ...formState, optionType: "" });
    }
  };
  
  const handleFormSubmit = () => {
    const {  _id: modelId } = diningEntModelData;
    const { createdDiningEntModels, menuImages, diningEntImages } = diningEntState;
    // check for errors first //
    const { title, hours, description  } = formState;
    const  { valid, errors } = checkFormErrors({ title, hours, description });
    if (!valid && errors.length > 0) {
      setErrorMessagesState({ visible: true, errorMessages: errors });
      return;
    }

    const diningModelData: ClientDiningEntFormData = {
      ...formState,
      _id: modelId ? modelId : "",
      live: diningEntModelData.live,
      images: diningEntImages,
      menuImages: menuImages
    };

    if (!modelId) {
      // new model being created //
      return _handleCreateDiningModel(diningModelData, diningEntState)
        .then((success) => {
          if (success) history.push("/admin/dining_entertainment");
        });
    } else {
      // existing model being edited with existing data //
      return _handleUpdateDiningModel(diningModelData, diningEntState)
        .then((success) => {
          if (success && toggleEditModal) toggleEditModal(); 
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
  };

  const triggerModelDelete = (modelId: string) => {
    setConfirmDeleteModalState({ confirmDelModalOpen: true, modelIdToDelete: modelId, modelToDelete: "model" });
  };
  const handleDeleteCancel = () => {
    setConfirmDeleteModalState({ confirmDelModalOpen: false, modelIdToDelete: "", modelToDelete: "" })
  }
  /* menu image delete functionality */
  const triggerMenuImageDelete = (imageId: string) => {
    setConfirmDeleteModalState({ confirmDelModalOpen: true, modelIdToDelete: imageId, modelToDelete: "menuImage" });
  };
  /* model image delete functionality */
  const triggerImageDelete = (imageId: string) => {
    setConfirmDeleteModalState({ confirmDelModalOpen: true, modelIdToDelete: imageId, modelToDelete: "image" });
  };
  
  /* confirm image delete function */
  const handleDeleteConfirm = () => {
    const { modelIdToDelete, modelToDelete } = confirmDeleteModalState;
    if (modelToDelete === "image") {
      return _handleDeleteDiningModelImage(modelIdToDelete, diningEntState)
        .then((success) => {
          if (success) setConfirmDeleteModalState({ confirmDelModalOpen: false, modelIdToDelete: "", modelToDelete: "" });
        })
      } else if (modelToDelete === "menuImage") {
        return _handleDeleteMenuImage(modelIdToDelete, diningEntState)
          .then((success) => {
            if (success) setConfirmDeleteModalState({ confirmDelModalOpen: false, modelIdToDelete: "", modelToDelete: "" });
          });
      } else if (modelToDelete === "model") {
        return _handleDeleteDiningModel(modelIdToDelete, diningEntState)
          .then((success) => {
            if (success) setConfirmDeleteModalState({ confirmDelModalOpen: false, modelIdToDelete: "", modelToDelete: "" });
          })
      } else {
        return Promise.resolve()
      }
  };

  /* dismiss error messages */
  const handleErrorMessagesDismiss = () => {
    setErrorMessagesState({ visible: false, errorMessages: [] });
  };

  return (
    <div className={ styles.diningEntFormWrapper }>
      <ConfirmDeleteModal 
        open={ confirmDeleteModalState.confirmDelModalOpen } 
        modelName="dining" 
        customHeader="Confirm Delete Action" 
        confirmAction={ handleDeleteConfirm }
        cancelAction={ handleDeleteCancel }
      />
      <GenericImgModal open={ imageModalState.imgModalOpen } imgURL={ imageModalState.openImageURL } handleClose={ toggleImageModal }/>
      <div className={ styles.formControlsDiv }>
        <Popup 
          content="Changes will not be saved"
          trigger={
            <Button inverted color="orange" icon="cancel" content="Cancel and Close" onClick={ handleFormCancel } />
          }
        />
        {
          objectValuesEmpty(diningEntModelData)
          ?
          <div className={ styles.formControls }>
            <Button style={{ height: "100%" }} inverted color="green" content="Create and Save" icon="save" onClick={ handleFormSubmit } />
          </div>
          :
          <div className={ styles.formControls }>
            <Button content="Update and Save" icon="save" onClick={ handleFormSubmit } />
            <ModelDeleteBtn modelId={ diningEntModelData._id } modelName="dining" handleModelDelete={ triggerModelDelete } />
          </div>
        }
        
      </div>
      {
        errorMessagesState.visible ? <FormErrorMessages visible={ true } errorMessages={ errorMessagesState.errorMessages } handleErrorMessageDismiss={ handleErrorMessagesDismiss } /> : null
      }
      <div className={ styles.formDiv }>
        <Form>
          <Form.Group widths='equal'>
            <Form.Field
              error={ formState.titleError ? { content: formState.titleError } : null }
              control={Input}
              label='Title'
              placeholder="Name or title of dining/entertainment option"
              onChange={ handleDiningModelTitle }
              value={ formState.title }
            />
            <Form.Field
              error={ formState.hoursError ? { content: formState.hoursError } : null }
              control={Input}
              label='Hours'
              placeholder='Hours available ...'
              onChange={ handleDiningModelHours } 
              value={ formState.hours }
            />
          </Form.Group>
          <Form.Group widths="16">
            <Form.Field
              width="16"
              control={Input}
              label='Address'
              placeholder="Address of the business... (optional)"
              onChange={ handleDiningModelAddress }
              value={ formState.address }
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field
              control={Input}
              label='InstagramURL'
              placeholder="Instagram... (optional, default instagram.com)"
              onChange={ handleDeleteDiningModelInstaURL }
              value={ formState.instagramURL }
            />
             <Form.Field
              error={ formState.titleError ? { content: formState.titleError } : null }
              control={Input}
              label='FacebookURL'
              placeholder="Facebook... (optional, default facebook.com)"
              onChange={ handleDiningModelFacebookURL }
              value={ formState.facebookURL }
            />
             <Form.Field
              error={ formState.titleError ? { content: formState.titleError } : null }
              control={Input}
              label='Phone Number'
              placeholder="Phone number... (optional but recommended)"
              onChange={ handleDiningModelPhoneNUmber }
              value={ formState.phoneNumber }
            />
          </Form.Group>
          <div className={styles.typeDropdown }>
            <div>Option type:</div>
            <div>
              <DiningEntertainmentTypeDropdown 
                selectedOption={ formState.optionType }
                handleSelect={ handleSelect }
              />
            </div>
          </div>
        
          <Form.Field
            error={ formState.descriptionError ? { content: formState.descriptionError } : null } 
            className={ styles.descriptionTextField }
            control={TextArea}
            label="Description:"
            placeholder='Description of the dining or entertainment option provided ...'
            onChange={ handleDiningModelDescription }
            value={ formState.description }

          />
          <div className={ styles.imageUploadInputDiv }>
            <FileInput uploadImage={ _handleUploadMenuImage } dataName={ "menuImage" } modelState={ diningEntState } textContent={ "Upload menu images" }/>
            {
              menuImages.length > 0 
              ?
              <PreviewImagesCarousel 
                showDeleteIcons={ true }
                images={ menuImages } 
                toggleImageModal={ toggleImageModal } 
                triggerImgModelDelete={ triggerMenuImageDelete }
              />
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
              diningEntImages.length > 0 
              ?
              <PreviewImagesCarousel 
                showDeleteIcons={ true }
                images={ diningEntImages } 
                toggleImageModal={ toggleImageModal }
                triggerImgModelDelete={ triggerImageDelete }
              />
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
      </div>
    </div>
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
    _handleUploadMenuImage: (imageData: FormData, currentDiningEntState: DiningEntertainmentState) => {
      return handleUploadMenuImage(dispatch, imageData, currentDiningEntState);
    },
    _handleDeleteMenuImage: (imageId: string, currentDiningEntState: DiningEntertainmentState) => {
      return handleDeleteMenuImage(dispatch, imageId, currentDiningEntState);
    },
    _handleDeleteAllImages: (images?: Array<DiningImgData>, menuImages?: Array<MenuImageData>) => {
      return handleDeleteAllImages(dispatch, images, menuImages);
    },
    /*
    setPreviewImages: (previewImages) => {
      return setPreviewImages(previewImages);
    },
    */
    _handleCreateDiningModel: (diningModelData: ClientDiningEntFormData, currentDiningEntState: DiningEntertainmentState) => {
      return handleCreateDiningModel(dispatch, diningModelData, currentDiningEntState);
    },
    _handleUpdateDiningModel: (diningModelData: ClientDiningEntFormData, currentDiningEntState: DiningEntertainmentState) => {
      return handleUpdateDiningModel(dispatch, diningModelData, currentDiningEntState);
    },
    _handleDeleteDiningModel: (diningModelId: string, currentDiningEntState: DiningEntertainmentState) => {
      return handleDeleteDiningModel(dispatch, diningModelId, currentDiningEntState);
    }
  };
};

export default (connect(null, mapDispatchToProps)(DiningEntertainmentForm): React.AbstractComponent<OwnProps>);

