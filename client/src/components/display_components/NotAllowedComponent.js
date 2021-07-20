// @flow 
import * as React from "react";
import styles from "./css/notAllowedComponent.module.css";

export const NotAllowedComponent = (): React.Node => {
  return (
    <div className={ styles.notAllowedCompWrapper }>
      <div className={ styles.notAllowedCompStatus }>401</div>
      <div className={ styles.notAllowedCompHeader }>Not Allowed</div>
      <div className={ styles.notAllowedCompContent }>Ooops it seems login is required..</div>
    </div>
  )
}