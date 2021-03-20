// @flow
import * as React from "react";
import { Icon, Image, Popup } from "semantic-ui-react";
// flow types //
import type { ServiceImgData } from "../../../redux/reducers/service/flowTypes";
// styles //
import styles from "./css/serviceImageThumb.module.css";
// helpers //
import { setImagePath } from "../../helpers/displayHelpers";

type Props = {
  serviceImage: ServiceImgData,
  handleImageDelete: (imgId: string) => void
}
const ServiceImageThumb = ({ serviceImage, handleImageDelete} : Props): React.Node => {
  return (
    <div className={ styles.serviceImageThumb }>
      <Popup 
        content="Delete Image"
        trigger={
          <span className={ styles.deleteIcon }>
            <i className={ `${"fas fa-trash-alt"}`} onClick={() => handleImageDelete(serviceImage._id)} />
          </span>
        }
      />
     
      <Image src={setImagePath(serviceImage.path)} size="small"></Image>
    </div>
  )
};

export default ServiceImageThumb;