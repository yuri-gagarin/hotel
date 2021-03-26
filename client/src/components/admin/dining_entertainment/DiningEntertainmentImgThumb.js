// @flow
import * as React from "react";
import { Image, Icon } from "semantic-ui-react";
// styles and css //
import styles from "./css/diningEntertainmentImgThumb.module.css";
// types //
import type { DiningImgData } from "../../../redux/reducers/dining_entertainment/flowTypes";
// helpers //
import { setImagePath } from "../../helpers/displayHelpers";

type Props = {
  diningModelImage: DiningImgData,
  handleImageDelete: (imageIdToDelete: string) => Promise<boolean>
}
const DiningEntertainmentImageThumb = ({ diningModelImage, handleImageDelete } : Props): React.Node => {
  //
  return (
    <div className={ styles.diningModelImageThumbStyle }>
      <Icon className={ styles.deleteIconStyle }  name="trash" conClick={() => handleImageDelete(diningModelImage._id)}></Icon>
      <Image src={setImagePath(diningModelImage.path)} size="small"></Image>
    </div>
  )
};

export default DiningEntertainmentImageThumb;