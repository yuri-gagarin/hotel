// @flow
import * as React from "react";
// styles and css //
import styles from "./css/flipImgComponent.module.css";
// types //
import type { GenericImgData } from "../../../redux/reducers/_helpers/createReducer";
// helpers //
import { setImagePath } from "../../helpers/displayHelpers";

type Props = {
  genericImgData: GenericImgData,
  triggerFlipAnimate: boolean
};

export const FlipImgComponent = ({ genericImgData, triggerFlipAnimate }: Props): React.Node => {

  return (
    <div className={ `${styles.flipImgComponent}` }>
      <div className={ `${styles.flipImgComponentInner} ${`triggerFlipAnimate ? styles.triggerRotateAnimation : ""`}` }>
        <div className={ `${styles.flipCardFront} `}>
          <img src="/assets/images/dining/restaurant_stock9.jpeg" alt="Avatar" />
        </div>
        <div className={ `${styles.flipCardBack}` }>
          <img src="/assets/images/dining/restaurant_stock10.jpeg" alt="Avatar" />
        </div> 
      </div>
    </div>
  );
};