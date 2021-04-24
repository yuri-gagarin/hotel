// @flow 
import * as React from "react";
// styles and css //
import styles from "./css/animatedBorderButton.module.css";

type Props = {
  onClick: () => void
};

export const AnimatedBorderButton = ({ onClick } : Props): React.Node => {

  return (
    <button className={ styles.exploreBtn } onClick={ onClick }>
      Explore
      <div className={ styles.buttonHorizontal }></div>
      <div className={ styles.buttonVertical }></div>
    </button>
  );
};