// @flow
import * as React from "react";
// styles and css //
import styles from "./css/flipImgComponent.module.css";
// types //
import type { GenericImgData } from "../../../redux/reducers/_helpers/createReducer";
type Props = {
  genericImgData: GenericImgData
};

export const flipImgComponent = ({ genericImgData }: Props): React.Node => {

  return (
    <div className={ `${styles.flipImgComponent}` }>
      <div className={ `${styles.flipImgComponentInner}` }>
        <div className={ `${styles.flipCardFront} `}>
          <img src="https://www.w3schools.com/" alt="Avatar" />
        </div>
        <div className={ `${styles.flipCardBack}` }>
          <img src="https://www.w3schools.com/" alt="Avatar" />
        </div>
      </div>
    </div>
  );
};