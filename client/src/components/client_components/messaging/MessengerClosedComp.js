// @flow
import * as React from "react";
// style imports //
import styles from "./css/messengerClosedComponent.module.css";

type Props = {
  handleFormOpen: () => void;
};

const MessengerClosedComponent = ({ handleFormOpen }: Props): React.Node => {
 
  return (
    <div className={ styles.componentWrapper }> 
      <div className={ styles.onlineIndicator }>
      </div>
      <div className={ styles.statusText }>Online</div>
      <div className={ styles.openMessengerBtn } onClick={ handleFormOpen }>
        <span>Message Us</span>
        <i className="fas fa-comments"></i>
      </div>
    </div>
  )
}
// PropTypes validation //
export default MessengerClosedComponent;