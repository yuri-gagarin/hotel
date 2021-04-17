// @flow 
import * as React from "react";
import PropTypes from "prop-types";
import { Button, Checkbox, Form, Input, Popup, TextArea } from "semantic-ui-react";
// additional component imports  //
import { ConfirmDeleteModal } from "../shared/ConfirmDeleteModal";
import FileInput from "./FileInput";
import { FormErrorMessages } from "../shared/FormErrorMessages";
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
import { checkFormErrors } from "./helpers/checkFormErrors";
import { setImagePath, objectValuesEmpty } from "../../helpers/displayHelpers";

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
  areaError: string,
  sleepsError: string,
  priceError: string,
  bedsError: string,
  couchesError: string,
  descriptionError: string
};
 export type LocalFormState = ClientRoomFormData & FormErrors;
type ImageModalState = { imgModalOpen: boolean, openImageURL: string };
type ConfirmDeleteModalState = { 
  confirmDelModalOpen: boolean,
  modelIdToDelete: string, 
  modelToDelete: "room" | "roomImage" | ""
};  
type FormErrorStrate = {
  visible: boolean,
  errorMessages: Array<string>
};

const RoomForm = (props: Props): React.Node => {
  const { roomState, history, toggleEditModal } = props;
  const { roomData, roomImages } = roomState;
  const { _handleUploadRoomImage, _handleDeleteRoomImage, _handleCreateNewRoom, _handleUpdateRoom, _handleDeleteRoom, _handleDeleteAllRoomImages } = props;
  // local form state //
  const [ localFormState, setLocalFormState ] = React.useState<LocalFormState>({ 
    ...roomData, roomTypeError: "", areaError: "", sleepsError: "", priceError: "", bedsError: "", couchesError: "", descriptionError: "" 
  });
  const [ imageModalState, setImageModalState ] = React.useState<ImageModalState>({ imgModalOpen: false, openImageURL: "" });
  const [ confirmModalState, setConfirmModalState ] = React.useState<ConfirmDeleteModalState>({ confirmDelModalOpen: false, modelIdToDelete: "", modelToDelete: "" });
  const [ formErrorState, setFormErrorState ] = React.useState<FormErrorStrate>({ visible: false, errorMessages: [] });
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
      setLocalFormState({ ...localFormState, area: data.value, areaError: "Please enter a room area..." });
    } else {
      setLocalFormState({ ...localFormState, area: data.value, areaError: "" });
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
      setLocalFormState({ ...localFormState, description: data.value, descriptionError: "Please enter a short description..." });
    } else {
      setLocalFormState({ ...localFormState, description: data.value, descriptionError: "" });
    }
  };
  // END text input handlers //
  // checkbox handler //
  const handleCheckbox = (e,  data) => {
    const { label, checked } = data;
    console.log(label)
    switch(label) {
      case "Private Bathroom": {
        setLocalFormState((state) => {
          return checked ? { ...state, options: { ...state.options, privateBathroom: true } } : { ...state, options: { ...state.options, privateBathroom: false } };
        });
        break;
      }
      case "Suite Bathroom": {
        setLocalFormState((state) => {
          return checked ? { ...state, options: { ...state.options, suiteBathroom: true } } : { ...state, options: { ...state.options, suiteBathroom: false } };
        });
        break;
      } 
      case "Jacuzzi": {
        setLocalFormState((state) => {
          return checked ? { ...state, options: { ...state.options, jacuzzi: true } } : { ...state, options: { ...state.options, jacuzzi: false } };
        });
        break;
      } 
      case "Balcony": {
        setLocalFormState((state) => {
          return checked ? { ...state, options: { ...state.options, balcony: true } } : { ...state, options: { ...state.options, balcony: false } };
        })
        break;
      } 
      case "Terrace": {
        setLocalFormState((state) => {
          return checked ? { ...state, options: { ...state.options, terrace: true } } : { ...state, options: { ...state.options, terrace: false } };
        })
        break;
      }
      case "Mountain View": {
        setLocalFormState((state) => {
          return checked ? { ...state, options: { ...state.options, mountainView: true } } : { ...state, options: { ...state.options, mountainView: false } };
        })
        break;
      } 
      case "Street View": {
        setLocalFormState((state) => {
          return checked ? { ...state, options: { ...state.options, streetView: true } } : { ...state, options: { ...state.options, streetView: false } };
        })
        break;
      } 
      case "River View": {
        setLocalFormState((state) => {
          return checked ? { ...state, options: { ...state.options, riverView: true } } : { ...state, options: { ...state.options, riverView: false } };
        })
        break;
      }
      case "TV": {
        setLocalFormState((state) => {
          return checked ? { ...state, options: { ...state.options, tv: true } } : { ...state, options: { ...state.options, tv: false } };
        })
        break;
      }
      case "WiFi": {
        setLocalFormState((state) => {
          return checked ? { ...state, options: { ...state.options, wifi: true } } : { ...state, options: { ...state.options, wifi: false } };
        })
        break;
      }
      case "Phone": {
        setLocalFormState((state) => {
          return checked ? { ...state, options: { ...state.options, phone: true } } : { ...state, options: { ...state.options, phone: false } };
        })
        break;
      }
      case "Air Conditioning": {
        setLocalFormState((state) => {
          return checked ? { ...state, options: { ...state.options, airConditioning: true } } : { ...state, options: { ...state.options, airConditioning: false } };
        })
        break;
      }
      case "Refrigerator": {
        setLocalFormState((state) => {
          return checked ? { ...state, options: { ...state.options, refrigerator: true } } : { ...state, options: { ...state.options, refrigerator: false } };
        })
        break;
      }
      case "Coffee Maker": {
        setLocalFormState((state) => {
          return checked ? { ...state, options: { ...state.options, coffeeMaker: true } } : { ...state, options: { ...state.options, coffeeMaker: false } };
        })
        break;
      }
    };
  };
  // END checkbox handler //
  const handleFormSubmit = () => {
    const { _id: roomId } = roomData;
    const { createdRooms, roomImages } = roomState;

    // check for errors first //
    const { valid, errors } = checkFormErrors(localFormState);
    if (!valid && errors.length > 0) {
      setFormErrorState({ visible: true, errorMessages: errors });
      return;
    } 

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
  };

  const dismissFormErrorMessages = () => {
    setFormErrorState({ visible: false, errorMessages: [] });
  };

  const toggleImageModal = (imgPath?: string) => {
    setImageModalState({ imgModalOpen: !imageModalState.imgModalOpen, openImageURL: imgPath ? setImagePath(imgPath) : "" });
  };

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
      {
        formErrorState.visible ? <FormErrorMessages visible={ formErrorState.visible } errorMessages={ formErrorState.errorMessages } handleErrorMessageDismiss={ dismissFormErrorMessages } /> : null
      }
      <div className={ styles.formDiv }>
        <Form>
          <Form.Group widths='equal'>
            <Form.Field
              error={ localFormState.roomTypeError ? { content: localFormState.roomTypeError } : null }
              control={Input}
              label='Room Type'
              placeholder='...type of room'
              onChange={handleRoomType}
              value={ localFormState.roomType }
            />
            <Form.Field
              error={ localFormState.areaError ? { content: localFormState.areaError } : null }
              control={Input}
              label='Area'
              placeholder='...only numbers please'
              onChange={handleRoomArea}
              value={ localFormState.area }
            />
            <Form.Field
              error={ localFormState.sleepsError ? { content: localFormState.sleepsError } : null }
              control={Input}
              label="Sleeps"
              placeholder='...how many people it sleeps'
              onChange={handleSleeps}
              value={ localFormState.sleeps }
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field
              error={ localFormState.priceError ? { content: localFormState.priceError } : null }
              control={Input}
              label='Price from'
              placeholder='...price from (optional)'
              onChange={handlePrice}
              value={ localFormState.price }

            />
            <Form.Field
              error={ localFormState.bedsError ? { content: localFormState.bedsError } : null }
              control={Input}
              label='Beds'
              placeholder='...number of beds'
              onChange={handleBeds}
              value={ localFormState.beds }

            />
            <Form.Field
              error={ localFormState.couchesError ? { content: localFormState.couchesError } : null }
              control={Input}
              label="Couches"
              placeholder='...number of couches'
              onChange={handleCouches}
              value={ localFormState.couches }
            />
          </Form.Group>
          <Form.Field
            className={ styles.descriptionTextInput }
            error={ localFormState.couchesError ? { content: localFormState.couchesError } : null }
            control={TextArea}
            label='Description of the Room'
            placeholder='...description of the room here'
            onChange={handleDescriptionChange}
            value={ localFormState.description }

          />
          <div className={ styles.optionsDiv }>
            <Form.Field>
              <Checkbox label='Private Bathroom' style={{margin: "0.5em"}} onChange={handleCheckbox} checked={ localFormState.options.privateBathroom } className={ localFormState.options.privateBathroom ? styles.optionChecked : styles.optionNotChecked }/>
              <Checkbox label='Suite Bathroom' style={{margin: "0.5em"}} onChange={handleCheckbox} checked={ localFormState.options.suiteBathroom } className={ localFormState.options.suiteBathroom ? styles.optionChecked: styles.optionNotChecked } />
              <Checkbox label='Jacuzzi' style={{margin: "0.5em"}} onChange={handleCheckbox} checked={ localFormState.options.jacuzzi } className={ localFormState.options.jacuzzi ? styles.optionChecked : styles.optionNotChecked } />
              <Checkbox label='Balcony' style={{margin: "0.5em"}} onChange={handleCheckbox} checked={ localFormState.options.balcony } className={ localFormState.options.balcony ? styles.optionChecked : styles.optionNotChecked }/>
              <Checkbox label='Terrace' style={{margin: "0.5em"}} onChange={handleCheckbox} checked={ localFormState.options.terrace } className={ localFormState.options.terrace ? styles.optionChecked : styles.optionNotChecked } />
              <Checkbox label='Mountain View' style={{margin: "0.5em"}} onChange={handleCheckbox} checked={ localFormState.options.mountainView } className={ localFormState.options.mountainView ? styles.optionChecked : styles.optionNotChecked } />
              <Checkbox label='Street View' style={{margin: "0.5em"}} onChange={handleCheckbox} checked={ localFormState.options.streetView } className={ localFormState.options.streetView ? styles.optionChecked : styles.optionNotChecked }/>
              <Checkbox label='River View' style={{margin: "0.5em"}} onChange={handleCheckbox} checked={ localFormState.options.riverView } className={ localFormState.options.riverView ? styles.optionChecked : styles.optionNotChecked } />
              <Checkbox label='TV' style={{margin: "0.5em"}} onChange={handleCheckbox} checked={ localFormState.options.tv } className={ localFormState.options.tv ? styles.optionChecked : styles.optionNotChecked } />
              <Checkbox label='WiFi' style={{margin: "0.5em"}} onChange={handleCheckbox} checked={ localFormState.options.wifi } className={ localFormState.options.wifi ? styles.optionChecked : styles.optionNotChecked } />
              <Checkbox label='Phone' style={{margin: "0.5em"}} onChange={handleCheckbox} checked={ localFormState.options.phone } className={ localFormState.options.phone ? styles.optionChecked : styles.optionNotChecked } />
              <Checkbox label='Air Conditioning' style={{margin: "0.5em"}} onChange={handleCheckbox} checked={ localFormState.options.airConditioning } className={ localFormState.options.airConditioning ? styles.optionChecked : styles.optionNotChecked } />
              <Checkbox label='Refrigerator' style={{margin: "0.5em"}} onChange={handleCheckbox} checked={ localFormState.options.refrigerator } className={ localFormState.options.refrigerator ? styles.optionChecked : styles.optionNotChecked } />
              <Checkbox label='Coffee Maker' style={{margin: "0.5em"}} onChange={handleCheckbox} checked={ localFormState.options.coffeeMaker } className={ localFormState.options.coffeeMaker ? styles.optionChecked : styles.optionNotChecked } />
            </Form.Field>
          </div>
          <div className={ styles.imageUploadInputDiv }>
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
          </div>
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

