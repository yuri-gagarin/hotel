// @flow
import * as React from "react";
import { Button, Checkbox, Form, Input, TextArea } from "semantic-ui-react";
// additional component imports  //
import ServiceImageThumb from "./ServiceImageThumb";
import FileInput from "../rooms/FileInput";
import ConfirmDeleteModal from "../shared/ConfirmDeleteModal";
// redux imports  //
import { connect } from "react-redux";
import { uploadServiceImage, deleteServiceImage, handleNewService, updateHotelService, setServicesImages } from "../../../redux/actions/serviceActions";
// flow types //
import type { RootState, Dispatch } from "../../../redux/reducers/_helpers/createReducer";
import type { ServiceState, ServiceData, ServiceImgData, ClientServiceFormData, ServiceAction } from "../../../redux/reducers/service/flowTypes";
import type { RouterHistory } from "react-router-dom";
// styles and css//
import styles from "./css/serviceForm.module.css";
// helpers //
import { generateEmptyService } from "../../../redux/reducers/_helpers/emptyDataGenerators";

type OwnProps = {|
  history: RouterHistory,
|};
type Props = {|
  ...OwnProps,
  serviceState: ServiceState,
  handleNewService: (serviceData: ClientServiceFormData, history: RouterHistory) => Promise<boolean>,
  updateHotelService: (serviceData: ClientServiceFormData, serviceState: ServiceState) => Promise<boolean>,
  uploadServiceImage: (file: FormData, currentServiceState: ServiceState) => Promise<boolean>,
  deleteServiceImage: (imageId: string, currentServiceState: ServiceState) => Promise<boolean>,
  setServicesImages: (serviceImages: Array<ServiceImgData>) => void 
|}
const ServiceForm = (props: Props): React.Node => {
  const { serviceState, history } = props;
  const { handleNewService, updateHotelService, uploadServiceImage,  deleteServiceImage, setServicesImages } = props;
  const { serviceData, serviceImages } = serviceState;

  // local form state //
  const [ serviceDetails, setServiceDetails ] = React.useState(serviceData);
  const [ deleteImgModalState, setDeleteImgModalState ] = React.useState({ modalOpen: false, imgIdToDelete: "" });
  React.useEffect(() => {
    if (serviceData && serviceData.images && Array.isArray(serviceData.images)) {
      // set the images array //
      setServicesImages(serviceData.images);
    }
  }, []);
  React.useEffect(() => {
    console.log(serviceDetails)
  }, [ serviceDetails ])
  
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
      images: serviceImages
    };

    if (!serviceId) {
      // new room being created //
      handleNewService(serviceFormData, history)
        .then((success) => {
          if (success) {
            history.push("/admin/services");
          }
        });
    } else {
      // existing room being edited with existing data //
      updateHotelService({ ...serviceFormData, _id: serviceId }, serviceState)
        .then((success) => {
          if (success) {
            history.push("/admin/services");
          }
        });
    }
  };  
  
  // image delete actions //
  const handleImageDelete = (imageId: string) => {
    // need ac confirmation modal here //
    setDeleteImgModalState({ ...deleteImgModalState, modalOpen: true, imgIdToDelete: imageId });
  };
  const confirmImageDelete = () => {
    const { modalOpen, imgIdToDelete } = deleteImgModalState;
    if (modalOpen && imgIdToDelete) {
      return deleteServiceImage(imgIdToDelete, serviceState)
        .then((success) => {
          setDeleteImgModalState({ ...deleteImgModalState, modalOpen: false, imgIdToDelete: "" });
        })
    } else {
      return Promise.resolve(true);
    }
  };
  const cancelDeleteAction = () => {
    setDeleteImgModalState({ ...deleteImgModalState, modalOpen: false, imgIdToDelete: "" });
  };

  return (
    <Form>
      <ConfirmDeleteModal 
        open={ deleteImgModalState.modalOpen } 
        modelName="image" 
        confirmAction={ confirmImageDelete } 
        cancelAction={ cancelDeleteAction } 
        customContent={ "This will delete the selected Image" }
      />
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
        id='form-textarea-control-opinion'
        control={TextArea}
        label='Description'
        placeholder='Description of the service provided ...'
        onChange={handleServiceDescription}
        value={serviceDetails.description}

      />
      <FileInput uploadImage={uploadServiceImage} dataName={"serviceImage"} modelState={ serviceState } />
      <div className={ styles.formPreviewImgsDiv }>
        { 
          serviceImages.map((serviceImg) => {
            return (
              <ServiceImageThumb 
                key={serviceImg._id} 
                serviceImage={serviceImg} 
                handleImageDelete={handleImageDelete} 
              />
            );
          })
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
const mapStateToProps = (state: RootState) => {
  return {
    serviceState: state.serviceState
  };
};
const mapDispatchToProps = (dispatch: Dispatch<ServiceAction>) => {
  return {
    uploadServiceImage: (imageData: FormData, currentServiceState: ServiceState) => {
      return uploadServiceImage(dispatch, imageData, currentServiceState);
    },
    deleteServiceImage: (imageId: string, currentServiceState: ServiceState) => {
      return deleteServiceImage(dispatch, imageId, currentServiceState);
    },
    setServicesImages: (previewImages: Array<ServiceImgData>) => {
      return setServicesImages(previewImages);
    },
    handleNewService: (serviceData: ClientServiceFormData) => {
      return handleNewService(dispatch, serviceData);
    },
    updateHotelService: (serviceData: ClientServiceFormData, serviceState: ServiceState) => {
      return updateHotelService(dispatch, serviceData, serviceState);
    }
  };
};

export default (connect(mapStateToProps, mapDispatchToProps)(ServiceForm): React.AbstractComponent<OwnProps>);

