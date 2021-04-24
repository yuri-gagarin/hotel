// @flow 
import * as React from "react";
// styles and css //
import styles from "./css/animatedBorder.module.css";

type Props = {
  animationDelay?: number
};
type LocalState = {
  fireBorderAnimation: boolean
};

export const AnimatedBorder = ({ animationDelay } : Props): React.Node => {
  const [ localState, setLocalState ] = React.useState<LocalState>({ fireBorderAnimation: false });
  React.useEffect(() => {
    let animationTimeout: any;
    if (animationDelay) {
      animationTimeout = setTimeout(() => {
        setLocalState({ fireBorderAnimation: true });
      }, animationDelay);
    } else {
      setLocalState({ fireBorderAnimation: true });
    }
    return () => {
      clearTimeout(animationTimeout);
    }
  }, []);
  return (
    <div className={ ` ${styles.animatedBorder} ${localState.fireBorderAnimation ? styles.animateBorder : "" } ` }></div>
  )
};
