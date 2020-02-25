import React, { useState } from "react";
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
// redux imports  //
import { connect } from "react-redux";
import { uploadRoomImage, handleNewRoom } from "../../../redux/actions/roomActions";

const FileInput = (props) => {
  const { uploadRoomImage, handleNewRoom } = props;
  const [ file, setFile ] = useState({});
  const onChange = (e) => {
    setFile(() => {
      return e.target.files[0];
    });
    console.log(typeof e.target.files[0])
  }
  const clickInput = (ref) => {
    // ref.current.click(); //
    console.log(ref);
    ref.current.click();
  };
  const uploadFile = () => {
    if (!file) return;
    let data = new FormData();
    data.append("roomImage", file);
    return uploadRoomImage(data);
  };

  return (
    <div>
      <Button as="label" htmlFor="file"
              icon="file" type="button">
      </Button>
      <input type="file" id="file" hidden onChange={onChange} />
      <Button
        primary
        content="Upload File"
        onClick={uploadFile} 
      />
      <span style={{marginLeft: "1em"}}>{file.name}</span>
    </div>
   
  )
};

const RoomForm = (props) => {
  const { adminRoomState, uploadRoomImage, handleNewRoom } = props;
  const { roomData, roomImages } = adminRoomState;
  const [roomDetails, setRoomDetails] = useState(roomData);
  const [roomOptions, setRoomOptions] = useState({});

  
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
    console.log(roomOptions);
    console.log(roomDetails);
    const { roomId } = adminRoomState; 
    const roomImages = adminRoomState.roomImages.map((img) => img._id );
    const roomData = {
      ...roomDetails,
      options: {
        ...roomOptions
      },
      images: roomImages
    }
    handleNewRoom(roomData);
  };  

  return (
    <Form>
      <Form.Group widths='equal'>
        <Form.Field
          control={Input}
          label='Room Type'
          placeholder='...type of room'
          onChange={handleRoomType}
        />
        <Form.Field
          control={Input}
          label='Area'
          placeholder='...only numbers please'
          onChange={handleRoomArea}
        />
        <Form.Field
          control={Input}
          label="Sleeps"
          placeholder='...how many people it sleeps'
          onChange={handleSleeps}
        />
      </Form.Group>
      <Form.Group widths='equal'>
        <Form.Field
          control={Input}
          label='Price from'
          placeholder='...price from (optional)'
          onChange={handlePrice}
        />
        <Form.Field
          control={Input}
          label='Beds'
          placeholder='...number of beds'
          onChange={handleBeds}
        />
        <Form.Field
          control={Input}
          label="Couches"
          placeholder='...number of couches'
          onChange={handleCouches}
        />
      </Form.Group>
      <Form.Field
        id='form-textarea-control-opinion'
        control={TextArea}
        label='Description of the Room'
        placeholder='...description of the room here'
        onChange={handleDescriptionChange}
      />
       <Form.Field>
        <Checkbox label='Bathroom' style={{margin: "0.5em"}} onChange={handleCheckbox} />
        <Checkbox label='Suite Bathroom' style={{margin: "0.5em"}} onChange={handleCheckbox} />
        <Checkbox label='Balcony' style={{margin: "0.5em"}} onChange={handleCheckbox} />
        <Checkbox label='Terrace' style={{margin: "0.5em"}} onChange={handleCheckbox} />
        <Checkbox label='Mountain View' style={{margin: "0.5em"}} onChange={handleCheckbox} />
        <Checkbox label='Street View' style={{margin: "0.5em"}} onChange={handleCheckbox} />
        <Checkbox label='River View' style={{margin: "0.5em"}} onChange={handleCheckbox} />
        <Checkbox label='TV' style={{margin: "0.5em"}} onChange={handleCheckbox} />
        <Checkbox label='Air Conditioning' style={{margin: "0.5em"}} onChange={handleCheckbox} />
        <Checkbox label='WiFi' style={{margin: "0.5em"}} onChange={handleCheckbox} />

      </Form.Field>
      <FileInput uploadRoomImage={uploadRoomImage} />
      { roomImages.map((roomImage) => <RoomImageThumb roomImage={roomImage} />)}
      <Form.Field style={{marginTop: "0.5em"}}
        id='form-button-control-public'
        control={Button}
        content='Confirm'
        onClick={handleFormSubmit}
      />
     
    </Form>
  )
};

// redux functionality //
const mapStateToProps = (state) => {
  return {
    adminRoomState: state.adminRoomState
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    uploadRoomImage: (imageData) => uploadRoomImage(dispatch, imageData),
    handleNewRoom: (roomData) => handleNewRoom(dispatch, roomData)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomForm);

