// @flow 
import * as React from "react";
import { Button } from "react-bootstrap";
//
import type { RouterHistory } from "react-router-dom";
// styles //
import styles from "./css/clientNotFoundComponent.module.css";

type Props = {
  customMessage?: string;
  history: RouterHistory;
}
export const ClientNotFoundComponent = ({ customMessage, history }: Props): React.Node => {

  const handleGoBack = () => {
    history.goBack();
  }
  return (
    <div className={ styles.notFoundDiv }>
      <div className={styles.contentWrapper}>
        <div className={ styles.notFoundHeader}>Ow...</div>
        <i className={`fas fa-exclamation-triangle ${styles.notFoundExclamationIcon}` }></i>
        <div className={ styles.notFoundContent }>{ customMessage ? customMessage : "Nothing here yet..."}</div>
        <Button variant="outline-info" onClick={ handleGoBack }>Go Back</Button>
      </div>
      
    </div>
  );
};