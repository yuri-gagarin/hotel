// @flow
import * as React from "react";
// style imports //
import styles from "./css/messengerClosedComponent.module.css";

type Props = {
  handleFormOpen: () => void;
  newMessagesNumber: number;
  adminMessengerOnline: boolean;
};

const MessengerClosedComponent = ({ handleFormOpen, newMessagesNumber, adminMessengerOnline }: Props): React.Node => {
 
  return (
    <div className={ styles.componentWrapper }> 
      { 
        newMessagesNumber > 0 
        ?
        <div className={ styles.newMessagesIndicator }>
          <div className={ styles.newMessagesIndicatorNumber}>
            { newMessagesNumber }
          </div>
          <span>New Messages</span>
        </div>
        :
        null
      }
      <div className={ `${styles.onlineIndicator} ${adminMessengerOnline ? styles.online : styles.offline}` }>
      </div>

      <div className={ styles.statusText }>{ adminMessengerOnline ? "Online" : "Offline"}</div>
      <div className={ styles.openMessengerBtn } onClick={ handleFormOpen }>
        <span>Message Us</span>
        <i className="fas fa-comments"></i>
      </div>
    </div>
  )
}
// PropTypes validation //
export default MessengerClosedComponent;