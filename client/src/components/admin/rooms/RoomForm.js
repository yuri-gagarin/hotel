// @flow 
import * as React from "react";
import PropTypes from "prop-types";
import { Button, Checkbox, Form, Input, Popup, TextArea } from "semantic-ui-react";
// additional component imports  //
import { ConfirmDeleteModal } from "../shared/ConfirmDeleteModal";
import FileInput from "./FileInput";
import GenericImgModal from "../shared/GenericImgModal";
import { GeneralNoModelsSegment } from "../shared/GeneralNoModelsSegment";
import ModelDeleteBtn from "../shared/ModelDeleteBtn";
import { PreviewImagesCarousel } from "../shared/PreviewImagesCarousel";
import RoomImageThumb from "./RoomImages";

// redux imports  //
import { connect } from "react-redux";
import { handleUploadRoomImage, handleDeleteRoomImage, handleCreateNewRoom, handleUpdateRoom, handleDeleteRoom, handleDeleteAllRoomImages } from "../../../redux/actions/roomActions";
// type imports //
import type { Dispatch } from "../../../redux/reducers/_helpers/createReducer";
import type { ClientRoomFormData, RoomState, RoomData, RoomImgData, RoomAction } from "../../../redux/reducers/rooms/flowTypes";
import type { RouterHistory } from "react-router-dom";
// css 
import styles from "./css/roomForm.module.css";
// helpers //
import { setImagePath } from "../../helpers/displayHelpers";
import {  objectValuesEmpty } from "../../helpers/componentHelpers";

type OwnProps = {
  roomState: RoomState,
  history: RouterHistory,
  toggleEditModal?: () => void
};
type Props = {
  ...OwnProps,
  _handleUploadRoomImage: <RoomState>(imageFile: FormData, currentRoomState: RoomState) => Promise<boolean>,
  _handleDeleteRoomImage: (imageIdToDelete: string, currentRoomState: RoomState) => Promise<boolean>,
  // model CRUD //
  _handleCreateNewRoom: (newRoomFormData: ClientRoomFormData) => Promise<boolean>,
  _handleUpdateRoom: (roomUpdateFormData: ClientRoomFormData, currentRoomState: RoomState) => Promise<boolean>,
  _handleDeleteRoom: (roomIdToDelete: string, currentRoomState: RoomState) => Promise<boolean>,
  //
  _handleDeleteAllRoomImages: (currentRoomState: RoomState) => Promise<boolean>
};

type FormErrors = {
  roomTypeError: string,
  descriptionError: string
};
type LocalFormState = ClientRoomFormData & FormErrors;
type ImageModalState = { imgModalOpen: boolean, openImageURL: string };
type ConfirmDeleteModalState = { 
  confirmDelModalOpen: boolean,
  modelIdToDelete: string, 
  modelToDelete: "room" | "roomImage" | ""
};  

