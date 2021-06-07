// @flow
import * as React from "react";
// style imports //
import styles from "./css/messengerClosedComponent.module.css";

type Props = {
  handleFormOpen: () => void;
  newMessagesNumber: number;
};

const MessengerClosedComponent = ({ handleFormOpen, newMessagesNumber }: Props): React.Node => {
 
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