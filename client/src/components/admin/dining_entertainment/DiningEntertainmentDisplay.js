// @flow
import * as React from "react";
import { Button, Header, Image, Segment } from "semantic-ui-react";
// types //
import type { DiningEntModelData, DiningEntertainmentState } from "../../../redux/reducers/dining_entertainment/flowTypes";
// styles and css //
import styles from "./css/diningEntertainmentDisplay.module.css";
// helpers //
import { setImagePath } from "../../helpers/displayHelpers";

type Props = {
  diningEntState: DiningEntertainmentState,
}
const DiningEntertainmentDisplay = ({ diningEntState }: Props): React.Node => {
  // local form state //
  const { diningEntModelData } = diningEntState;
  
  return (
    <div>
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
      </div>
      <div className={ styles.descriptionWrapper }>
        <h5>Description</h5>
        <p className={ styles.diningModelDescription }>{diningEntModelData.description}</p>
      </div>
      <div className={ styles.imgsPreviewDiv }>
        <span>Uploaded menu images:</span>
        {
          diningEntModelData.menuImages.length > 0
          ? 
          diningEntModelData.menuImages.map((imgData) => {
            return <Image key={imgData._id} className={ styles.diningModelImage } size='medium' src={ setImagePath(imgData.path) } />
          })
          : 
          <Segment className={ styles.imgPreviewDefaultSegment }>
            <span>No menu images uploaded...</span>
            <i className="far fa-image"></i>
          </Segment>
        }
      </div>
      <div className={ styles.imgsPreviewDiv }>
        <span>Uploaded general images: </span>
        {
          diningEntModelData.images.length > 0
          ?
          diningEntModelData.images.map((imgData) => {
            return <Image key={imgData._id} className={ styles.diningModelImage } size='medium' src={ setImagePath(imgData.path) } />
          })
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