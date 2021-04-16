// @flow 
import * as React from "react";
import PropTypes from "prop-types";
import { Button, Checkbox, Form, Input, TextArea } from "semantic-ui-react";
// additional component imports  //
import RoomImageThumb from "./RoomImages";
import FileInput from "./FileInput";
import { PreviewImagesCarousel } from "../shared/PreviewImagesCarousel";
// redux imports  //
import { connect } from "react-redux";
import { handleUploadRoomImage, handleDeleteRoomImage, handleCreateNewRoom, handleUpdateRoom, handleDeleteRoom } from "../../../redux/actions/roomActions";
// type imports //
import type { Dispatch } from "../../../redux/reducers/_helpers/createReducer";
import type { ClientRoomFormData, RoomState, RoomData, RoomAction } from "../../../redux/reducers/rooms/flowTypes";
import type { RouterHistory } from "react-router-dom";
// css 
// helpers //

type OwnProps = {
  roomState: RoomState,
  history: RouterHistory
};
type Props = {
  ...OwnProps,
  _handleUploadRoomImage: (imageFile: FormData, currentRoomState: RoomState) => Promise<boolean>,
  _handleDeleteRoomImage: (imageIdToDelete: string, currentRoomState: RoomState) => Promise<boolean>,
  // model CRUD //
  _handleCreateNewRoom: (newRoomFormData: ClientRoomFormData) => Promise<boolean>,
  _handleUpdateRoom: (roomUpdateFormData: ClientRoomFormData, currentRoomState: RoomState) => Promise<boolean>,
  _handleDeleteRoom: (roomIdToDelete: string, currentRoomState: RoomState) => Promise<boolean>
};

type LocalFormState = {
  ...ClientRoomFormData,
  titleError: string,
  descriptionError: string
};
type ImageModalState = { imgModalOpen: boolean, openImageURL: string };

const RoomForm = (props: Props): React.Node => {
  const { roomState, history } = props;
  const { roomData } = roomState;
  const { _handleUploadRoomImage, _handleDeleteRoomImage, _handleCreateNewRoom, _handleUpdateRoom, _handleDeleteRoom } = props;
  // local form state //
  const [ localFormState, setLocalFormState ] = React.useState<LocalFormState>({ ...roomData, titleError: "", descriptionError: "" });
  const [ imageModalState, setImageModalState ] = React.useState<ImageModalState>({ imgModalOpen: false, openImageURL: "" });

  React.useEffect(() => {
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
      case "Jacuzzi": {
        setRoomOptions((state) => {
          return checked ? { ...state, jacuzzi: true } : { ...state, jacuzzi: false };
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
      case "WiFi": {
        setRoomOptions((state) => {
          return checked ? { ...state, wifi: true } : { ...state, wifi: false };
        })
        break;
      }
      case "Phone": {
        setRoomOptions((state) => {
          return checked ? { ...state, phone: true } : { ...state, phone: false };
        })
        break;
      }
      case "Air Conditioning": {
        setRoomOptions((state) => {
          return checked ? { ...state, airConditioning: true } : { ...state, airConditioning: false };
        })
        break;
      }
      case "Refrigerator": {
        setRoomOptions((state) => {
          return checked ? { ...state, refrigerator: true } : { ...state, refrigerator: false };
        })
        break;
      }
      case "Coffee Maker": {
        setRoomOptions((state) => {
          return checked ? { ...state, coffeeMaker: true } : { ...state, coffeeMaker: false };
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
    const confirm = window.confirm("Are you Sure?");
    if (confirm) {
      deleteRoomImage(imageId, roomState);
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
        <Checkbox label='Private Bathroom' style={{margin: "0.5em"}} onChange={handleCheckbox} checked={roomOptions.privateBathroom}/>
        <Checkbox label='Suite Bathroom' style={{margin: "0.5em"}} onChange={handleCheckbox} checked={roomOptions.suiteBathroom} />
        <Checkbox label='Jacuzzi' style={{margin: "0.5em"}} onChange={handleCheckbox} checked={roomOptions.jacuzzi} />
        <Checkbox label='Balcony' style={{margin: "0.5em"}} onChange={handleCheckbox} checked={roomOptions.balcony} />
        <Checkbox label='Terrace' style={{margin: "0.5em"}} onChange={handleCheckbox} checked={roomOptions.terrace} />
        <Checkbox label='Mountain View' style={{margin: "0.5em"}} onChange={handleCheckbox} checked={roomOptions.mountainView}/>
        <Checkbox label='Street View' style={{margin: "0.5em"}} onChange={handleCheckbox} checked={roomOptions.streetView}/>
        <Checkbox label='River View' style={{margin: "0.5em"}} onChange={handleCheckbox} checked={roomOptions.riverView}/>
        <Checkbox label='TV' style={{margin: "0.5em"}} onChange={handleCheckbox} checked={roomOptions.tv}/>
        <Checkbox label='WiFi' style={{margin: "0.5em"}} onChange={handleCheckbox} checked={roomOptions.wifi}/>
        <Checkbox label='Phone' style={{margin: "0.5em"}} onChange={handleCheckbox} checked={roomOptions.phone}/>
        <Checkbox label='Air Conditioning' style={{margin: "0.5em"}} onChange={handleCheckbox} checked={roomOptions.airConditioning}/>
        <Checkbox label='Refrigerator' style={{margin: "0.5em"}} onChange={handleCheckbox} checked={roomOptions.refrigerator}/>
        <Checkbox label='Coffee Maker' style={{margin: "0.5em"}} onChange={handleCheckbox} checked={roomOptions.cofeeMaker}/>


      </Form.Field>
      <FileInput uploadImage={uploadRoomImage} dataName={"roomImage"} state={ roomState } />
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
      <Form.Field>
        <Button 
          inverted
          color="blue"
          style={{marginTop: "0.5em"}}
          content='Save All'
          onClick={handleFormSubmit}
        />
      </Form.Field>
     
     
    </Form>
  )
};


const mapDispatchToProps = (dispatch: Dispatch<RoomAction>) => {
  return {
    // image upload //
    _handleUploadRoomImage: (imageFile: FormData, currentRoomState: RoomState) => handleUploadRoomImage(dispatch, imageFile, currentRoomState),
    _handleDeleteRoomImage: (imageIdToDelete: string, currentRoomState: RoomState) => handleDeleteRoomImage(dispatch, imageIdToDelete, currentRoomState),
    // Room model CRUD actions //
    _handleCreateNewRoom: (newRoomFormData: ClientRoomFormData) => handleCreateNewRoom(dispatch, newRoomFormData),
    _handleUpdateRoom: (roomUpdateFormData: ClientRoomFormData, currentRoomState: RoomState) => handleUpdateRoom(dispatch, roomUpdateFormData, currentRoomState),
    _handleDeleteRoom: (roomIdToDelete: string, currentRoomState: RoomState) => handleDeleteRoom(dispatch, roomIdToDelete, currentRoomState)
  };
};

export default (connect(null, mapDispatchToProps)(RoomForm): React.AbstractComponent<OwnProps>);

