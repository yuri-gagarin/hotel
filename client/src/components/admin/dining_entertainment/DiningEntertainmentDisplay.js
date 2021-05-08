// @flow
import * as React from "react";
import { Button, Header, Image, Segment } from "semantic-ui-react";
// types //
import type { DiningEntModelData, DiningEntertainmentState } from "../../../redux/reducers/dining_entertainment/flowTypes";
// additonal components //
import { PreviewImagesCarousel } from "../shared/PreviewImagesCarousel";
import GenericImgModal from "../shared/GenericImgModal";
// styles and css //
import styles from "./css/diningEntertainmentDisplay.module.css";
// helpers //
import { setImagePath } from "../../helpers/displayHelpers";

type Props = {
  diningEntState: DiningEntertainmentState,
}
type ImgModalState = {
  imgModalOpen: boolean,
  imgURL: string
}

const DiningEntertainmentDisplay = ({ diningEntState }: Props): React.Node => {
  // local form state //
  const { diningEntModelData } = diningEntState;
  const [ imgModalState, setImgModalState ] = React.useState<ImgModalState>({ imgModalOpen: false, imgURL: "" });
  
  const toggleImageModal = (imagePath?: string): void => {

  }
  return (
    <div className={ styles.container }>
      <GenericImgModal open={ imgModalState.imgModalOpen } imgURL={ imgModalState.imgURL } handleClose={ toggleImageModal } />
      <div className={ styles.detailsDivsWrapper }>
        <h5>Details</h5>
        <div className={ styles.detailsDiv }>
          <span>Title: </span>
          <span>{ diningEntModelData.title }</span>
          
        </div>
        <div className={ styles.detailsDiv }>
          <span><i className="far fa-clock"></i>Hours: </span>
          <span>{ diningEntModelData.hours }</span>
        </div>
        <div className={ styles.detailsDiv }>
          <span>Type: </span>
          <span>{ diningEntModelData.optionType }</span>
        </div>
        <div className={ styles.detailsDiv }>
          <span>Address: </span>
          <span>{ diningEntModelData.address }</span>
        </div>
        <div className={ styles.detailsDiv }>
          <span>Instagram URL: </span>
          <span>{ diningEntModelData.instagramURL }</span>
        </div>
        <div className={ styles.detailsDiv }>
          <span>Facebook URL: </span>
          <span>{ diningEntModelData.facebookURL }</span>
        </div>
        <div className={ styles.detailsDiv }>
          <span>Phone number: </span>
          <span>{ diningEntModelData.phoneNumber }</span>
        </div>
      </div>
      <div className={ styles.descriptionWrapper }>
        <h5>Description</h5>
        <p className={ styles.diningModelDescription }>{diningEntModelData.description}</p>
      </div>
      <div className={ styles.imgsPreviewDiv }>
        {
          diningEntModelData.menuImages.length > 0
          ? 
          <React.Fragment>
             <div className={ styles.imgsPreviewDivHeader }>
              <span>Uploaded menu images:</span>
              <div>{ diningEntModelData.menuImages.length }</div>
            </div>
            <PreviewImagesCarousel 
              showDeleteIcons={ false }
              images={ diningEntModelData.menuImages } 
              toggleImageModal= { toggleImageModal } 
            />
          </React.Fragment>  
          : 
          <Segment className={ styles.imgPreviewDefaultSegment }>
            <span>No menu images uploaded...</span>
            <i className="far fa-image"></i>
          </Segment>
        }
      </div>
      <div className={ styles.imgsPreviewDiv }>
        {
          diningEntModelData.images.length > 0
          ?
          <React.Fragment>
            <div className={ styles.imgsPreviewDivHeader }>
              <span>Uploaded general images:</span> 
              <div>{diningEntModelData.images.length }</div>
            </div>
            <PreviewImagesCarousel 
              showDeleteIcons={ false }
              images={ diningEntModelData.images }
              toggleImageModal={ toggleImageModal } 
            />
          </React.Fragment>
         
          : 
          <Segment className={ styles.imgPreviewDefaultSegment }>
            <span>No general images upoaded...</span>
            <i className="far fa-image"></i>
          </Segment>
        }
      </div>
    </div>
  );
};

export default DiningEntertainmentDisplay;