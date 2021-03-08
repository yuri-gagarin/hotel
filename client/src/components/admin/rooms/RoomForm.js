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
import RoomImageThumb from "./RoomImages";
import FileInput from "./FileInput";
// redux imports  //
import { connect } from "react-redux";
import { 
  uploadRoomImage,
  deleteRoomImage,
  handleNewRoom,
  updateRoom, 
  setPreviewImages 
} from "../../../redux/actions/roomActions";
// css 
import styles from "./css/fileInput.module.css";
// helpers //


const RoomForm = (props) => {
  const { 
    roomState, 
    history,
    uploadRoomImage, 
    deleteRoomImage,
    handleNewRoom, 
    updateRoom, 
    setPreviewImages
  } = props;
  const { roomData, roomImages } = roomState;

  const [roomDetails, setRoomDetails] = useState(roomData);
  const [roomOptions = {}, setRoomOptions] = useState(roomData.options);

  useEffect(() => {
    if (roomData && roomData.images) {
      // set the images array //
      setPreviewImages(roomData.images);
    }
    console.log("form rendered");
  }, []);
  
  // text input handlers //
  const handleRoomType = (e, data) => {
    setRoomDetails((state) => {
      return {
        ...state,
        roomType: data.value
      };
    });
  };
  const handleRoomArea = (e, data) => {
    setRoomDetails((state) => {
      return {
        ...state,
        area: data.value
      };
    });
  };
  const handleSleeps = (e, data) => {
    setRoomDetails((state) => {
      return {
        ...state,
        sleeps: data.value
      };
    });
  };
  const handlePrice = (e, data) => {
    setRoomDetails((state) => {
      return {
        ...state,
        price: data.value
      };
    });
  };
  const handleBeds = (e, data) => {
    setRoomDetails((state) => {
      return {
        ...state,
        beds: data.value
      };
    });
  };
  const handleCouches = (e, data) => {
    setRoomDetails((state) => {
      return {
        ...state,
        couches: data.value
      };
    });
  };
  const handleDescriptionChange = (e, data) => {
    setRoomDetails((state) => {
      return {
        ...state,
        description: data.value
      };
    });
  };
  // END text input handlers //
  // checkbox handler //
  const handleCheckbox = (e,  data) => {
    const { label, checked } = data;
    switch(label) {
      case "Bathroom": {
        setRoomOptions((state) => {
          return checked ? { ...state, privateBathroom: true } : { ...state, privateBathroom: false };
        });
        break;
      }
      case "Suite Bathroom": {
        setRoomOptions((state) => {
          return checked ? { ...state, suiteBathroom: true } : { ...state, suiteBathroom: false };
        });
        break;
      } 
      case "Balcony": {
        setRoomOptions((state) => {
          return checked ? { ...state, balcony: true } : { ...state, balcony: false };
        })
        break;
      } 
      case "Terrace": {
        setRoomOptions((state) => {
          return checked ? { ...state, terrace: true } : { ...state, terrace: false };
        })
        break;
      }
      case "Mountain View": {
        setRoomOptions((state) => {
          return checked ? { ...state, mountainView: true } : { ...state, mountainView: false };
        })
        break;
      } 
      case "Street View": {
        setRoomOptions((state) => {
          return checked ? { ...state, streetView: true } : { ...state, streetView: false };
        })
        break;
      } 
      case "River View": {
        setRoomOptions((state) => {
          return checked ? { ...state, riverView: true } : { ...state, riverView: false };
        })
        break;
      }
      case "TV": {
        setRoomOptions((state) => {
          return checked ? { ...state, tv: true } : { ...state, tv: false };
        })
        break;
      }
      case "Air Conditioning": {
        setRoomOptions((state) => {
          return checked ? { ...state, airConditioning: true } : { ...state, airConditioning: false };
        })
        break;
      }
      case "WiFi": {
        setRoomOptions((state) => {
          return checked ? { ...state, wifi: true } : { ...state, wifi: false };
        })
        break;
      }
    };
  };
  // END checkbox handler //
  const handleFormSubmit = () => {
    const roomId = roomState.roomData._id;
    const createdRooms = roomState.createdRooms;

    const roomImages = roomState.roomImages.map((img) => img._id );
    const roomData = {
      ...roomDetails,
      options: {
        ...roomOptions
      },
      images: roomImages
    }
    if (!roomId) {
      // new room being created //
      handleNewRoom(roomData, history)
    } else {
      // existing room being edited with existing data //
      const roomImages = { currentImages: roomState.roomImages };
      updateRoom({ ...roomData, _id: roomId }, roomImages, createdRooms);
    }
  };  

  const handleImageDelete = (imageId) => {
    const { roomImages } = roomState;
    const confirm = window.confirm("Are you Sure?");
    if (confirm) {
      deleteRoomImage(imageId, roomImages);
    } else {
      return;
    }
  };

  return (
    <Form>
      <Form.Group widths='equal'>
        <Form.Field
          control={Input}
          label='Room Type'
          placeholder='...type of room'
          onChange={handleRoomType}
          value={roomDetails.roomType || ""}
        />
        <Form.Field
          control={Input}
          label='Area'
          placeholder='...only numbers please'
          onChange={handleRoomArea}
          value={roomDetails.area || ""}
        />
        <Form.Field
          control={Input}
          label="Sleeps"
          placeholder='...how many people it sleeps'
          onChange={handleSleeps}
          value={roomDetails.sleeps || ""}
        />
      </Form.Group>
      <Form.Group widths='equal'>
        <Form.Field
          control={Input}
          label='Price from'
          placeholder='...price from (optional)'
          onChange={handlePrice}
          value={roomDetails.price || ""}

        />
        <Form.Field
          control={Input}
          label='Beds'
          placeholder='...number of beds'
          onChange={handleBeds}
          value={roomDetails.beds || ""}

        />
        <Form.Field
          control={Input}
          label="Couches"
          placeholder='...number of couches'
          onChange={handleCouches}
          value={roomDetails.couches || ""}
        />
      </Form.Group>
      <Form.Field
        id='form-textarea-control-opinion'
        control={TextArea}
        label='Description of the Room'
        placeholder='...description of the room here'
        onChange={handleDescriptionChange}
        value={roomDetails.description || ""}

      />
       <Form.Field>
        <Checkbox label='Bathroom' style={{margin: "0.5em"}} onChange={handleCheckbox} checked={roomOptions.privateBathroom}/>
        <Checkbox label='Suite Bathroom' style={{margin: "0.5em"}} onChange={handleCheckbox} checked={roomOptions.suiteBathroom} />
        <Checkbox label='Balcony' style={{margin: "0.5em"}} onChange={handleCheckbox} checked={roomOptions.balcony} />
        <Checkbox label='Terrace' style={{margin: "0.5em"}} onChange={handleCheckbox} checked={roomOptions.terrace} />
        <Checkbox label='Mountain View' style={{margin: "0.5em"}} onChange={handleCheckbox} checked={roomOptions.mountainView}/>
        <Checkbox label='Street View' style={{margin: "0.5em"}} onChange={handleCheckbox} checked={roomOptions.streetView}/>
        <Checkbox label='River View' style={{margin: "0.5em"}} onChange={handleCheckbox} checked={roomOptions.riverView}/>
        <Checkbox label='TV' style={{margin: "0.5em"}} onChange={handleCheckbox} checked={roomOptions.tv}/>
        <Checkbox label='Air Conditioning' style={{margin: "0.5em"}} onChange={handleCheckbox} checked={roomOptions.airConditioning}/>
        <Checkbox label='WiFi' style={{margin: "0.5em"}} onChange={handleCheckbox} checked={roomOptions.wifi}/>

      </Form.Field>
      <FileInput uploadImage={uploadRoomImage} dataName={"roomImage"} />
      { 
        roomImages.map((roomImage) => {
          return (
            <RoomImageThumb 
              key={roomImage._id} 
              roomImage={roomImage} 
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
  roomState: PropTypes.object.isRequired,
  uploadRoomImage: PropTypes.func.isRequired,
  deleteRoomImage: PropTypes.func.isRequired,
  setPreviewImages: PropTypes.func.isRequired,
  handleNewRoom: PropTypes.func.isRequired,
  updateRoom: PropTypes.func.isRequired
}

// redux functionality //
const mapStateToProps = (state) => {
  return {
    roomState: state.roomState
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    uploadRoomImage: (imageData) => uploadRoomImage(dispatch, imageData),
    setPreviewImages: (previewImages) => dispatch(setPreviewImages(previewImages)),
    handleNewRoom: (roomData, history) => handleNewRoom(dispatch, roomData, history),
    updateRoom: (roomData, roomImages, currentRooms) => {
      return updateRoom(dispatch, roomData, roomImages, currentRooms);
    },
    deleteRoomImage: (imageId, oldImageState) => deleteRoomImage(dispatch, imageId, oldImageState)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomForm);

