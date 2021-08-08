// @flow 
import * as React from "react";
import type { RouterHistory } from "react-router-dom";
import styles from "./css/notAllowedComponent.module.css";

type Props = {
  history: RouterHistory;
};
export const NotAllowedComponent = ({ history }: Props): React.Node => {

  const handleGoToLogin = (): void => {
    history.push("/login/admin");
  };
  
  return (
    <div className={ styles.notAllowedCompWrapper }>
      <div className={ styles.notAllowedCompStatus }>401</div>
      <div className={ styles.notAllowedCompHeader }>Not Allowed</div>
      <div className={ styles.notAllowedCompContent }>Ooops it seems login is required..</div>
      <div className={ styles.loginBtnDiv }>
        <button className={ styles.loginBtn } onClick={ handleGoToLogin }>Login</button>
      </div>
    </div>
  )
}