const RoomForm = (props: Props): React.Node => {
  const { roomState, history, toggleEditModal } = props;
  const { roomData, roomImages } = roomState;
  const { _handleUploadRoomImage, _handleDeleteRoomImage, _handleCreateNewRoom, _handleUpdateRoom, _handleDeleteRoom, _handleDeleteAllRoomImages } = props;
  // local form state //
  const [ localFormState, setLocalFormState ] = React.useState<LocalFormState>({ ...roomData, roomTypeError: "", descriptionError: "" });
  const [ imageModalState, setImageModalState ] = React.useState<ImageModalState>({ imgModalOpen: false, openImageURL: "" });
  const [ confirmModalState, setConfirmModalState ] = React.useState<ConfirmDeleteModalState>({ confirmDelModalOpen: false, modelIdToDelete: "", modelToDelete: "" });
  
  // text input handlers //
  const handleRoomType = (e, data) => {
    if (data.value.length === 0) {
      setLocalFormState({ ...localFormState, roomType: data.value, roomTypeError: "Please enter a room type..." });
    } else {
      setLocalFormState({ ...localFormState, roomType: data.value, roomTypeError: "" });
    }
  };
  const handleRoomArea = (e, data) => {
    if (data.value.length === 0) {
      setLocalFormState({ ...localFormState, area: data.value, roomAreaError: "Please enter a room area..." });
    } else {
      setLocalFormState({ ...localFormState, roomType: data.value, roomAreaError: "" });
    }
  };
  const handleSleeps = (e, data) => {
    if (data.value.length === 0) {
      setLocalFormState({ ...localFormState, sleeps: data.value, sleepsError: "Please enter how many people room sleeps..."});
    } else {
      setLocalFormState({ ...localFormState, sleeps: data.value, sleepsError: "" });
    }
  };
  const handlePrice = (e, data) => {
    if (data.value.length === 0) {
      setLocalFormState({ ...localFormState, price: data.value, priceError: "Please enter a from price..."})
    } else {
      setLocalFormState({ ...localFormState, price: data.value, priceError: "" });
    }
  };
  const handleBeds = (e, data) => {
    if (data.value.length === 0) {
      setLocalFormState({ ...localFormState, beds: data.value, bedsError: "Please enter the number of beds..." });
    } else {
      setLocalFormState({ ...localFormState, beds: data.value, bedsError: "" });
    }
  };
  const handleCouches = (e, data) => {
    if (data.value.length === 0) {
      setLocalFormState({ ...localFormState, couches: data.value, couchesError: "Please enter number of couches in room..." });
    } else {
      setLocalFormState({ ...localFormState, couches: data.value, couchesError: "" });
    }
  };
  const handleDescriptionChange = (e, data) => {
    if (data.value.length === 0) {
      setLocalFormState({ ...localFormState, description: data.value, descriptionError: "" });
    } else {
      setLocalFormState({ ...localFormState, description: data.value, descriptionError: "" });
    }
  };
  // END text input handlers //
  // checkbox handler //
  const handleCheckbox = (e,  data) => {
    const { label, checked } = data;
    switch(label) {
      case "Bathroom": {
        setLocalFormState((state) => {
          return checked ? { ...state, privateBathroom: true } : { ...state, privateBathroom: false };
        });
        break;
      }
      case "Suite Bathroom": {
        setLocalFormState((state) => {
          return checked ? { ...state, suiteBathroom: true } : { ...state, suiteBathroom: false };
        });
        break;
      } 
      case "Jacuzzi": {
        setLocalFormState((state) => {
          return checked ? { ...state, jacuzzi: true } : { ...state, jacuzzi: false };
        });
        break;
      } 
      case "Balcony": {
        setLocalFormState((state) => {
          return checked ? { ...state, balcony: true } : { ...state, balcony: false };
        })
        break;
      } 
      case "Terrace": {
        setLocalFormState((state) => {
          return checked ? { ...state, terrace: true } : { ...state, terrace: false };
        })
        break;
      }
      case "Mountain View": {
        setLocalFormState((state) => {
          return checked ? { ...state, mountainView: true } : { ...state, mountainView: false };
        })
        break;
      } 
      case "Street View": {
        setLocalFormState((state) => {
          return checked ? { ...state, streetView: true } : { ...state, streetView: false };
        })
        break;
      } 
      case "River View": {
        setLocalFormState((state) => {
          return checked ? { ...state, riverView: true } : { ...state, riverView: false };
        })
        break;
      }
      case "TV": {
        setLocalFormState((state) => {
          return checked ? { ...state, tv: true } : { ...state, tv: false };
        })
        break;
      }
      case "WiFi": {
        setLocalFormState((state) => {
          return checked ? { ...state, wifi: true } : { ...state, wifi: false };
        })
        break;
      }
      case "Phone": {
        setLocalFormState((state) => {
          return checked ? { ...state, phone: true } : { ...state, phone: false };
        })
        break;
      }
      case "Air Conditioning": {
        setLocalFormState((state) => {
          return checked ? { ...state, airConditioning: true } : { ...state, airConditioning: false };
        })
        break;
      }
      case "Refrigerator": {
        setLocalFormState((state) => {
          return checked ? { ...state, refrigerator: true } : { ...state, refrigerator: false };
        })
        break;
      }
      case "Coffee Maker": {
        setLocalFormState((state) => {
          return checked ? { ...state, coffeeMaker: true } : { ...state, coffeeMaker: false };
        })
        break;
      }
    };
  };
  // END checkbox handler //
  const handleFormSubmit = () => {
    const { _id: roomId } = roomData;
    const { createdRooms, roomImages } = roomState;

    // handle some error checking late //
    const roomImgIds = roomState.roomImages.map((img) => img._id );
    const clientRoomFormData: ClientRoomFormData = {
      ...localFormState,
      images: [ ...roomImages ]
    }
    if (!roomId) {
      // new room being created //
      _handleCreateNewRoom(clientRoomFormData)
        .then((success) => { if (success) history.push("/admin/rooms") });
    } else {
      // existing room being edited with existing data //
      _handleUpdateRoom(clientRoomFormData, roomState)  
        .then((success) => { if (success && toggleEditModal) toggleEditModal() })
    }
  };  

  const handleFormCancel = () => {
    if (toggleEditModal && !objectValuesEmpty(roomData)) {
      toggleEditModal();
    } else {
      if (roomImages.length > 0) {
        _handleDeleteAllRoomImages(roomState)
          .then((success) => {
            if (success) history.goBack();
          });
      } else {
        history.goBack();
      }
    }
  }

  const toggleImageModal = (imgPath?: string) => {
    setImageModalState({ imgModalOpen: !imageModalState.imgModalOpen, openImageURL: imgPath ? setImagePath(imgPath) : "" });
  }

  // delete functionality and triggers //
  // Room model delete functionality //
  const triggerRoomDelete = (roomIdToDelete: string) => {
    setConfirmModalState({ confirmDelModalOpen: true, modelIdToDelete: roomIdToDelete, modelToDelete: "room" });
  };
  // RoomImage model delete functionality //
  const triggerRoomImageDelete = (imageIdToDelete: string) => {
    setConfirmModalState({ confirmDelModalOpen: true, modelIdToDelete: imageIdToDelete, modelToDelete: "roomImage" });
  };
  // confirm delete function //
  const handleDeleteConfirm = () => {
    const { confirmDelModalOpen, modelIdToDelete, modelToDelete } = confirmModalState;
    if (modelToDelete === "room") {
      return _handleDeleteRoom(modelIdToDelete, roomState)
        .then((success) => { 
          if (success) setConfirmModalState({ confirmDelModalOpen: false, modelIdToDelete: "", modelToDelete: "" });
        });
    } else if (modelToDelete === "roomImage") {
      return _handleDeleteRoomImage(modelIdToDelete, roomState)
        .then((success) => { 
          if (success) setConfirmModalState({ confirmDelModalOpen: false, modelIdToDelete: "", modelToDelete: "" });
        })
    } else {
      return Promise.resolve();
    }
  };

  const handleDeleteCancel = () => {
    setConfirmModalState({ confirmDelModalOpen: false, modelIdToDelete: "", modelToDelete: "" });
  };


  return (
    <div className={ styles.roomFormWrapper }>
      <ConfirmDeleteModal 
        open={ confirmModalState.confirmDelModalOpen }
        modelName={ "room" }
        customHeader={ "Confirm Delete Action" }
        confirmAction={ handleDeleteConfirm }
        cancelAction= { handleDeleteCancel }
      />
      <GenericImgModal 
        open={ imageModalState.imgModalOpen }
        imgURL= { imageModalState.openImageURL }
        handleClose= { toggleImageModal }
      />
      <div className={ styles.formControlsDiv }>
        <Popup 
          content="Changes will not be saved"
          trigger={
            <Button inverted color="orange" icon="cancel" content="Cancel and Close" onClick={ handleFormCancel } />
          }
        />
        {
          objectValuesEmpty(roomData)
          ?
          <div className={ styles.formControls }>
            <Button style={{ height: "100%" }} inverted color="green" content="Create and Save" icon="save" onClick={ handleFormSubmit } />
          </div>
          :
          <div className={ styles.formControls }>
            <Button content="Update and Save" icon="save" onClick={ handleFormSubmit } />
            <ModelDeleteBtn modelId={ roomData._id } modelName="room" handleModelDelete={ triggerRoomDelete } />
          </div>
        }
      </div>
      <div className={ styles.formDiv }>
        <Form>
          <Form.Group widths='equal'>
            <Form.Field
              control={Input}
              label='Room Type'
              placeholder='...type of room'
              onChange={handleRoomType}
              value={ localFormState.roomType }
            />
            <Form.Field
              control={Input}
              label='Area'
              placeholder='...only numbers please'
              onChange={handleRoomArea}
              value={ localFormState.area }
            />
            <Form.Field
              control={Input}
              label="Sleeps"
              placeholder='...how many people it sleeps'
              onChange={handleSleeps}
              value={ localFormState.sleeps }
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field
              control={Input}
              label='Price from'
              placeholder='...price from (optional)'
              onChange={handlePrice}
              value={ localFormState.price }

            />
            <Form.Field
              control={Input}
              label='Beds'
              placeholder='...number of beds'
              onChange={handleBeds}
              value={ localFormState.beds }

            />
            <Form.Field
              control={Input}
              label="Couches"
              placeholder='...number of couches'
              onChange={handleCouches}
              value={ localFormState.couches }
            />
          </Form.Group>
          <Form.Field
            id='form-textarea-control-opinion'
            control={TextArea}
            label='Description of the Room'
            placeholder='...description of the room here'
            onChange={handleDescriptionChange}
            value={ localFormState.description }

          />
          <Form.Field>
            <Checkbox label='Private Bathroom' style={{margin: "0.5em"}} onChange={handleCheckbox} checked={ localFormState.options.privateBathroom }/>
            <Checkbox label='Suite Bathroom' style={{margin: "0.5em"}} onChange={handleCheckbox} checked={ localFormState.options.suiteBathroom } />
            <Checkbox label='Jacuzzi' style={{margin: "0.5em"}} onChange={handleCheckbox} checked={ localFormState.options.jacuzzi } />
            <Checkbox label='Balcony' style={{margin: "0.5em"}} onChange={handleCheckbox} checked={ localFormState.options.balcony } />
            <Checkbox label='Terrace' style={{margin: "0.5em"}} onChange={handleCheckbox} checked={ localFormState.options.terrace } />
            <Checkbox label='Mountain View' style={{margin: "0.5em"}} onChange={handleCheckbox} checked={ localFormState.options.mountainView } />
            <Checkbox label='Street View' style={{margin: "0.5em"}} onChange={handleCheckbox} checked={ localFormState.options.streetView } />
            <Checkbox label='River View' style={{margin: "0.5em"}} onChange={handleCheckbox} checked={ localFormState.options.riverView } />
            <Checkbox label='TV' style={{margin: "0.5em"}} onChange={handleCheckbox} checked={ localFormState.options.tv } />
            <Checkbox label='WiFi' style={{margin: "0.5em"}} onChange={handleCheckbox} checked={ localFormState.options.wifi } />
            <Checkbox label='Phone' style={{margin: "0.5em"}} onChange={handleCheckbox} checked={ localFormState.options.phone } />
            <Checkbox label='Air Conditioning' style={{margin: "0.5em"}} onChange={handleCheckbox} checked={ localFormState.options.airConditioning } />
            <Checkbox label='Refrigerator' style={{margin: "0.5em"}} onChange={handleCheckbox} checked={ localFormState.options.refrigerator } />
            <Checkbox label='Coffee Maker' style={{margin: "0.5em"}} onChange={handleCheckbox} checked={ localFormState.options.coffeeMaker } />


          </Form.Field>
          <FileInput uploadImage={ _handleUploadRoomImage } dataName={"roomImage"} modelState={ roomState } textContent={ "Upload room images..." } />
          { 
            roomImages.length > 0 
            ? 
            <PreviewImagesCarousel
              images={ roomImages }
              showDeleteIcons={ true }
              toggleImageModal={ toggleImageModal }
              triggerImgModelDelete={ triggerRoomImageDelete } 
            />
            : 
            <GeneralNoModelsSegment 
              customHeaderMessage={ "No Images uploaded" }
              customContentMessage={ "Upload any new room images here..." }
            />
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
      </div>
    </div>
  );
};


const mapDispatchToProps = (dispatch: Dispatch<RoomAction>) => {
  return {
    // image upload //
    _handleUploadRoomImage: (imageFile: FormData, currentRoomState: RoomState) => handleUploadRoomImage(dispatch, imageFile, currentRoomState),
    _handleDeleteRoomImage: (imageIdToDelete: string, currentRoomState: RoomState) => handleDeleteRoomImage(dispatch, imageIdToDelete, currentRoomState),
    // Room model CRUD actions //
    _handleCreateNewRoom: (newRoomFormData: ClientRoomFormData) => handleCreateNewRoom(dispatch, newRoomFormData),
    _handleUpdateRoom: (roomUpdateFormData: ClientRoomFormData, currentRoomState: RoomState) => handleUpdateRoom(dispatch, roomUpdateFormData, currentRoomState),
    _handleDeleteRoom: (roomIdToDelete: string, currentRoomState: RoomState) => handleDeleteRoom(dispatch, roomIdToDelete, currentRoomState),
    //
    _handleDeleteAllRoomImages: (currentRoomState: RoomState) => handleDeleteAllRoomImages(dispatch, currentRoomState)
  };
};

export default (connect(null, mapDispatchToProps)(RoomForm): React.AbstractComponent<OwnProps>);

