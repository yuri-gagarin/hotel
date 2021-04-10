// @flow
import * as React from "react";
import { Button, Checkbox, Header, Icon, Form, Input, Popup, Segment, TextArea } from "semantic-ui-react";
// additional component imports  //
import ServiceImageThumb from "./ServiceImageThumb";
import FileInput from "../rooms/FileInput";
import ModelDeleteBtn from "../shared/ModelDeleteBtn";
import GenericImgModal from "../shared/GenericImgModal";
import { PreviewImagesCarousel } from "../shared/PreviewImagesCarousel";
import { ConfirmDeleteModal } from "../shared/ConfirmDeleteModal";
// redux imports  //
import { connect } from "react-redux";
import { handleCreateNewService, handleUpdateService, handleDeleteService, handleUploadServiceImage, handleDeleteServiceImage, handleDeleteAllServiceImages } from "../../../redux/actions/serviceActions";
// flow types //
import type { RootState, Dispatch } from "../../../redux/reducers/_helpers/createReducer";
import type { ServiceState, ServiceData, ServiceImgData, ClientServiceFormData, ServiceAction } from "../../../redux/reducers/service/flowTypes";
import type { RouterHistory } from "react-router-dom";
// styles and css//
import styles from "./css/serviceForm.module.css";
// helpers //
import { generateEmptyService } from "../../../redux/reducers/_helpers/emptyDataGenerators";
import { objectValuesEmpty, setImagePath } from "../../helpers/displayHelpers";

type OwnProps = {
  serviceState: ServiceState,
  history: RouterHistory,
  toggleEditModal?: () => void
};
type Props = {
  ...OwnProps,
  serviceState: ServiceState,
  _handleCreateNewService: (serviceData: ClientServiceFormData, history: RouterHistory) => Promise<boolean>,
  _handleUpdateService: (serviceData: ClientServiceFormData, serviceState: ServiceState) => Promise<boolean>,
  _handleDeleteService: (serviceIdToDelete: string, currentServiceState: ServiceState) => Promise<boolean>,
  _handleUploadServiceImage: <ServiceState>(file: FormData, currentServiceState: ServiceState) => Promise<boolean>,
  _handleDeleteServiceImage: (imageId: string, currentServiceState: ServiceState) => Promise<boolean>,
  _handleDeleteAllServiceImages: (currentServiceState: ServiceState) => Promise<boolean>
};

// local state types //
type LocalFormState = {
  ...ClientServiceFormData
}
type ImageModalState = {
  imgModalOpen: boolean,
  openImageURL: string
}
type ConfirmDelModalState = {
  modalOpen: boolean,
  modelToDelete: "service" | "serviceImage" | "",
  modelIdToDelete: string
};

