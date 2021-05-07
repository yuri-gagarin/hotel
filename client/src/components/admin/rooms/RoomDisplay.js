// @flow
import * as React from "react";
import { Button, Grid, Image, Item, Segment, Container } from "semantic-ui-react";
// additional component imports //
import GenericImgModal from "../shared/GenericImgModal";
import { GeneralNoModelsSegment } from "../shared/GeneralNoModelsSegment";
import { PreviewImagesCarousel } from "../shared/PreviewImagesCarousel";
// types //
import type { RoomData, RoomState } from "../../../redux/reducers/rooms/flowTypes";
// styles and css //
import styles from "./css/roomDisplay.module.css";
// helpers //
import { setImagePath } from "../../helpers/displayHelpers";

type Props = {
  roomState: RoomState,
}
type ImgModalState = {
  imgModalOpen: boolean,
  imgURL: string
}

const RoomDisplay = ({ roomState } : Props): React.Node => {
  // local form state //
  const { roomData } = roomState;
  const [ imgModalState, setImgModalState ] = React.useState<ImgModalState>({ imgModalOpen: false, imgURL: "" });

  const toggleImageModal = (imagePath?: string) => {
    setImgModalState({ imgModalOpen: !imgModalState.imgModalOpen, imgURL: imagePath ? setImagePath(imagePath) : "" });
  };

  return (
    <div className={ styles.container }>
      <GenericImgModal open={ imgModalState.imgModalOpen } imgURL={ imgModalState.imgURL } handleClose={ toggleImageModal } />
      <h5 className={ styles.roomDetailsHeader }>Room Type:</h5>
      <div className={ styles.roomTypeDiv }>
        <h3>{ roomData.roomType }</h3>
      </div>
      <h5 className={ styles.roomDetailsHeader }>Room Details:</h5>
      <div className={ styles.roomDetailsDiv }>
        <div className={ styles.roomDetail }>
          Area: { roomData.area }
        </div>
        <div className={ styles.roomDetail }>
          Sleeps: { roomData.sleeps }
        </div>
        <div className={ styles.roomDetail }>
          Price: { roomData.price }
        </div>
        <div className={ styles.roomDetail }>
          Twin Beds: { roomData.twinBeds }
        </div>
        <div className={ styles.roomDetail }>
          Queen Beds: { roomData.queenBeds }
        </div><div className={ styles.roomDetail }>
          King Beds: { roomData.kingBeds }
        </div>
        <div className={ styles.roomDetail }>
          Couches: { roomData.couches }
        </div>
      </div>
      <h5 className={ styles.roomDetailsHeader }>Description:</h5>
      <div className={ styles.roomDescriptionWrapper }>
        <p>{ roomData.description }</p>
      </div>
      <h5 className={ styles.roomDetailsHeader }>Room Options:</h5>
      <div className={ styles.roomOptionsWrapper }>
        <div className={`${styles.roomOption} ${ roomData.options.privateBathroom ? styles.roomOptionAvailable : styles.roomOptionNotAvailable}`}>
          <i className="fas fa-toilet"></i>
          <span>Private Bathroom: { roomData.options.privateBathroom ? "Yes" : "No"}</span>
        </div>
        <div className={`${styles.roomOption} ${ roomData.options.suiteBathroom ? styles.roomOptionAvailable : styles.roomOptionNotAvailable}`}>
          <i className="fas fa-bath"></i>
          <span>Suite Bathroom: { roomData.options.suiteBathroom ? "Yes" : "No"}</span>
        </div>
        <div className={`${styles.roomOption} ${ roomData.options.fan ? styles.roomOptionAvailable : styles.roomOptionNotAvailable}`}>
          <i className="fas fa-fan"></i>
          <span>Fan: { roomData.options.fan ? "Yes" : "No"}</span>
        </div>
        <div className={`${styles.roomOption} ${ roomData.options.bathRobes ? styles.roomOptionAvailable : styles.roomOptionNotAvailable}`}>
            <i className="fas fa-shoe-prints"></i>
            <span>Bath Robes: { roomData.options.bathRobes ? "Yes" : "No"}</span>
        </div>
        <div className={`${styles.roomOption} ${ roomData.options.freeToileteries ? styles.roomOptionAvailable : styles.roomOptionNotAvailable}`}>
          <i className="fas fa-pump-soap"></i>          
          <span>Free Toileteries: { roomData.options.freeToileteries ? "Yes" : "No"}</span>
        </div>
        <div className={`${styles.roomOption} ${ roomData.options.jacuzzi ? styles.roomOptionAvailable : styles.roomOptionNotAvailable}`}>
          <i className="fas fa-hot-tub"></i>
          <span>Jacuzzi: { roomData.options.jacuzzi ? "Yes" : "No"}</span>
        </div>
        <div className={`${styles.roomOption} ${ roomData.options.balcony ? styles.roomOptionAvailable : styles.roomOptionNotAvailable}`}>
          <i className="fas fa-warehouse"></i>
          <span>Balcony: { roomData.options.balcony ? "Yes" : "No"}</span>
        </div>
        <div className={`${styles.roomOption} ${ roomData.options.terrace ? styles.roomOptionAvailable : styles.roomOptionNotAvailable}`}>
          <i className="fas fa-store"></i>
          <span>Terrace: { roomData.options.terrace ? "Yes" : "No"}</span>
        </div>
        <div className={`${styles.roomOption} ${ roomData.options.streetView ? styles.roomOptionAvailable : styles.roomOptionNotAvailable}`}>
          <i className="fas fa-road"></i>
          <span>Street View: { roomData.options.streetView ? "Yes" : "No"}</span>
        </div>
        <div className={`${styles.roomOption} ${ roomData.options.mountainView ? styles.roomOptionAvailable : styles.roomOptionNotAvailable}`}>
          <i className="fas fa-mountain"></i>
          <span>Mountain View: { roomData.options.mountainView ? "Yes" : "No"}</span>
        </div>
        <div className={`${styles.roomOption} ${ roomData.options.riverView ? styles.roomOptionAvailable : styles.roomOptionNotAvailable}`}>
          <i className="fas fa-water"></i>
          <span>River View: { roomData.options.riverView ? "Yes" : "No"}</span>
        </div>
        <div className={`${styles.roomOption} ${ roomData.options.tv ? styles.roomOptionAvailable : styles.roomOptionNotAvailable}`}>
          <i className="fas fa-tv"></i>
          <span>TV: { roomData.options.tv ? "Yes" : "No"}</span>
        </div>
        <div className={`${styles.roomOption} ${ roomData.options.wifi ? styles.roomOptionAvailable : styles.roomOptionNotAvailable}`}>
          <i className="fas fa-wifi"></i>
          <span>WiFi: { roomData.options.wifi ? "Yes" : "No"}</span>
        </div>
        <div className={`${styles.roomOption} ${ roomData.options.phone ? styles.roomOptionAvailable : styles.roomOptionNotAvailable}`}>
          <i className="fas fa-phone-volume"></i>
          <span>Phone: { roomData.options.phone ? "Yes" : "No"}</span>
        </div>
        <div className={`${styles.roomOption} ${ roomData.options.airConditioning ? styles.roomOptionAvailable : styles.roomOptionNotAvailable}`}>
          <i className="fas fa-wind"></i>
          <span>Air Conditioning: { roomData.options.airConditioning ? "Yes" : "No"}</span>
        </div>
        <div className={`${styles.roomOption} ${ roomData.options.refrigerator ? styles.roomOptionAvailable : styles.roomOptionNotAvailable}`}>
          <i className="fas fa-snowflake"></i>
          <span>Refrigerator: { roomData.options.refrigerator ? "Yes" : "No"}</span>
        </div>
        <div className={`${styles.roomOption} ${ roomData.options.coffeeMaker ? styles.roomOptionAvailable : styles.roomOptionNotAvailable}`}>
          <i className="fas fa-coffee"></i>
          <span>Coffee Maker: { roomData.options.coffeeMaker ? "Yes" : "No"}</span>
        </div>
        <div className={`${styles.roomOption} ${ roomData.options.teaKettle ? styles.roomOptionAvailable : styles.roomOptionNotAvailable}`}>
          <i className="fas fa-blender"></i>          
          <span>Tea Kettle: { roomData.options.teaKettle ? "Yes" : "No"}</span>
        </div>
        <div className={`${styles.roomOption} ${ roomData.options.freeParking ? styles.roomOptionAvailable : styles.roomOptionNotAvailable}`}>
          <i className="fas fa-car-alt"></i>
          <span>Free Parking: { roomData.options.freeParking ? "Yes" : "No"}</span>
        </div>
        <div className={`${styles.roomOption} ${ roomData.options.paidParking ? styles.roomOptionAvailable : styles.roomOptionNotAvailable}`}>
          <i className="fas fa-money-bill"></i> 
          <i className="fas fa-car-alt"></i>         
          <span>Paid Parking: { roomData.options.paidParking ? "Yes" : "No"}</span>
        </div>
      </div>
      <div className={ styles.imgsPreviewDiv }>
        {
          roomData.images.length > 0 
          ?
            <PreviewImagesCarousel images={ roomData.images } showDeleteIcons={ false } toggleImageModal={ toggleImageModal } />
          :
          <GeneralNoModelsSegment customHeaderMessage={ "No Room images uploaded" } customContentMessage={ "upload Room images by clicking 'Edit'" } />
        }
      </div>
    </div>
  );
};



export default RoomDisplay;