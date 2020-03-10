import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Checkbox,
  Form,
  Input,
  TextArea
} from "semantic-ui-react";
// additional component imports  //
import ServiceImageThumb from "./ServiceImages";
// redux imports  //
import { connect } from "react-redux";
import { 
  uploadServiceImage,
  deleteServiceImage,
  handleNewService,
  updateHotelService, 
  setServicesImages
} from "../../../redux/actions/serviceActions";

const FileInput = (props) => {
  const { uploadServiceImage } = props;
  const [ file, setFile ] = useState({});
  const onChange = (e) => {
    setFile(() => {
      return e.target.files[0];
    });
  }
  
  const uploadFile = () => {
    if (!file) return;
    let data = new FormData();
    data.append("serviceImage", file);
    return uploadRoomService(data)
      .then((success) => {
        if (success) {
          // clear the input //
          document.getElementById("serviceFormPicInput").value = "";
          setFile(() => {
            return {};
          })
        }
      });
  };

  return (
    <div>
      <Button as="label" htmlFor="fileInput"
              icon="file" type="button">
      </Button>
      <input type="file" id="serviceFormPicInput" hidden onChange={onChange} />
      <Button
        primary
        content="Upload File"
        onClick={uploadFile} 
      />
      <span style={{marginLeft: "1em"}}>{file.name ? file.name : "No file"}</span>
    </div>
   
  )
};

const ServiceForm = (props) => {
  const { 
    serviceState, 
    history,
    uploadServiceImage, 
    deleteServiceImage,
    handleNewService, 
    updateHotelService, 
    setServicesImages
  } = props;
  const { serviceData, serviceImages } = serviceState;
  // local form state //
  const [serviceDetails, setServiceDetails] = useState(serviceData);

  useEffect(() => {
    if (serviceData && serviceData.images && Array.isArray(serviceData.images)) {
      // set the images array //
      setServicesImages(serviceData.images);
    }
  }, []);
  
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
    serviceDetails({
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
    const serviceId = serviceState.serviceData._id;
    const createdServices = serviceState.createdServices;

    const serviceImages = serviceState.serviceImages.map((img) => img._id );
    const serviceData = {
      ...serviceDetails,
      images: serviceImages
    };

    if (!serviceId) {
      // new room being created //
      handleNewService(serviceData, history)
    } else {
      // existing room being edited with existing data //
      const serviceImages = { currentImages: serviceState.serviceImages };
      updateHotelService({ ...serviceData, _id: serviceId }, serviceImages, createdServices);
    }
  };  

  const handleImageDelete = (imageId) => {
    const { serviceImages } = serviceState;
    const confirm = window.confirm("Are you Sure?");
    if (confirm) {
      deleteServiceImage(imageId, serviceImages);
    } else {
      return;
    }
  };

  return (
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
        id='form-textarea-control-opinion'
        control={TextArea}
        label='Description'
        placeholder='Description of the service provided ...'
        onChange={handleServiceDescription}
        value={serviceDetails.description}

      />
      <FileInput uploadServiceImage={uploadServiceImage} />
      { 
        serviceImages.map((serviceImg) => {
          return (
            <ServiceImageThumb 
              key={roomImage._id} 
              serviceImage={serviceImg} 
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

RoomForm.propTypes = {
  history: PropTypes.object.isRequired,
  uploadServiceImage: PropTypes.func.isRequired,
  deleteServiceImage: PropTypes.func.isRequired,
  setServicesImages: PropTypes.func.isRequired,
  handleNewService: PropTypes.func.isRequired,
  updateHotelService: PropTypes.func.isRequired
}

// redux functionality //
const mapStateToProps = (state) => {
  return {
    serviceState: state.serviceState
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    uploadServiceImage: (imageData) => {
      return uploadServiceImage(dispatch, imageData);
    },
    deleteServiceImage: (imageId, oldImageState) => {
      return deleteServiceImage(dispatch, imageId, oldImageState);
    },
    setServicesImages: (previewImages) => {
      return setServicesImages(previewImages);
    },
    handleNewService: (serviceData, history) => {
      return handleNewService(dispatch, serviceData, history);
    },
    updateHotelService: (serviceData, serviceImages, currentServices) => {
      return updateHotelService(dispatch, serviceData, serviceImages, currentServices);
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ServiceForm);