const ServiceForm = (props: Props): React.Node => {
  const { serviceState, history, toggleEditModal } = props;
  const { _handleCreateNewService, _handleUpdateService, _handleDeleteService, _handleUploadServiceImage,  _handleDeleteServiceImage, _handleDeleteAllServiceImages } = props;
  const { serviceData, serviceImages } = serviceState;

  // local form state //
  const [ serviceDetails, setServiceDetails ] = React.useState<LocalFormState>({ ...serviceData });
  const [ imageModalState, setImageModalState ] = React.useState<ImageModalState>({ imgModalOpen: false, openImageURL: "" });
  const [ confirmDelModalState, setConfirmDelModalState ] = React.useState<ConfirmDelModalState>({ modalOpen: false, modelIdToDelete: "", modelToDelete: "" }); 
  

  // img modal opop //
  const toggleImageModal = (imagePath?: string) => {
    setImageModalState({ imgModalOpen: !imageModalState.imgModalOpen, openImageURL: imagePath ? setImagePath(imagePath) : "" });
  };
  // text input handlers //
  const handleServiceType = (e, data) => {
    setServiceDetails({
      ...serviceDetails,
      serviceType: data.value
    });
  };
  const handleServiceHours = (e, data) => {
    setServiceDetails({
      ...serviceDetails,
      hours: data.value
    });
  };
  const handleServicePrice = (e, data) => {
    setServiceDetails({
      ...serviceDetails,
      price: data.value
    });
  };
  const handleServiceDescription = (e, data) => {
    setServiceDetails({
      ...serviceDetails,
      description: data.value
    });
  };
  
  const handleFormSubmit = () => {
    const { serviceData, createdServices, serviceImages } = serviceState;
    const { _id: serviceId } = serviceData;

    const serviceFormData: ClientServiceFormData = {
      ...serviceDetails,
      _id: serviceId ? serviceId : "",
      images: serviceImages
    };

    if (!serviceId) {
      // new room being created //
      _handleCreateNewService(serviceFormData, history)
        .then((success) => {
          if (success) history.push("/admin/services");
        });
    } else {
      // existing room being edited with existing data //
      _handleUpdateService({ ...serviceFormData }, serviceState)
        .then((success) => {
          if (success && toggleEditModal) toggleEditModal();
        });
    }
  };  
  
  const handleFormCancel = () => {
    if (toggleEditModal && !objectValuesEmpty(serviceData)) {
      toggleEditModal();
    } else {
      // needs to be implemented //
      if (serviceImages.length > 0) {
        _handleDeleteAllServiceImages(serviceState).then((success) => { 
          if (success) history.goBack();
        });
      } else {
        history.goBack();
      }
    }
    // else its a new form 
  };
  // image delete actions //
  const triggerServiceDelete = (serviceId: string) => {
    setConfirmDelModalState({ modalOpen: true, modelToDelete: "service", modelIdToDelete: serviceId });
  };
  const triggerImageDelete = (imageId: string) => {
    setConfirmDelModalState({ modalOpen: true, modelToDelete: "serviceImage", modelIdToDelete: imageId });
  };
  const cancelDeleteAction = () => {
    setConfirmDelModalState({ modalOpen: false, modelToDelete: "", modelIdToDelete: "" });
  };
  const handleDeleteConfirm = () => {
    const { modalOpen, modelIdToDelete, modelToDelete } = confirmDelModalState;
    if (modalOpen) {
      if (modelIdToDelete && modelToDelete === "service") {
        return _handleDeleteService(modelIdToDelete, serviceState)
          .then((success) => {
            if (success) setConfirmDelModalState({ modalOpen: false, modelToDelete: "", modelIdToDelete: "" });
          });
      } else if (modelIdToDelete && modelToDelete === "serviceImage") {
        return _handleDeleteServiceImage(modelIdToDelete, serviceState)
          .then((success) => {
            if (success) setConfirmDelModalState({ modalOpen: false, modelToDelete: "", modelIdToDelete: "" });
          });
      } else {
        // perhaps show error later //
        return Promise.resolve();
      }
    } else {
      // perhaps show error later //
      return Promise.resolve();
    }
  };

  return (
    <div className={ styles.serviceFormWrapper }>
      <ConfirmDeleteModal 
        open={ confirmDelModalState.modalOpen } 
        modelName="image" 
        confirmAction={ handleDeleteConfirm } 
        cancelAction={ cancelDeleteAction } 
        customContent={ "This will delete the selected Image" }
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
          objectValuesEmpty(serviceData)
          ?
          <div className={ styles.formControls }>
            <Button style={{ height: "100%" }} inverted color="green" content="Create and Save" icon="save" onClick={ handleFormSubmit } />
          </div>
          :
          <div className={ styles.formControls }>
            <Button content="Update and Save" icon="save" onClick={ handleFormSubmit } />
            <ModelDeleteBtn modelId={ serviceData._id } modelName="service" handleModelDelete={ triggerServiceDelete } />
          </div>
        }
      </div>
      <div className={ styles.formDiv }>
        <Form> 
          <Form.Group widths='equal'>
            <Form.Field
              control={Input}
              label='Service Type'
              placeholder="Type of service ..."
              onChange={handleServiceType}
              value={serviceDetails.serviceType}
            />
            <Form.Field
              control={Input}
              label='Hours'
              placeholder='Hours available ...'
              onChange={handleServiceHours}
              value={serviceDetails.hours}
            />
            <Form.Field
              control={Input}
              label="Price"
              placeholder='How much does it cost ...'
              onChange={handleServicePrice}
              value={serviceDetails.price}
            />
          </Form.Group>
          <Form.Field
            className={ styles.descriptionField }
            control={TextArea}
            label='Description'
            placeholder='Description of the service provided ...'
            onChange={handleServiceDescription}
            value={serviceDetails.description}

          />
          <div className={ styles.imageUploadInputDiv }>
            <FileInput uploadImage={ _handleUploadServiceImage } dataName={ "serviceImage" } modelState={ serviceState } textContent={ "Upload service images" }/>
            {
              serviceImages.length > 0 
              ?
              <PreviewImagesCarousel 
                showDeleteIcons={ true }
                images={ serviceImages } 
                toggleImageModal={ toggleImageModal } 
                triggerImgModelDelete={ triggerImageDelete }
              />
              :
              <Segment textAlign="center">
                <Header icon>
                  <Icon name='file' />
                    No Images Uploaded. Upload some images....
                </Header>
              </Segment>
            }
          </div>
        </Form>
      </div>
    </div>
  );
};

// redux functionality //
const mapDispatchToProps = (dispatch: Dispatch<ServiceAction>) => {
  return {
    _handleUploadServiceImage: (imageData: FormData, currentServiceState: ServiceState) => {
      return handleUploadServiceImage(dispatch, imageData, currentServiceState);
    },
    _handleDeleteServiceImage: (imageId: string, currentServiceState: ServiceState) => {
      return handleDeleteServiceImage(dispatch, imageId, currentServiceState);
    },
    _handleDeleteAllServiceImages: (currentServiceState: ServiceState) => {
      return handleDeleteAllServiceImages(dispatch, currentServiceState);
    },
    /*
    setServicesImages: (previewImages: Array<ServiceImgData>) => {
      return setServicesImages(previewImages);
    },
    */
    _handleCreateNewService: (serviceData: ClientServiceFormData) => {
      return handleCreateNewService(dispatch, serviceData);
    },
    _handleUpdateService: (serviceData: ClientServiceFormData, serviceState: ServiceState) => {
      return handleUpdateService(dispatch, serviceData, serviceState);
    },
    _handleDeleteService: (serviceId: string, serviceState: ServiceState) => {
      return handleDeleteService(dispatch, serviceId, serviceState);
    }
  };
};

export default (connect(null, mapDispatchToProps)(ServiceForm): React.AbstractComponent<OwnProps>);

