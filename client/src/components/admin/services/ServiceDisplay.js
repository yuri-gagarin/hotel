// @flow
import * as React from "react";
// semantic ui react //
import { Button, Header, Icon, Image, Modal, Segment, Popup } from "semantic-ui-react";
// additional component imports //
import GenericImgModal from "../shared/GenericImgModal";
import { PreviewImagesCarousel } from "../shared/PreviewImagesCarousel";
// types //
import type { ServiceState, ServiceData } from "../../../redux/reducers/service/flowTypes";
import type { RouterHistory } from "react-router-dom";
// styles //
import styles from "./css/serviceDisplay.module.css";
// helpers //
import { setImagePath } from "../../helpers/displayHelpers";

type Props = {
  serviceState: ServiceState
}
type ImgModalState = {
  imgModalOpen: boolean,
  imgURL: string
}
const ServiceDisplay = ({ serviceState } : Props): React.Node => {
  const [ imgModalState, setImgModalState ] = React.useState<ImgModalState>({ imgModalOpen: false, imgURL: "" });
  const { serviceData } = serviceState;

  const toggleImageModal = (imagePath?: string): void => {

  }

  return (
    <div className={ styles.container }>
      <GenericImgModal open={ imgModalState.imgModalOpen } imgURL={ imgModalState.imgURL } handleClose={ toggleImageModal } />
      <div className={ styles.serviceDetailsDiv }>
        <h5>Details</h5>
        <div className={ styles.serviceDetail }><small>Type:</small><strong>{ serviceData.serviceType }</strong></div>
        <div className={ styles.serviceDetail }><small>Hours:</small><strong>{ serviceData.hours }</strong></div>
        <div className={ styles.serviceDetail }><small>Price:</small><strong>{ serviceData.price }</strong></div>
      </div>
      <div className={ styles.serviceDescriptionDiv }>
        <h5>Description</h5>
        <p>{ serviceData.description }</p>
      </div>
      <div className={ styles.serviceImagesPreviewDiv }>
        {
          serviceData.images.length > 0 
          ?
          <React.Fragment>
             <div className={ styles.imgsPreviewDivHeader }>
              <span>Uploaded service images:</span>
              <div>{ serviceData.images.length }</div>
            </div>
            <PreviewImagesCarousel 
              showDeleteIcons={ false }
              images={ serviceData.images } 
              toggleImageModal= { toggleImageModal } 
            />
          </React.Fragment>  
          : 
          <Segment className={ styles.imgPreviewDefaultSegment }>
            <span>No service images uploaded...</span>
            <i className="far fa-image"></i>
          </Segment>
        }
      </div>
    </div>
  );
};

export default ServiceDisplay;